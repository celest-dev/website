---
sidebar_position: 11
---

# Using HTTP calls

If you'd like to use your Celest Functions outside of your Flutter/Dart app, you still can! Celest Functions are exposed as HTTP endpoints which can be called via any HTTP client from any programming language or toolchain.

## Celest's HTTP conventions

When communicating with Celest Functions using HTTP calls, all requests need to be sent as `POST` calls. Additionally, Celest handle all request/responses as JSON objects.

The following is a list of the HTTP response code conventions used by Celest.


| Response Code  | Description                                                   |
| --------- | ------------------------------------------------------------- |
| `200`| Indicates a call was successful |
| `400`| Returned in case a custom defined exception was returned |
| `500`| Indicates an unhandled error has occured |

## Error formats

When a function fails with an exception or error, the HTTP response will carry a 4xx/5xx status code and JSON body with an `error` key. If the exception is a user-defined exception type, the `error` field itself is encoded as a JSON message.

For example, let us assume you have a custom exception called `MyException` type defined in the example below.

```dart
class MyException implements Exception {
  const MyException(this.message);

  final String message;
}
```


If this exception is returned in one of your Celest Functions that you are calling with an HTTP request, the resulting JSON response will be as shown below. 

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

## Next steps

You have now learned about the conventions that Celest uses when passing data between your backend and your Flutter application, in addition to the format of the request/response and the HTTP response codes supported. With this knowledge, know know how to connect to your Celest Functions directly using HTTP calls if you are not using a Flutter app.
