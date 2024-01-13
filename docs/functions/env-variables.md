---
sidebar_position: 8
---

# Managing environment variables

Environment variables can be used to provide environment-specific configuration to your backend. They allow you to keep their values separate from your codebase, improving flexibility when running in different environments.

To set up environment variables in your backend, navigate to the `<flutter_app>/celest/config/env.dart` file and list all the variables you’ll need throughout your backend.

```dart
import 'package:celest/celest.dart';

const EnvironmentVariable greetingUrl = EnvironmentVariable(name: 'GREETING_URL');
```

To ensure a function has access to the variable when it runs, pass it as a parameter and annotate with the variable definition. Here, the greeting service URL will be securely injected by the server when your function starts.


:::note 
Annotated parameters (like `greetingUrl`) will not appear in the generated client, but can be used in your backend when unit testing and mocking (see [Testing your backend resources](/docs//functions/testing)).
:::

```dart
import 'package:celest/celest.dart';
import 'package:http/http.dart' as http;

import '../resources.dart';

Future<String> sayHello(
  FunctionContext context, 
  String name, {
  @envVariables.greetingUrl required String greetingUrl,
}) async {
  // Call an external greeting service.
  final response = await http.post(
    Uri.parse(greetingUrl).replace(path: '/sayHello'),
    body: jsonEncode({
      'name': name,
    }),
  );
  if (response.statusCode != 200) {
    throw GreetingException(
      'Failed to say hello to $name: ${response.body}',
    );
  }
  return response.body;
}

class GreetingException implements Exception {
  const GreetingException(this.message);

  final String message;
}
```

### Setting up environment variable values locally
When you run `celest start` or `celest deploy`, the CLI will look for values of the environment variables in your shell environment. For any variables not defined, the CLI will prompt you for their values.

```shell
Please provide values for the following environment variables:
? GREETING_URL: <Enter your value>
```

To change the values of environment variables previously defined, re-export the value from your terminal before running `celest start` or `celest deploy`.

```shell
export GREETING_URL=<new URL> 
```

Celest will detect the presence of a new value and update your local/deployed function to reflect the change.
