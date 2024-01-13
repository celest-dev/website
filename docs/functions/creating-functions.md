---
sidebar_position: 3
---

# Creating a Function

:::info
Ensure you have completed [Setting up Celest](/docs/get-started.md) prior to reading this section.
:::

Creating functions with Celest enables you to connect and aggregate information from different parts of your backend, and build custom business logic that runs completely in the cloud. You define your functions as regular Dart functions, and Celest takes care of setting up and managing the backend for you.


<!-- TODO: Determine if I need another image here for explaining functions ![Function Call Flow](img/function.png) -->

## Building Celest Functions  

To get started with building your first function, navigate to the `<flutter_app>/celest/functions/` folder and create a file named `<function_file>.dart`. You can create as many function files as you want in this directory. Think of each file as a way to organize and create multiple Celest Functions under the same path.

:::tip
Access to your functions is denied by default. You’ll need to add the `@functions.public()` annotation to the top of the file for functions to be publicly accessible.

You can enable public access to specific functions or for all functions in your file.
:::

When writing your Celest Functions, you define them as normal Dart functions as shown in the following code snippet.

```dart
// Enables public access to all functions in this file.
@functions.public()
library;

import 'package:celest/functions.dart' as functions;

Future<String> sayHello(
  String name,
) async {
  return 'Hello, $name';
}

Future<String> sayGoodbye(
  String name,
) async {
  return 'Goodbye, $name';
}
```

The above code snippet is all you need to define your functions! You can now go to your terminal to run the `celest start` command. This command will spin up a local environment for you to test your changes, and it will also code-generate a Celest client for your frontend Flutter app to make it easier to connect to your Celest Functions.

## Connecting to your Celest Functions

The following code snippet is an example of how you would use the generated client in your `main.dart` file. The code snippet shows you how to connect to your Celest Function using the code-generated Celest client, and show a circular progress indicator as you await the response back from your backend.

```dart
import 'package:flutter/material.dart';
// highlight-next-line
import 'package:flutter_app/celest/client.dart' as celest;

void main() {
  // highlight-next-line
  celest.init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      // Call your function like a normal Dart function!
      // highlight-next-line
      future: celest.functions.greeting.sayHello('Celest'),
      builder: (_, snapshot) => switch (snapshot) {
        AsyncSnapshot(:final data?) => Text(data),
        _ => const CircularProgressIndicator(),
      },
    );
  }
}
```

## Next steps

You now know how to create Celest Functions and connect to them from your Flutter app. We have other guides to help explain how to use features such as Middleware, using custom data types, and managing environment variables. 