---
sidebar_position: 4
---

# Add Middleware

## Using middleware with your Celest Functions
Middleware enables you to have logic that can run before and/or after your function executes. In Celest, you can define your own middleware and attach it to all functions in a file or to a specific function.

To define your middleware, go to your `<flutter_app>/celest/functions/` folder, and create a `middleware.dart` file (the name of the file is up to you). The following code snippet shows the definition of two middleware for logging requests and responses.

```dart
import 'package:celest/celest.dart';

// A middleware that prints requests to your function.
class logRequests implements Middleware {
  const logRequests();

  @override
  Handler handle(Handler handler) {
    return (request) async {
      print(request);
      return handler(request);
    };
  }
}

// A middleware that prints responses from your function.
class logResponses implements Middleware {
  const logResponses();

  @override
  Handler handle(Handler handler) {
    return (request) async {
      final response = await handler(request);
      print(response);
      return response;
    };
  }
}
```

## Applying Middleware to Single Function
To attach a middleware to a function, annotate the function with an instance of the middleware. The following is an example of using the request and response logging middleware with a function.

![Middleware for each function](img/individual-middleware.png)

```dart
import 'package:celest/celest.dart';
import 'package:celest/functions/middleware.dart' as middleware;

// Logs requests for only this function.
@middleware.logRequests()
Future<String> sayHello(
  FunctionContext context, 
  String name,
) async {
  return 'Hello, $name';
}

// Logs responses for only this function.
@middleware.logResponses()
Future<String> sayGoodbye(
  FunctionContext context, 
  String name,
) async {
  return 'Goodbye, $name';
}
```

## Applying Middleware to All Functions in a File
You can alternatively set up middleware to run for all functions inside a functions file by applying the middleware annotation at the top of your functions file as shown below.

![File wide middleware](img/file-middleware.png)

```dart
// Logs requests of every function defined in this file.
@middleware.logRequests()
library;

import 'package:celest/celest.dart';
import 'package:celest/functions/middleware.dart' as middleware;

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

## Stacking Middlewares
You also have the option to compose middleware by applying multiple middleware to the function. In the following example, four middleware are composed and will execute in top-down order. When a user calls `sayHello`, the execution order of the middleware will be: `first`, `second`, `third`, then `fourth`.

```dart
@middleware.first()
@middleware.second()
library;

import 'package:celest/celest.dart';
import 'middleware.dart' as middleware;

@middleware.third()
@middleware.fourth()
Future<String> sayHello(
  FunctionContext context, 
  String name,
) async {
  return 'Hello, $name';
}
```

Since middleware can apply logic before and after a function runs, the composition of the middleware can be thought of as a sandwich. That means, in the previous example, `middleware.first` runs both first _and_ last if it defines both pre- and post-handler logic.

1. `@middleware.first` pre-handler logic runs
2. `@middleware.second` pre-handler logic runs
3. `@middleware.third` pre-handler logic runs
4. `@middleware.fourth` pre-handler logic runs
5. `sayHello` runs
6. `@middleware.fourth` post-handler logic runs
7. `@middleware.third` post-handler logic runs
8. `@middleware.second` post-handler logic runs
9. `@middleware.first` post-handler logic runs