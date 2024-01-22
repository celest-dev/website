---
sidebar_position: 6
---

# Defining custom data types

With Celest Functions, you can use any of the core Dart types available such as `int`, `String`, and `DateTime`. You can also use your own custom data types. Celest will handle the transfer and formatting of data from your Flutter app to your backend, also known as serialization, out-of-the-box in most cases. In situations requiring custom serialization, you can write your own logic which will be used instead.

# Custom data type example

Imagine you're working on an e-commerce application with an `Order` class defined in your codebase. In order to have Celest use that custom class, you need to place it in the `<flutter_app>/celest/lib/models.dart` file.

```dart
// celest/lib/models.dart

class Order {
  const Order ({
    required this.id,
    required this.customerName,
    required this.price,
  });

  final int id;
  final String customerName;
  final Price price;
}

enum Currency { usd, cad, ... }

class Price {
  const Price({
    required this.currency,
    required this.dollars,
    required this.cents,
  }): assert(cents < 100);

  final Currency currency;
  final int dollars;
  final int cents;
}
```

Use this `Order` type in any Celest Function as either a parameter or return value, without adding serialization logic.

```dart
// celest/functions/orders.dart

// highlight-next-line
import 'package:celest_backend/models.dart';

Future<String> createOrder(
  // highlight-next-line
  Order customerOrder,
) async {
  // Function logic goes here
}
```

When communicating with your backend, Celest will serialize the `Order` class as a JSON map with the field names as keys. The resulting information transferred over to your backend will have the following shape.

```json
{
  "customerOrder": {
    "id": 123,
    "customerName": "Celest",
    "price": {
      "currency": "usd",
      "dollars": 100,
      "cents": 34
    }
  }
}
```


## Writing custom serialization logic

If you need custom handling for you serialization logic, simplify add a `fromJson` and `toJson` methods to your data type. Celest will use your custom `fromJson`/`toJson` implementations instead when transmitting the type to and from your backend.

Here, the `Price.toJson` method is used to upper-case the `currency` value.

```dart
// celest/lib/models.dart

class Price {
  // ...

  factory Price.fromJson(Map<String, dynamic> json) {
    // ...
  }

  // highlight-start
  Map<String, dynamic> toJson() => {
      'currency': currency.name.toUpperCase(),
      'dollars': dollars,
      'cents': cents,
    };
  // highlight-end
}
```

The resulting JSON response for the `currency` will now be returned as upper case.

 ```diff
{
  "customerOrder": {
    "id": 123,
    "customerName": "Celest",
    "price": {
      // highlight-start
      "currency": "USD",
-     "currency": "usd",
      // highlight-end
      "dollars": 100,
      "cents": 34
    }
  }
}
```

## Next steps

You have now learned about how Celest handles the serialization of requests/responses to your functions, and how to use your own custom types and serialization logic. Learn about more features of Celest Functions by following our guides for [defining custom exceptions](/docs/functions/exceptions.md) and [managing environment variables](/docs/functions/env-variables.md).
