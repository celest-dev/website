---
sidebar_position: 8
---

# Managing environment variables

Environment variables can be used to provide environment-specific configuration to your backend. They allow you to keep their values separate from your codebase by removing sensitive configuration information, improving the security flexibility when running in different environments.

:::info

Multiple environment support is not currently available. You can now manage environment variables for your local development environment with Celest. We are working hard to bring backend deployment and management to you. Please join our [waitlist](/) to stay updated on our progress.

:::

## Setting up environment variables

:::tip

Environment variables you set are only accessible in your backend.

:::

You have multiple options when setting up environment variables. You can either use the CLI to set up specific variables individually, or use a `.env` file to upload a group of variables for each of your environmnets.

### Updating specific environment variables

You can use the Celest CLI to set up specific environment variables that you want to change. You can use the following command to update multiple environment variables if needed.

```shell
celest env set variable1_name=value1 variable2_name=<value2`.
```

### Updating environment variables with `.env` file

In order to change multiple environment variables and their values using a `.env` file, create a `.env` file and drop it in the `<flutter_app>/celest/config/` directory. Then, run the following command in your terminal.

```shell
celest env set
```

Once this command runs, you will be prompted whether you want to update all the variables in the `.env` file, or select specific ones for update.


## Retreiving environment variable values

Using the Celest CLI, you can retrieve of the values of environment variables that you have set up. To retrieve specific environment variable values, you can use the following command.

```shell
celest env get variable1 variable2
```

This command will print the values for these environment variables in your terminal. To retrieve all environment variable values simply do not include any variable names as shown in the following command.

```shell
celest env get
```

This command will print the values of all your environment variables in your terminal.

## Deleting environment variables

You can delete environment variables that you no longer need. To delete a single or multiple environment variables you can use the following command.

```shell
celest env delete variable1 variable2
```

:::tip

To prevent accidently messing up your environment configuration, there isn't a command from Celest to remove ALL your environment variables.

:::

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