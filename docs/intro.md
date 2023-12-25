---
sidebar_position: 1
---

# Overview

Celest is a managed cloud solution specifically built for Flutter and Dart developers.

### Interoperability with Dart packages
Your cloud functions are pure Dart functions. They are compiled to run natively on Linux and so any Dart packages which can be used on Linux can be used in your functions.

For example, to communicate with systems outside of Celest, you can use the `http` package, `dio`, or any other HTTP package you are familiar with.

To add a package for use in your backend, run the `dart pub add` command from the `celest` folder.

```shell
$ dart pub add http
```

## What is Celest?
Celest enables you to define every piece of your backend and infrastructure in Dart. This includes:
* [Functions](/docs/functions/introduction)
* Data (coming soon)
* Authentication (coming soon)
* Storage (coming soon)
* Policies (coming soon)
 
As the role of the front-end developer evolves towards full-stack proficiency, we recognize that existing tools have fallen short for those specializing in Flutter. To address this, our platform offers a familiar experience. Using the programming language and patterns Flutter developers already when building their frontend, Celest enables developers to build and connect their apps to their backend without needing additional tooling.
 
We enable Flutter developers can concentrate on building features and delivering value to their customers, rather than learning additional domains and fragmenting themselves across disparate tool chains.