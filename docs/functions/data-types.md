---
sidebar_position: 6
---

# Using custom data types

With Celest Functions, you can use any of the standard Dart types available such as `int` or `string`, and you can also use your own custom data types that you have created. Handling the transfer and formatting of data from your Flutter app to your backend, which is called serialization, is handled out-of-the-box in most cases. In situations requiring custom serialization, you can write your own logic which we can use instead for serializing the request/response of your Celest Functions.


# Custom data type example

Imagine you're working on an e-commerce application with an `Order` class defined in your codebase.

```dart
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

You can use this `Order` type in any Celest Function as both a parameter or return value, without the need to manually add serialization logic.

```dart
import 'package:celest/celest.dart';

// highlight-next-line
import 'types/order.dart';

Future<String> createOrder(
  FunctionContext context,
  // highlight-next-line
  Order customerOrder,
) async {
	// ...
}
```

When communicating with your backend, Celest will serialize the `Order` class as a JSON map with the field names as keys. The resulting information transferred over to your backend will have the following shape.

```json
{
  "id": 123,
  "customerName": "Celest",
  "price": {
    "currency": "usd",
    "dollars": 100,
    "cents": 34
  }
}
```


## Writing custom serialization logic

If you need custom handling for you serialization logic, simplify add a `fromJson` and `toJson` methods to your data type. Celest will use your custom `fromJson`/`toJson` implementations instead when transmitting the type to and from your backend.

Here, the `Price.toJson` method is used to upper-case the `currency` value.

```dart
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

 ```json
{
  "id": 123,
  "customerName": "Celest",
  "price": {
    // highlight-next-line
    "currency": "USD",
    "dollars": 100,
    "cents": 34
  }
}
```

## Next steps

You have now learned about how Celest handles the serialization of requests/responses to your functions, and how to write your own custom serialization logic if needed. You can learn about more features of Celest Functions by following our guides for [defining custom exceptions](/docs/functions/exceptions.md) and [managing environment variables](/docs/functions/env-variables.md).