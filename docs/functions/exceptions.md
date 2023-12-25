---
sidebar_position: 7
---

# Create Custom Exceptions

You can create custom exception types in your backend to control how functions behave when there are errors. This enables you to have clear exceptions thrown in your Flutter app that you can react to.

Below is an example of how to define a custom exception. You can create exceptions in any folder inside your `celest` folder. For this example, the exception type is defined in `<flutter_app>/celest/functions/my_exception.dart`.

```dart
class MyException implements Exception {
  const MyException(this.message);

  final String message;
}
```

You can then throw these exceptions in your functions whenever needed as shown below.

```dart
import 'package:celest/celest.dart';

import 'my_exception.dart';

Future<String> sayHello(
  FunctionContext context, 
  String name,
) async {
  // Perform custom validation
  if (name.isEmpty) {
    throw MyException('Input cannot be empty');
 }
  return 'Hello, $name';
}
```

In your Flutter app, the same `MyException` type will be thrown by the generated client if an error occurs.

```dart
import 'celest/client.dart' as celest;

Future<String> getGreeting(String name) async {
  try {
    return await celest.apis.greeting.sayHello(name);
  // Catch the exception type defined in your backend
  } on MyException catch (e) {
    print('Uh oh! Could not greet $name: $e');
    rethrow;
  }
}
```