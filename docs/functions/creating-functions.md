---
sidebar_position: 3
---

# Creating a function

:::info
Please complete [Setting up Celest](/docs/get-started.md) prior to reading this guide.
:::

Create serverless functions with Celest to connect and aggregate information from different parts of your backend, and build custom business logic that runs completely in the cloud. You define your functions as regular Dart functions and Celest takes care of deploying and managing the backend for you.

<!-- TODO: Determine if I need another image here for explaining functions ![Function Call Flow](img/function.png) -->

## Building Celest Functions  

To get started building your first serverless cloud function, navigate to the `<flutter_app>/celest/functions/` folder and create a file named `<api_name>.dart`. You can create as many APIs as you want in this directory. Think of each file as a way to organize and group multiple Celest Functions of similar functionality into a single namespace.

Celest Functions are defined as top-level functions as shown below.

```dart
Future<String> sayHello(String name) async {
  return 'Hello, $name';
}

Future<String> sayGoodbye(String name) async {
  return 'Goodbye, $name';
}
```

That's all you need to define your API! Go to your console and run the following command.

```shell
celest start
```

A local environment will spin up for you and watch for changes to your Celest Functions. A client is also generated for your which you can import in your Flutter app to automatically connect to your Celest Functions.

## Connecting to your Celest Functions

The following is an example of how you would use the generated client in your `main.dart` file to call a Celest Function and show the response from the backend.

```dart
import 'package:flutter/material.dart';
// Import the code-generated Celest client
// highlight-next-line
import 'package:celest_backend/client.dart';

void main() {
  // initializes Celest in your Flutter app
  // highlight-next-line
  celest.init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Homepage'),
        ),
        body: Center(
          child: FutureBuilder(
            // Call your Celest Function using the code-generated client
            // highlight-next-line
            future: celest.functions.greeting.sayHello('Celest'),
            builder: (_, snapshot) => switch (snapshot) {
              AsyncSnapshot(:final data?) => Text(data),
              AsyncSnapshot(:final error?) =>
                Text('${error.runtimeType}: $error'),
              _ => const CircularProgressIndicator(),
            },
          ),
        ),
      ),
    );
  }
}
```

## Next steps

You now know how to create Celest Functions and connect them to your Flutter app. We have other guides to help explain how to use features such as [logging](/docs/functions/logging.md), [using custom data types](/docs/functions/data-types.md), and [managing environment variables](/docs/functions/env-variables.md). 
