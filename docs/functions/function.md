---
sidebar_position: 3
---

# Create a Function

Creating serverless APIs and functions with Celest enables you to connect and aggregate information from different parts of your backend, and build custom business logic that runs completely in the cloud. You define your cloud functions as Dart functions, and Celest takes care of setting up and managing the backend infrastructure around them.

To get started with building your first API, navigate to the `<flutter_app>/celest/apis/` folder and create a file named `<api_name>.dart`. You can create as many API files as you want in this directory.


Tip

Access to your APIs is denied by default. What this means is that you’ll need to add the `@api.anonymous()` annotation to the top of the file for APIs to be publicly accessible.

```dart
// Enables public access to the API.
@api.anonymous()
library;

import 'package:celest/api.dart' as api;

Future<String> sayHello(
  FunctionContext context,
  String name,
) async {
  return 'Hello, $name';
}

Future<String> sayGoodbye(
  FunctionContext context,
  String name,
) async {
  return 'Goodbye, $name';
}
```

The above code snippet is all you need to define your cloud functions! When the `celest start` command runs, a local environment is spun up and a Dart client is generated to help you connect to the local backend.

Below is an example of how you would use the generated client in your `main.dart` file.

```dart
import 'package:flutter/material.dart';
import 'package:flutter_app/celest/client.dart' as celest;

void main() {
  celest.init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      // Call your cloud function like a normal Dart function!
      future: celest.apis.greeting.sayHello('Celest'),
      builder: (_, snapshot) => switch (snapshot) {
        AsyncSnapshot(:final data?) => Text(data),
        _ => const CircularProgressIndicator(),
      },
    );
  }
}
```