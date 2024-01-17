---
sidebar_position: 1
title: Overview
description: Learn more about Celest and how it helps you build the backend for your Flutter app.
---

# Overview

## What is Celest?
Celest is a fully managed cloud platform that enables you to build your backend in Dart. You can build the use cases you need without needing additional tooling or context switching to different programming languages. Since you write your backend in Dart, Celest also enables you to share logic and code between your Flutter app and your backend.

## How do I use Celest?
You primarily interact with Celest using the Celest CLI. Once you download and install the CLI, you can run the `celest start` command to create a new `celest` folder in your Flutter project which will contain all of your backend logic. You can then use the Celest CLI to build your project locally and then use the code-generated client to connect to your backend. Once you feel confident with your changes, you can use the CLI to deploy your backend and have it be completely managed by Celest.

Celest offers sets of functionality that are grouped based on their use cases and are called "Cloud Widgets". You can use these widgets for building your backend, and connecting your frontend Flutter application to accomplish specific use cases such as Authentication, Data, and Storage.

Check out this video that shows you the Celest experience.

TODO: Add video

## What can I build with Celest?
At a high level, the following are the "Cloud Widgets" that are available for you to build with Celest.

| Features  | Description                                                   |
| --------- | ------------------------------------------------------------- |
| [Functions](functions/introduction.md) | Build functions that run in the cloud with your custom business logic. |
| Auth (coming soon) | Authenticate your users with social sign-in, passwordless and WebAuthn. |
| Data (coming soon) | Define your data schema, relationships, and authorization rules in code. |
| Content (coming soon) | Serve content globally with edge caching built-in. |
| Policies (coming soon) | Author fine-grained access controls for all your backend components. |

## Next steps

You can follow our next guide to learn more about how to [set up the Celest CLI](/docs/get-started.md) and get started with building your backend in Dart.
