---
sidebar_position: 1
title: Understanding Celest Functions
description: Learn about Celest Functions' use cases.
---

# Understanding Celest Functions

Celest Functions enable you to run custom business logic in the cloud, all in Dart, with no additional tooling. With Celest, you can connect to your tools or existing backend resources to retrieve and communicate data to create the experience needed for your Flutter app. 

## Why would I want to use Celest Functions?

Running functions in the cloud provides you with a separation layer between your business logic in the cloud, and the UI of your Flutter app. Not only does this make your code more organized, but it also enables you to add features to your cloud functions (as long as they don't impact your request/response contract) without needing a new version to deploy to the app stores.


![Functions](img/function.png)

```mermaid
sequenceDiagram
    participant CF as "Celest Functions"
    participant FA as "Flutter App"
    CF->>+FA: sayHello()
    Note right of FA: celest.functions.greeting.sayHello('Celest')
    FA->>-CF: sayHello() response
    CF->>+FA: sayGoodbye()
    Note right of FA: celest.functions.greeting.sayGoodbye('Celest')
    FA->>-CF: sayGoodbye() response
