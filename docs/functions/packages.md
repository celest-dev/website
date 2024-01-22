---
sidebar_position: 10
---

# Installing 3rd party Dart packages

Your Celest backend is a pure Dart application. So any Dart packages which can be used in a Dar app can be used in your functions. For example, to communicate with systems outside of Celest, you can use the `http` package, `dio`, or any other package you are familiar with.

## Adding a Dart package to your backend

To add a package for use in your backend, navigate in your terminal to the `celest` folder and then run the `dart pub add <package-name>` command.

```shell
$ dart pub add http
```

## Next steps

You have now learned how to install 3rd party packages to use with your Celest Functions. Follow our guides to learn more about other functionality of Celest such as how to interact with your Celest Functions [using HTTP calls](/docs/functions/http-requests.md).
