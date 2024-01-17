import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "Celest - The Flutter cloud platform",
  tagline: "A managed cloud platform to build full-stack Flutter and Dart apps",
  favicon: "img/logo.png",

  // Set the production url of your site here
  url: "https://celest.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  organizationName: "celest-dev",
  projectName: "website",
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  headTags: [
    // Sentry
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://js.sentry-cdn.com',
      }
    },
    {
      tagName: 'script',
      attributes: {
        src: "https://js.sentry-cdn.com/5e1c9ebbaa5b3f636fc63ba5003412d2.min.js",
        crossorigin: "anonymous",
      },
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
      Sentry.onLoad(function() {
        Sentry.init({
          attachStacktrace: true,
          environment: "${process.env.NODE_ENV}",
          integrations: [
            new Sentry.BrowserTracing({
              traceOrigins: ["*"],
              tracePropagationTargets: ["*"],
            }),
          ],
          // Performance Monitoring
          tracesSampleRate: 0.5, // Capture 100% of the transactions
        });
      });
      `,
    },

    // PostHog
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://eu.posthog.com",
      },
    },
    {
      tagName: "script",
      attributes: {},
      innerHTML: `
      !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
      posthog.init('phc_IzYKGpBnjbb4GM7JsfaIzIu34EVh4PqgbZLVuihCaSm',{api_host:'https://eu.posthog.com'})
      `,
    },

    // Fonts
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      }
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      }
    },
    {
      tagName: 'link',
      attributes: {
        href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,400&family=Poppins:wght@300&display=swap',
        rel: 'stylesheet',
      }
    }
  ],

  presets: [
    [
      "classic",
      {
        docs:
          process.env.NODE_ENV === "production"
            ? false
            : {
              sidebarPath: "./sidebars.ts",
              // Please change this to your repo.
              // Remove this to remove the "edit this page" links.
              editUrl:
                "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
              sidebarCollapsed: false,
              // sidebarCollapsible: false
            },
        blog:
          process.env.NODE_ENV === "production"
            ? false
            : {
              showReadingTime: false,
              blogTitle: "Celest Blog",   
              // Please change this to your repo.
              // Remove this to remove the "edit this page" links.
              editUrl:
                "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
            },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/open-graph.png",
    metadata: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
      },
      {
        name: "twitter:title",
        content: "Celest - The Flutter cloud platform",
      },
      {
        name: "twitter:site",
        content: "@celest_dev",
      },
      {
        name: "twitter:description",
        content:
          "A managed cloud platform to build full-stack Flutter and Dart apps",
      },
      {
        name: "twitter:domain",
        content: "celest.dev",
      },
      {
        name: "twitter:url",
        content: "https://celest.dev",
      },
    ],
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      items: [
        process.env.NODE_ENV === "production"
          ? false
          : {
              position: "left",
              type: "doc",
              to: "docs/overview.md",
              docId: "overview",
              label: "Docs",
            },
        process.env.NODE_ENV === "production"
          ? false
          : { to: "/download", label: "Download", position: "left" },
        process.env.NODE_ENV === "production"
          ? false
          : { to: "/blog", label: "Blog", position: "left" },
        {
          docid: "about-us",
          to: "/about-us",
          position: "left",
          label: "About Us",
        },
        {
          to: "https://github.com/celest-dev/celest",
          html: '<img src="/img/github.svg" class="navbar-custom-image" alt="GitHub Page" />',
          position: "right",
          className: "custom-navbar-img",
        },
        {
          to: "https://twitter.com/celest_dev",
          html: `
          <picture>
            <source srcset="/img/x.webp" type="image/webp" />
            <img class="navbar-custom-image" src="/img/x.png" alt="X/Twitter Page" />
          </picture>
          `,
          position: "right",
          className: "custom-navbar-img",
        },
        {
          to: "https://discord.gg/vgWwpsXH",
          html: '<img src="/img/discord.png" class="navbar-custom-image discord-navbar-image" alt="Discord Server" />',
          position: "right",
          className: "custom-navbar-img",
        },
        {
          to: "https://www.linkedin.com/company/celest-dev/",
          html: '<img src="/img/linkedin-black.svg" class="navbar-custom-image" alt="LinkedIn Page" />',
          position: "right",
          className: "custom-navbar-img",
        },
        {
          to: "https://www.youtube.com/@celest-dev",
          html: '<img src="/img/youtube.svg" class="navbar-custom-image" alt="Youtube Channel" />',
          position: "right",
          className: "custom-navbar-img",
        },
      ].filter(Boolean) as any,
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Teo, Inc.`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["dart"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
