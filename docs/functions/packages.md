---
sidebar_position: 11
---

# Installing 3rd party Dart packages

Your Celest backend is a pure Dart application. Any Dart packages which can be used in a Dart app can be used in your functions. For example, to communicate with systems outside of Celest, you could use `package:http`, `package:dio`, or any other HTTP client compatible with pure Dart.

## Adding a Dart package to your backend

To add a package for use in your backend, navigate in your terminal to the `<flutter_app>/celest` folder and then run the `dart pub add <package-name>` command.

```shell
$ dart pub add <package-name>
```

## Next steps

You have now learned how to install 3rd party packages to use with your Celest Functions. Follow our guides to learn more about communications with Celest Functions [using HTTP calls](/docs/functions/http-requests.md).
