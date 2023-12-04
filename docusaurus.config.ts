import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Celest",
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
              },
        blog:
          process.env.NODE_ENV === "production"
            ? false
            : {
                showReadingTime: true,
                // Please change this to your repo.
                // Remove this to remove the "edit this page" links.
                editUrl:
                  "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
              },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-1FVDBFPGXN",
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    head: [
      {
        tagName: "meta",
        attributes: {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
        },
      },
    ],
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "Celest",
      logo: {
        className: "navbar-logo",
        alt: "Celest Logo",
        src: "img/logo.png",
      },
      items: [
        process.env.NODE_ENV === "development" && {
          position: "left",
          type: "doc",
          to: "docs/intro.md",
          docId: "intro",
          label: "Docs",
        },
        {
          docId: "about-us",
          to: "/about-us",
          position: "left",
          label: "About Us",
        },
        {
          to: "https://github.com/celest-dev/website",
          html: '<img src="/img/github.svg" class="navbar-custom-image" alt="GitHub Page" />',
          position: "right",
          className: "custom-navbar-img",
        },
        {
          to: "https://twitter.com/celest_dev",
          html: '<img src="/img/x.svg" class="navbar-custom-image" alt="X/Twitter Page" />',
          position: "right",
          className: "custom-navbar-img",
        },
      ].filter(Boolean) as any,
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Celest`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["dart"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
