---
sidebar_position: 2
---

# Get Started

## Prerequisites
To use Celest in your Flutter app, you need the following prerequisites:

1. Install Flutter
2. Start a new fluter project using the `flutter create` command
3. Install the Celest CLI using a shell command


:::warning
This is an example and will not work just yet. Join the [waitlist](https://celest.dev) to get access when we launch!
:::

```shell
$ curl --proto '=https' --tlsv1.2 https://install.celest.dev | sh
```

That’s it! You do not need any additional tooling to build, test, and deploy your backend.

## Setting up the Celest CLI
After installing the Celest CLI, navigate to the root of your Flutter project and run the following command.

```shell
$ celest start
```

You will be prompted to sign in using GitHub. Once the authentication with GitHub is successful, a watch command will continue to run in your CLI to detect changes made to your Celest backend definition and code-generate a Dart client for you in the following path `<flutter_app>/lib/celest/client.dart` to test your changes locally. We will cover later how to use the code-generated client after defining your APIs and cloud functions.

The CLI will also create a folder in your project called `celest`, which will include the following files.

```shell
flutter_app/
└── celest/
    ├── apis/
    │   ├── greeting.dart # a serverless API definition
    │   └── middleware.dart # middleware definitions
    └── config/
        └── env.dart # environment variables
```


## Deploying your backend resources
When you have tested and validated your backend locally, use the Celest CLI to deploy your backend resources to the cloud.

```shell
$ celest deploy
```

### Calling Celest APIs with HTTP requests
If you'd like to use your Celest APIs outside of your Flutter/Dart app, you still can! Celest functions are exposed as HTTP endpoints which can be called via any HTTP client from any programming language or toolchain.

The HTTP conventions for Celest functions are:

* JSON requests/responses
* POST requests
* 200 status code for success
* 400 status code for exceptions
* 500 status code for errors

When a cloud function fails with an exception or error, the response will carry a 4xx/5xx status code and JSON body with an `error` key. If the exception is a user-defined exception type, the `error` field itself is encoded as a JSON message.

For example, if a function throws the `MyException` type defined in the example above, the response would be:

```
400 Bad Request
{
  "error": {
    "$type": "MyException",
    "message": "Input cannot be empty"
  }
}
```

However, if the function threw a `StateError`, it would look like this where the error is stringified in the `error` field.

```
500 Internal Server Error
{
  "error": "Bad state: Something bad happened"
}
```