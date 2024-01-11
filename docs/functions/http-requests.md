---
sidebar_position: 11
---

### Calling Celest Functions with HTTP requests
If you'd like to use your Celest Functions outside of your Flutter/Dart app, you still can! Celest functions are exposed as HTTP endpoints which can be called via any HTTP client from any programming language or toolchain.

The HTTP conventions for Celest functions are:

* JSON requests/responses
* POST requests
* 200 status code for success
* 400 status code for exceptions
* 500 status code for errors

When a function fails with an exception or error, the response will carry a 4xx/5xx status code and JSON body with an `error` key. If the exception is a user-defined exception type, the `error` field itself is encoded as a JSON message.

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