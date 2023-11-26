# Website

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ pnpm install
```

### Local Development

```
$ pnpm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ pnpm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true pnpm deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> pnpm deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Adding Google Analytics events

Below is an example of how to add a Google Analytics event to a file

```jsx
<a
  href="https://example.com"
  onClick={(e) => {
    e.preventDefault();
    window.gtag &&
      window.gtag("event", "click", {
        event_category: "Link",
        event_label: "Learn More",
      });
    window.location.href = "https://example.com";
  }}
>
  Click here!
</a>
```
