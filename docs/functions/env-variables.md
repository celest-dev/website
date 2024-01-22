---
sidebar_position: 8
---

# Managing environment variables

Environment variables can be used to provide your Flutter app with environment-specific configuration from your backend. They allow you to keep configuration values separate from your codebase, improving the security and flexibility when connecting your Flutter app to different environments.

:::info

Multiple environment support is not currently available. You can now manage environment variables for your local development environment with Celest. We are working hard to bring backend deployment and management to you. Please join our [waitlist](/) to stay updated on our progress.

:::

:::tip

Environment variables you set are only accessible in your backend.

:::

## Updating environment variables with `.env` file

In order to change multiple environment variables and their values using a `.env` file, create a `.env` file and drop it in the `<flutter_app>/celest/config/` directory. When you run the `celest start` command in your console, your environment variables will automatically be updated with the values in your `.env` file.

## Using environment variables with Celest Functions

To ensure a function has access to the variable when it runs, pass it as a parameter and annotate with the variable definition. Here, the greeting service URL will be securely injected by the server when your function starts.


:::tip 

Annotated parameters (like `greetingUrl`) will not appear in the code-generated Celest client, but can be used in your backend when unit testing and mocking (see [Testing your backend resources](/docs//functions/testing.md)).

:::

```dart
import 'package:celest/celest.dart';
import 'package:http/http.dart' as http;

Future<String> sayHello(
  FunctionContext context, 
  String name, {
  // highlight-next-line
  @envVariables.greetingUrl required String greetingUrl,
}) async {
  // Call an external greeting service.
  final response = await http.post(
    Uri.parse(greetingUrl).replace(path: '/sayHello'),
    body: jsonEncode({
      'name': name,
    }),
  );
  if (response.statusCode != 200) {
    throw GreetingException(
      'Failed to say hello to $name: ${response.body}',
    );
  }
  return response.body;
}

// Custom exception for my Celest Function
class GreetingException implements Exception {
  const GreetingException(this.message);

  final String message;
}
```

With this example, the Celest Function has been granted access to the environment variable, and its value was accessed securely in the backend without it being exposed to the frontend code-generated Celest client in your Flutter app.

## Next steps

You have now learned about the flows available for updating, retreiving, and deleting environment variables in your Celest project. You can follow additional guides to learn more about [testing your functions](/docs/functions/testing.md), and [installing 3rd party Dart packages](/docs/functions/packages.md).
