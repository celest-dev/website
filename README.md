# Website

The code for [celest.dev](https://celest.dev), home of Celest, the Flutter cloud platform.

## Development

This website is built using [Nextra](https://nextra.site/) and deployed to Vercel. To contribute, you will need to install [pnpm](https://pnpm.io/).

### Setup

Start by cloning the repository and installing its dependencies.

```console
$ git clone https://github.com/celest-dev/website
$ cd website
$ pnpm install
```

### Local Development

To start a local development server, run `pnpm dev`. Most changes will be reflected live without having to restart the server.

### Build

To build the website for production, run `pnpm build`. This command generates static content into the `build` directory.

To view the production build locally, run `pnpm start`.
