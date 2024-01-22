---
sidebar_position: 2
title: Setting Up Celest
description: Learn how to set up and use Celest in your Flutter project.
---

# Setting up Celest

This guide will walk you through how to download and install the Celest CLI on your development machine. The Celest CLI is what powers the majority of the Celest experience.


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

Once the command executes, it will continue to run in your console to detect changes made to your Celest backend definition and code-generate a Dart client for you to test your changes locally. We will cover later how to use the code-generated client after defining your Celest Functions.

The CLI will also create a folder in your project called `celest`, which will include the following files.

```shell
flutter_app/
└── celest/
    ├── config/
    │   └── .env            # Environment variables
    ├── functions/
    │   │── client.dart     # Code-generated client for your Flutter app
    │   ├── models.dart     # Custom API models
    │   └── exceptions.dart # Custom API exceptions
    └── test/               # Tests for your backend
    
```

## Deploying your backend resources

:::info

Deploying your backend is not currently available, but you can still experiment and build your Celest backend locally. We are working hard to bring backend deployment and management to you. Please join our [waitlist](/) to stay updated on our progress.

:::

