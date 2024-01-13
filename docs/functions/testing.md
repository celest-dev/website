---
sidebar_position: 9
---

# Testing your functions

The functions you define are Dart functions and can be tested like any other. 

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