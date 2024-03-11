---
sidebar_position: 12
---

# Using HTTP calls

If you'd like to use your Celest Functions outside of your Flutter app, you still can! Celest Functions are exposed as HTTP endpoints which can be called via any HTTP client from any programming language or toolchain.

## Celest's HTTP conventions

When communicating with Celest Functions using HTTP calls, all requests need to be sent as `POST` calls. Additionally, Celest handle all request/responses as JSON objects.

The following is a list of the HTTP response code conventions used by Celest.


| Response Code  | Description                                                   |
| --------- | ------------------------------------------------------------- |
| `200` | Indicates a call was successful |
| `400` | Indicates an Exception was thrown |
| `500` | Indicates an Error was thrown |

## Error formats

When a function fails with an exception or error, the HTTP response will carry a 4xx/5xx status code and JSON body with an `error` key. If the exception is a user-defined exception type, the `error` field itself is encoded as a JSON message.

For example, let us assume you have a custom exception called `BadNameException` type defined in the example below.

```dart
// celest/lib/exceptions/bad_name_exception.dart

class BadNameException implements Exception {
  const BadNameException(this.message);

  final String message;
}
```


If this exception is returned in one of your Celest Functions that you are calling with an HTTP request, the resulting JSON response will be as shown below. 

```
400 Bad Request
{
  "error": {
    "code": "BadNameException",
    "details": {
      "message": "Input cannot be empty"
    }
  }
}
```

However, if the function threw a `StateError`, it would look like this. For non-custom exceptions, the "details" field is omitted. This is done in order to prevent leaking information which may be sensitive to your application. Define custom exceptions to provide more information to your users as appropriate.

```
500 Internal Server Error
{
  "error": {
    "code": "StateError"
  }
}
```

## Next steps

You have now learned about the conventions that Celest uses when passing data between your backend and your Flutter application, in addition to the format of the request/response and the HTTP response codes supported. With this knowledge, you now know how to connect to your Celest Functions directly using HTTP calls if you are not using a Flutter app.
