---
sidebar_position: 9
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
      FunctionContext.test(),
      'Celest',
      greetingUrl: 'http://localhost:8000',
    );
    expect(result, 'Hello, Celest');
  });
}
```

You can then run your tests by navigating to your `celest/test` folder in your terminal, and then running the following command:

```shell
dart test
```

Your terminal would then let you know if all your tests pass, or if there are any failed tests that you need to review.

## Next steps
You have now learned how to write tests for your Celest Functions. We have additional guides to help you with learning about [installing 3rd party Dart packages](/docs/functions/packages.md) in your Celest backend, and how to interact with your Celest Functions [using HTTP calls](/docs/functions/http-requests.md).
