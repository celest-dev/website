---
sidebar_position: 2
title: Getting started
description: Learn how to set up and use Celest in your Flutter project.
---

# Getting started

This guide will walk you through how to set up Celest on your development machine, and how to create a new project.


## Prerequisites
To use Celest in your Flutter app, you need the following prerequisites:

1. Install [Flutter](https://docs.flutter.dev/get-started/install)
2. Create a new Flutter project (or use an existing one)
3. [Download](/download) and install the Celest CLI

That’s it! You are now ready to start building your backend - all in Dart!

## Starting a new Celest project
After installing the Celest CLI, navigate to the root of your Flutter project in your console and run the following command.

```shell    
$ celest start
```

Once the command executes, it will continue to run in your console to detect changes made to your Celest backend definition and code-generate a Dart client for you to test your changes locally.

The CLI will also create a folder in your project called `celest`, which will include the following files.

```shell
flutter_app/
└── celest/
    ├── config/
    │   └── .env            # Environment variables
    ├── functions/          # Celest Functions folder
    |   └── greeting.dart   # Example API file
    ├── lib/
    │   │── client.dart     # Code-generated client for your Flutter app
    │   ├── models.dart     # Custom API models
    │   └── exceptions.dart # Custom API exceptions
    └── test/               # Tests for your backend
```

To get started building your serverless cloud function, navigate to the `<flutter_app>/celest/functions/` folder and create a file named `<api_name>.dart`. You can create as many APIs as you want in this directory. Think of each file as a way to organize and group multiple Celest Functions of similar functionality into a single namespace.

Celest Functions are defined as top-level functions as shown below.

```dart
Future<String> sayHello(String name) async {
  return 'Hello, $name';
}

Future<String> sayGoodbye(String name) async {
  return 'Goodbye, $name';
}
```

That's all you need to define your API! Now, you can connect your Flutter app to your cloud functions by using the code-generated client as shown in the following example.

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

## Deploying your backend resources

:::info

Deploying your backend is not currently available, but you can still experiment and build your Celest backend locally. We are working hard to bring backend deployment and management to you. Please join our [waitlist](/) to stay updated on our progress.

:::

