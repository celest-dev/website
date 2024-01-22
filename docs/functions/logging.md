---
sidebar_position: 5
---

# Using logging

Celest enables you to use logging to capture important information as your functions execute. Within your function code, you can use `print()` statements or a custom logger which prints to the terminal. These logs will appear in the same terminal where the `celest start` command is running.

## Adding logs to your functions

Here is an example of using print statements in your Celest Function definition.

```dart
import 'package:celest/celest.dart';

Future<String> sayHello(
  FunctionContext context, 
  String name,
) async {
  // highlight-next-line
  print('Hello, $name');
  return 'Hello, $name';
}

Future<String> sayGoodbye(
  FunctionContext context, 
  String name,
) async {
  // highlight-next-line
  print('Goodbye, $name');
  return 'Goodbye, $name';
}
```

When you call the function, these logs will be streamed locally and shown in the terminal where the `celest start` command is running. The following is an example of the output you will see in your terminal.

```shell
$ celest start
Celest is running on http://localhost:7777…

Hello, Celest
Goodbye, Celest
```

## Next steps

You have now learned how to use Logging to help you understand how your Celest Functions are behaving, or debug specific scenarios or flows. You follow more of our guides to learn about [testing your functions](/docs/functions/testing.md) and [installing 3rd party Dart packages](/docs/functions/packages.md) that might be helpful for your use cases.
