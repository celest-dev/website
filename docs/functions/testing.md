---
sidebar_position: 9
---

# Test the Functions

The serverless functions and APIs you define are Dart functions and can be tested like any other. Within your `celest` folder, write unit tests for your functions using `package:test` or any other Dart testing framework.

```dart
import 'package:celest/celest.dart';
import 'package:test/test.dart';

import '../apis/greeting.dart';

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