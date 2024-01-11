---
sidebar_position: 2
---

# Setup Celest

## Prerequisites
To use Celest in your Flutter app, you need the following prerequisites:

1. Install Flutter
2. Start a new fluter project using the `flutter create` command
3. Install the Celest CLI using a shell command



```shell
$ curl --proto '=https' --tlsv1.2 https://install.celest.dev | sh
```

That’s it! You do not need any additional tooling to build, test, and deploy your backend.

## Setting up the Celest CLI
After installing the Celest CLI, navigate to the root of your Flutter project and run the following command.

```shell
$ celest start
```

You will be prompted to sign in using GitHub. Once the authentication with GitHub is successful, a watch command will continue to run in your CLI to detect changes made to your Celest backend definition and code-generate a Dart client for you in the following path `<flutter_app>/lib/celest/client.dart` to test your changes locally. We will cover later how to use the code-generated client after defining your Celest Functions.

The CLI will also create a folder in your project called `celest`, which will include the following files.

```shell
flutter_app/
└── celest/
    ├── functions/
    │   ├── greeting.dart # a function definition
    │   └── middleware.dart # middleware definitions
    └── config/
        └── env.dart # environment variables
```


## Deploying your backend resources
When you have tested and validated your backend locally, use the Celest CLI to deploy your backend resources to the cloud.

```shell
$ celest deploy
```

