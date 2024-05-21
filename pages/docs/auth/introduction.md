---
title: Adding authentication
description: Learn how to add authentication to your Celest project.
---

# Celest Auth

Celest currently supports email-based authentication via one-time passcodes. This is a simple and secure way to authenticate users in your app without needing to worry about passwords.

> We are working on adding social sign-in and passkeys in future releases.

Adding Auth to your Celest project takes 5 lines of code. Create a new file in `celest/auth/auth.dart` and add the following code:

```dart
import 'package:celest/celest.dart';

const auth = Auth(
  providers: [
    AuthProvider.email(),
  ],
);
```

That's it! When you run `celest start`, Celest will automatically generate an Auth client for you to use in your Flutter app.

## Signing In

To sign in a user, you can use the `authenticate` method on the `celest.auth` object. It's called `authenticate` because there is no longer a distinction between signing in or signing up! If the user doesn't exist, they will just be created.

```dart
final flow = await celest.auth.email.authenticate(
  email: 'dillon@celest.dev',
);

// Prompt user for OTP code sent to the email

final user = await flow.verify(otpCode: '123456');
print('User signed in: ${user.id}');
```

A full example of a typical auth flow can be found in our [repo](https://github.com/celest-dev/celest/tree/main/packages/celest_auth/example).

## Authorizing your functions

Once a user is signed in, they can access functions marked `@authenticated`. To learn more about authorizing your functions, check out [Authorizing functions](/docs/functions/authorizing-functions).
