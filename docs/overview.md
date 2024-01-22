---
sidebar_position: 1
title: Overview
description: Learn more about Celest and how it helps you build the backend for your Flutter app.
---

# Overview

## What is Celest?

Celest is a fully managed cloud platform for Flutter developers that enables you to build your backend entirely in Dart. Build the use cases you need without any additional tooling or context switching to different programming languages. Writing your backend in Dart, Celest enables you to share logic and code between your Flutter app and your backend.

## How do I use Celest?

You primarily interact with Celest using the [Celest CLI](/download). 

Once you download and install the CLI, run `celest start` from your Flutter project to create your `celest` folder. This will contain all of your backend logic. You can then use the Celest CLI to build your project locally and leverage the code-generated client in your Flutter app to connect to your backend. When you feel confident with your changes, use the CLI to deploy your backend to the cloud.

Celest offers a set of use cases via "Cloud Widgets," constructs that encapsulate groups of functionality. Using these widgets you can declaratively define your backend features such as Authentication, Data, and Storage.

<!-- Check out this video that shows you the Celest experience.
TODO: add the local iterations launch video.

<div id="docs-videos">
   <iframe src="https://www.youtube.com/embed/Br9aStq5u2Y?si=gAJfTve_vH8hO8lC" title="Celest | Local CLI Experience" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div> -->

## What can I build with Celest?

At a high level, the following "Cloud Widgets" are available for you when building with Celest.

:::info

**Note:** Celest is currently in beta and not all of the Cloud Widgets are available yet. We will be rolling out new features and functionality over the coming months.
If there's a use case you'd like to see which isn't listed here, please let us know by [creating an issue](https://github.com/celest-dev/celest/issues/new/choose) in our GitHub repo
or chatting with us on [Discord](https://celest.dev/discord).

:::

| Features  | Description                                                   |
| --------- | ------------------------------------------------------------- |
| [Functions](functions/introduction.md) | Build functions that run in the cloud with your custom business logic. |
| Auth (coming soon) | Authenticate your users with social sign-in, passwordless and WebAuthn. |
| Data (coming soon) | Define your data schema, relationships, and authorization rules in code. |
| Content (coming soon) | Serve content globally with edge caching built-in. |
| Policies (coming soon) | Author fine-grained access controls for all your backend components. |

## Next steps

Follow the next guide to learn more about how to [set up the Celest CLI](/docs/get-started.md) and get started building your backend in Dart.
