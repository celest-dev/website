---
sidebar_position: 6
---

# Using custom data types

With Celest Functions, you can use any of the standard Dart types available such as `int` or `string`, and you can also use your own custom datatypes that you have created. Handling the transfer and formatting of data from your Flutter app to your backend, which is called serialization, is handled out-of-the-box in most cases. In situations requiring custom serialization, you can write custom logic for serializing the request/responses which we can use instead for your Celest Functions.


# Writing an example of using

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

If you need custom handling over serialization logic, add a `fromJson` constructor and `toJson` method to your datatype. Celest will use your custom `fromJson`/`toJson` implementations instead when transmitting the type to and from your backend.

Here, the `Price.toJson` method is used to upper-case the `currency` value.

```dart
class Price {
  // ...

  factory Price.fromJson(Map<String, dynamic> json) {
    // ...
  }

  Map<String, dynamic> toJson() => {
      'currency': currency.name.toUpperCase(),
      'dollars': dollars,
      'cents': cents,
    };
}
```

 ```json
{
  "id": 123,
  "customerName": "Celest",
  "price": {
    "currency": "USD",
    "dollars": 100,
    "cents": 34
  }
}
```