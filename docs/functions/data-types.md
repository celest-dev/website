---
sidebar_position: 6
---

# Defining custom data types

With Celest Functions, you can use any of the core Dart types available such as `int`, `String`, and `DateTime`. You can also use your custom data types. Celest will handle the transfer and formatting of data from your Flutter app to your backend, also known as serialization, out-of-the-box in most cases. In situations requiring custom serialization, you can write your logic which will be used instead.

:::info

Celest does not support the following Dart types as parameter or return types. `Object` and `dynamic` may only be used as the value type of a `Map`.

- `Stream`
- `Object`
- `dynamic`

:::

# Custom data type example

Imagine you're working on an e-commerce application with an `Order` class defined in your codebase. To have Celest use that custom class, you need to place it in the `<flutter_app>/celest/lib/models/` folder.

```dart
// celest/lib/models/order.dart

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
import 'package:celest_backend/models/order.dart';

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

If you need custom handling for your serialization logic, add the `fromJson` and `toJson` methods to your data type. Celest will use your custom `fromJson`/`toJson` implementations when transmitting the type to and from your backend.

Here, the `Price.toJson` method is used to upper-case the `currency` value.

```dart
// celest/lib/models/order.dart

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

### Overriding serialization for third-party types

Sometimes, though, you cannot control the `fromJson`/`toJson` methods of a class, such as when using a third-party library. In these cases, you can use a custom override to "redefine" the type for serialization in Celest.

For example, consider the case where the `Price` class from our `Order` type is imported from a third-party library, `package:price`. Since we do not own `package:price`, we cannot change the `fromJson` and
`toJson` methods of the `Price` class.

Instead of modifying the `Price` class, we can define a custom override for `Price` which will apply to all instances of the `Price` class when it's encountered during serialization.

```dart
import 'package:price/price.dart';

@override
extension type PriceOverride(Price price) {
  factory PriceOverride.fromJson(Map<String, Object?> json) {
    return PriceOverride(
      Price(
        currency: Currency.values.firstWhere(
          (e) => e.toString().toUpperCase() == json['currency'],
        ),
        dollars: json['dollars'] as int,
        cents: json['cents'] as int,
      ),
    );
  }

  Map<String, Object?> toJson() => {
        'currency': price.currency.toString().toUpperCase(),
        'dollars': price.dollars,
        'cents': price.cents,
      };
}
```

## Next steps

You have now learned how Celest handles the serialization of requests/responses to your functions, and how to use your own custom types and serialization logic. Learn about more features of Celest Functions by following our guides for [defining custom exceptions](/docs/functions/exceptions.md) and [managing environment variables](/docs/functions/env-variables.md).
