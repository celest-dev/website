import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "Celest - The Flutter cloud platform",
  tagline: "A backend-as-a-service (BaaS) to build full-stack Flutter and Dart apps",
  favicon: "img/logo.png",

  url: "https://celest.dev",
  baseUrl: "/",

  organizationName: "celest-dev",
  projectName: "website",
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  headTags: [
    // Sentry
    {
      tagName: "script",
      attributes: {
        // To update, download: https://js.sentry-cdn.com/5e1c9ebbaa5b3f636fc63ba5003412d2.min.js
        src: "/js/sentry.min.js",
      },
    },
    {
      tagName: "script",
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
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "anonymous",
      },
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/celest-dev/website/tree/main/",
          sidebarCollapsed: false,
        },
        blog: {
          showReadingTime: false,
          blogTitle: "Celest Blog",
          editUrl:
            "https://github.com/celest-dev/website/tree/main/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "https://discord.gg/KtMAfSDXGQ",
            from: "/discord",
          },
          {
            to: '/docs/overview',
            from: '/docs',
          }
        ],
      },
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
          "A serverless backend for full-stack Flutter and Dart apps",
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
      hideOnScroll: true,
      items: [
        {
          position: "left",
          type: "doc",
          to: "/docs/overview.md",
          docId: "overview",
          label: "Docs",
        },
        { to: "/#pricing", label: "Pricing", position: "left", activeBasePath: 'never' },
        { to: "/blog", label: "Blog", position: "right" },
        {
          to: "https://github.com/celest-dev/celest",
          html: '<img src="/img/github.svg" class="navbar-custom-image" width="27" height="27" alt="GitHub Page" />',
          position: "right",
          className: "custom-navbar-img",
        },
        {
          to: "https://twitter.com/celest_dev",
          html: `
          <picture>
            <source srcset="/img/x.webp" type="image/webp" width="27" height="27" />
            <img class="navbar-custom-image" src="/img/x.png" width="27" height="27" alt="X/Twitter Page" />
          </picture>
          `,
          position: "right",
          className: "custom-navbar-img",
        },
        {
          to: "https://celest.dev/discord",
          html: '<img src="/img/discord.png" class="navbar-custom-image discord-navbar-image" width="35" height="35" alt="Discord Server" />',
          position: "right",
          className: "custom-navbar-img",
        },
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Teo, Inc. (Celest)`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["dart", "json", "diff"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
