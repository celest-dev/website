---
sidebar_position: 7
---

# Defining custom exceptions

You can create custom exception types in your backend to throw specific errors and react to them accordingly in your Flutter app.

## Using custom exceptions

Below is an example of how to define a custom exception. You can create exceptions inside your `celest/lib/exceptions.dart` file.

```dart
class MyException implements Exception {
  const MyException(this.message);

  final String message;
}
```

You can then throw these exceptions in your Celest Functions whenever needed as shown below.

```dart
import 'package:celest/celest.dart';

import 'package:celest_backend/exceptions.dart';

Future<String> sayHello(
  FunctionContext context, 
  String name,
) async {
  // Perform custom validation
  if (name.isEmpty) {
    // highlight-next-line
    throw MyException('Input cannot be empty');
 }
  return 'Hello, $name';
}
```

In your Flutter app, the same `MyException` type will be thrown by the generated client if an error occurs.

```dart
import 'package:celest_backend/client.dart';

Future<String> getGreeting(String name) async {
  try {
    return await celest.functions.greeting.sayHello(name);
  // Catch the exception type defined in your backend
  // highlight-start
  } on MyException catch (e) {
    print('Uh oh! Could not greet $name: $e');
    rethrow;
  }
  // highlight-end
}
```

## Next steps

You have now learned how to create and throw custom exceptions in your Celest Functions. We have additional guides to teach you about [managing environment variables](/docs/functions/env-variables.md) and [creating tests for your functions](/docs/functions/testing.md).
