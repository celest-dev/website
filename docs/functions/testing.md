---
sidebar_position: 10
---

# Testing your functions

Celest Functions you define are Dart functions and can be tested using any of the available Dart testing packages or frameworks.

## Writing your tests

Within your `celest/test` folder, create a new Dart file and write the unit tests for your functions using `package:test` or any other Dart testing framework. The following code snippet has an example of a test for the `sayHello` function.

```dart
import 'package:celest/celest.dart';
import 'package:test/test.dart';

import '../functions/greeting.dart';

void main() {
  test('sayHello', () async {
    final result = await sayHello(
      'Celest',
      greetingUrl: Uri.parse('http://localhost:8000'),
    );
    expect(result, 'Hello, Celest');
  });
}
```

Run your tests by navigating to your `<flutter_app>/celest/test` folder in your console, and then running the following command:

```shell
dart test
```

Your terminal will let you know if all your tests pass, or if there are any failed tests that you need to review.

## Next steps

You have now learned how to write tests for your Celest Functions. We have additional guides to help learn more about [installing 3rd party Dart packages](/docs/functions/packages.md) in your Celest backend, and how to connect to your Celest Functions [using HTTP calls](/docs/functions/http-requests.md).
