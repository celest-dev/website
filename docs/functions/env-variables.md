---
sidebar_position: 8
---

# Managing environment variables

Environment variables can be used to provide your Flutter app with environment-specific configuration. They allow you to keep configuration values separate from your codebase, improving flexibility when deploying your backend to different environments.

:::tip

Environment variables are only accessible in your backend.

:::

## Creating environment variables

To define environment variables and their values, create a `config` folder inside the `celest` folder, and then create a `.env` file inside it. When you run the `celest start` command in your console, your environment variables will be read from the `.env` file and made available to your Celest backend locally.

## Using environment variables with Celest Functions

To provide a function access to an environment variable when it runs, pass it as a parameter and annotate with the variable definition. In the following code snippet, a greeting service URL will be securely injected by the server when your function starts.

:::tip 

Annotated parameters (like `greetingUrl`) will not appear in the code-generated Celest client, but can be used in your backend when unit testing and mocking (see [Testing your functions](/docs/functions/testing.md)).

:::

```dart
import 'package:http/http.dart' as http;

import '../resources.dart';

Future<String> sayHello(
  String name, {
  // highlight-next-line
  @env.greetingUrl required Uri greetingUrl,
}) async {
  // Call an external greeting service.
  final response = await http.post(
    // highlight-next-line
    greetingUrl.resolve('/say-hello'),
    body: jsonEncode({
      'name': name,
    }),
  );
  if (response.statusCode != 200) {
    throw Exception("An error occured calling the greeting service");
  }
  return response.body;
}
```

When the Celest Function runs, it will automatically have access to the environment variable. Its value is stored securely and is never hard-coded in your codebase or in the deployed Celest Function.

## Next steps

You have now learned about the flows available for updating, retreiving, and deleting environment variables in your Celest project. You can follow additional guides to learn more about [testing your functions](/docs/functions/testing.md), and [installing 3rd party Dart packages](/docs/functions/packages.md).
