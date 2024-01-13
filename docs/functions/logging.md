---
sidebar_position: 5
---

# Using Logging

Celest enables you to use logging to capture important information as your functions execute. Within your function code, you can use `print()` statements or a custom logger which prints to the terminal. These logs will appear in the same terminal where the `celest start` command is running and be accessible when running remotely post-deploy.

Here is an example of using print statements in your function definition.

```dart
import 'package:celest/celest.dart';

Future<String> sayHello(
  FunctionContext context, 
  String name,
) async {
  print('Hello, $name');
  return 'Hello, $name';
}

Future<String> sayGoodbye(
  FunctionContext context, 
  String name,
) async {
  print('Goodbye, $name');
  return 'Goodbye, $name';
}
```

When you call the function, these logs will be streamed locally.

```shell
$ celest start
Celest is running on http://localhost:7777…

Hello, Celest
Goodbye, Celest
```