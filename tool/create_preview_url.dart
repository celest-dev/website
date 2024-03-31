import "dart:async";
import "dart:io";

import "package:googleapis/compute/v1.dart" hide Duration;
import 'package:googleapis/dns/v1.dart' as dns;
import "package:googleapis_auth/auth_io.dart";
import "package:http/http.dart" as http;

String mustEnv(String name) {
  final value = Platform.environment[name];
  if (value == null || value.isEmpty) {
    throw StateError("$name is not set");
  }
  return value;
}

final ipAddress = mustEnv('GCP_WEBSITE_IP');
final environmentName = mustEnv('GCP_WEBSITE_ENVIRONMENT');
final fqdn = '$environmentName.preview.celest.dev';

Future<void> main() async {
  final projectId = mustEnv('GCP_WEBSITE_PROJECT');
  final urlMapName = mustEnv('GCP_WEBSITE_URL_MAP');
  final backendServiceLink = mustEnv('GCP_WEBSITE_BACKEND_SERVICE');

  final httpClient = http.Client();
  final AuthClient client;
  if (Platform.environment['CI'] == 'true') {
    client = authenticatedClient(
      httpClient,
      AccessCredentials(
        AccessToken(
          'Bearer',
          mustEnv('GCP_ACCESS_TOKEN'),
          DateTime.timestamp().add(const Duration(hours: 1)),
        ),
        null,
        [],
      ),
    );
  } else {
    client = await clientViaApplicationDefaultCredentials(
      scopes: const [
        ComputeApi.cloudPlatformScope,
        ComputeApi.computeScope,
        dns.DnsApi.ndevClouddnsReadonlyScope,
      ],
    );
  }

  final compute = ComputeApi(client);
  print('Creating route for $fqdn');
  final currentMap = await compute.urlMaps.get(
    projectId,
    urlMapName,
    $fields: 'hostRules, pathMatchers, tests',
  );
  final currentTests = currentMap.tests ?? [];
  final updateOp = await compute.urlMaps.patch(
    UrlMap(
      hostRules: [
        for (final hostRule in currentMap.hostRules!)
          if (!hostRule.hosts!.contains(fqdn)) hostRule,
        HostRule(
          hosts: [fqdn, 'www.$fqdn'],
          pathMatcher: environmentName,
        ),
      ],
      pathMatchers: [
        for (final pathMatcher in currentMap.pathMatchers!)
          if (pathMatcher.name != environmentName) pathMatcher,
        PathMatcher(
          name: environmentName,
          defaultService: backendServiceLink,
          pathRules: [
            PathRule(
              paths: ['/*'],
              service: backendServiceLink,
              routeAction: HttpRouteAction(
                urlRewrite: UrlRewrite(
                  pathPrefixRewrite: '/$environmentName/',
                ),
              ),
            ),
          ],
        ),
      ],
      tests: [
        for (final test in currentTests)
          if (test.host != fqdn) test,
        UrlMapTest(
          description: 'Root URL for $environmentName',
          host: fqdn,
          path: '/',
          service: backendServiceLink,
        ),
        UrlMapTest(
          description: 'Child path for $environmentName',
          host: fqdn,
          path: '/some/path',
          service: backendServiceLink,
        ),
      ],
    ),
    projectId,
    urlMapName,
  );
  final doneOp = await compute.globalOperations.wait(projectId, updateOp.name!);
  if (doneOp.error case final error?) {
    final errorMessage =
        error.errors?.map((e) => '${e.message} (${e.code})').join('; ') ??
            'Unknown error';
    throw Exception('Failed to create route for $fqdn: $errorMessage');
  }
  print('Successfully created route for $fqdn');

  // Create DNS record which points to the LB IP
  final dnsApi = dns.DnsApi(client);
  await dnsApi.createDnsRecords();

  // Invalidate the cache
  final invalidationPath = '/$environmentName/*';
  print('Invalidating cache for path: $invalidationPath');
  final invalidationOp = await compute.urlMaps.invalidateCache(
    CacheInvalidationRule(
      host: fqdn,
      path: invalidationPath,
    ),
    projectId,
    urlMapName,
  );
  final result = await compute.globalOperations.wait(
    projectId,
    invalidationOp.name!,
  );
  if (result.error case final error?) {
    final errorMessage =
        error.errors?.map((e) => '${e.message} (${e.code})').join('; ') ??
            'Unknown error';
    throw Exception('Failed to invalidate cache for $fqdn: $errorMessage');
  }
  print('Successfully invalidated cache for $fqdn');

  // Wait for changes to propagate
  try {
    final stopwatch = Stopwatch()..start();
    const timeout = Duration(minutes: 5);
    var attempt = 0;
    while (stopwatch.elapsed < timeout) {
      attempt++;
      print(
        '[Attempt $attempt] Checking route status (elapsed ${stopwatch.elapsed})',
      );
      try {
        final resp = await client.get(Uri.parse('https://$fqdn'));
        if (resp.statusCode == 200) {
          print('Preview is live at https://$fqdn');
          return;
        }
      } on Exception catch (e) {
        print(
          '[Attempt $attempt] Failed to connect to preview: ${e.runtimeType}',
        );
        await Future.delayed(const Duration(seconds: 10));
        continue;
      }
    }
    throw TimeoutException(
      '[Attempt $attempt] Timed out waiting for preview to be live',
      timeout,
    );
  } finally {
    client.close();
    httpClient.close();
  }
}

extension on dns.DnsApi {
  /// Creates an A record which points to the LB IP
  Future<void> createDnsRecords() async {
    print('Creating DNS records for $fqdn');
    final dnsProjectId = mustEnv('GCP_DNS_PROJECT');
    final zoneName = mustEnv('GCP_DNS_ZONE');
    final recordNames = ['$fqdn.', 'www.$fqdn.'];

    const recordType = 'A';
    const recordTtl = 0;

    final additions = <String>[];
    final deletions = <dns.ResourceRecordSet>[];
    for (final recordName in recordNames) {
      try {
        final record = await resourceRecordSets.get(
          dnsProjectId,
          zoneName,
          recordName,
          recordType,
        );
        switch (record) {
          case dns.ResourceRecordSet(rrdatas: [final ip], ttl: recordTtl)
              when ip == ipAddress:
            print('DNS record for $recordName already exists');
          default:
            print('DNS record for $recordName exists but is stale');
            deletions.add(record);
        }
        continue;
      } on DetailedApiRequestError catch (e) {
        if (e.status != 404) {
          rethrow;
        }
        // No existing record
        print('No DNS record for $recordName');
        additions.add(recordName);
      }
    }
    if (deletions.isNotEmpty) {
      print('Deleting stale DNS records');
      await changes.create(
        dns.Change(deletions: deletions),
        dnsProjectId,
        zoneName,
      );
    }
    if (additions.isNotEmpty) {
      print('Creating new DNS records');
      await changes.create(
        dns.Change(
          additions: [
            for (final recordName in additions)
              dns.ResourceRecordSet(
                name: recordName,
                type: recordType,
                ttl: recordTtl,
                rrdatas: [ipAddress],
              )
          ],
        ),
        dnsProjectId,
        zoneName,
      );
    }
  }
}
