---
sidebar_position: 9
---

# Authorizing your functions

By default, Celest Functions are deny-by-default, meaning only you as the author and administrator of your project can access them.

To change the access level, you can use one of the following annotations:

- `@public` &mdash; Grants access to anyone on the Internet, making your function publicly accessible.
- `@authenticated` &mdash; Grants access to only authenticated users. (Currently requires [Celest Auth](/docs/auth/introduction))

## Authenticated functions

When using Celest Auth, you have the ability to restrict access to your functions to only authenticated users. This is done by adding the `@authenticated` annotation to your function.

```dart
import 'package:celest/celest.dart';

@authenticated
Future<String> sayHello() async {
  return 'Hello, valued customer!';
}
```

### Accessing user information

To get the calling user's information, you can use the `@Context.user` annotation in your function.

```dart
import 'package:celest/celest.dart';

@authenticated
Future<String> sayHello({
  @Context.user required User user,
}) async {
  return 'Hello, ${user.displayName}!';
}
```

In fact, you can do this for `@public` functions, too, since in that case there _may_ be a user that Celest knows about. For these cases, the `User` parameter must be nullable to account for both scenarios.

```dart
@authenticated
Future<String> sayHello({
  // User can be required here since it's `@authenticated`
  @Context.user required User user,
}) async {
  return 'Hello, ${user.displayName}!';
}

@public
Future<String> sayHello({
  // User must be nullable here for `@public` functions
  @Context.user User? user,
}) async {
  if (user == null) {
	  return 'Hello, stranger!';
  }
  return 'Hello, ${user.displayName}!';
}
```