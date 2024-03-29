---
sidebar_position: 5
---

# Logging and debugging

Celest enables you to use logging to capture helpful information about your functions while they execute. Within your function code, use `print()` statements or a custom logger package which prints to the conosole. These logs will appear in the same console where the `celest start` command is running.

## Adding logs to your functions

Here is an example of using print statements to log the input of `name` in a Celest Function.

```dart
Future<String> sayHello(String name) async {
  // highlight-next-line
  print('Saying hello to $name');
  return 'Hello, $name';
}

Future<String> sayGoodbye(String name) async {
  // highlight-next-line
  print('Saying goodbye to $name');
  return 'Goodbye, $name';
}
```

When you call the function, these logs will be streamed locally and shown in the terminal where the `celest start` command is running.

```shell
$ celest start
✓ Celest is running on http://localhost:7777

[sayHello] Saying hello to Celest
[sayGoodbye] Saying goodbye to Celest
```

## Next steps

You have now learned how to use Logging to help you understand how your Celest Functions are behaving, or debug specific scenarios or flows. Follow our guides to learn about [testing your functions](/docs/functions/testing.md) and [using 3rd party Dart packages](/docs/functions/packages.md).
