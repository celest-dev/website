---
sidebar_position: 2
title: Setting Up Celest
description: Learn how to set up and use Celest in your Flutter project.
---

# Setting up Celest

This guide will walk you through how to download and install the Celest CLI on your machine. The Celest CLI is what you will interact with the most when building and deploying your backend.

## Prerequisites
To use Celest in your Flutter app, you need the following prerequisites:

1. Install [Flutter](https://docs.flutter.dev/get-started/install?gclid=CjwKCAiA44OtBhAOEiwAj4gpOfIZAnxSZ-twuX9JFVUCECOMzKyK65rK4h5o_v_d39cOsu6NrxefzBoCJK4QAvD_BwE&gclsrc=aw.ds)
2. Start a new fluter project
3. [Download](/download) and install the Celest CLI

That’s it! You are now ready to start building your backend - all in Dart!

## Starting a new Celest project
After installing the Celest CLI, navigate to the root of your Flutter project and run the following command.

```shell    
$ celest start
```

Once the command executes, it will continue to run in your terminal to detect changes made to your Celest backend definition and code-generate a Dart client for you in the following path `<flutter_app>/lib/celest/client.dart` to test your changes locally. We will cover later how to use the code-generated client after defining your Celest Functions.

The CLI will also create a folder in your project called `celest`, which will include the following files.

```shell
flutter_app/
└── celest/
    ├── functions/
    │   └── greeting.dart # a function definition
    ├── test/ # a folder for adding tests to your backend
    └── config/
        └── env.dart # environment variables
    
```

## Deploying your backend resources

:::info

Deploying your backend is not currently available, you can still experiment and build your Celest backend locally. We are working hard to bring backend deployment and management to you. Please join our [waitlist](/) to stay updated on our progress.

:::

