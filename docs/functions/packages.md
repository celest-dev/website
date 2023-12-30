---
sidebar_position: 10
---

# Installing 3rd party Dart Packages

Your Celest Functions are pure Dart functions. They are compiled to run natively on Linux and so any Dart packages which can be used on Linux can be used in your functions.

For example, to communicate with systems outside of Celest, you can use the `http` package, `dio`, or any other HTTP package you are familiar with.

To add a package for use in your backend, run the `dart pub add` command from the `celest` folder.

```shell
$ dart pub add http
```