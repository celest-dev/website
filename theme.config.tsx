import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import Logo from "@components/Logo";

const config: DocsThemeConfig = {
  logo: <Logo />,
  logoLink: "/",
  project: {
    link: "https://github.com/celest-dev/website",
  },
  chat: {
    link: "https://discord.gg/KtMAfSDXGQ",
  },
  docsRepositoryBase: "https://github.com/celest-dev/website",
  useNextSeoProps() {
    return { titleTemplate: "%s | Celest" };
  },
  head() {
    const { asPath } = useRouter();
    const url = `https://docs.celest.dev${asPath}`;

    const { frontMatter, title: defaultTitle } = useConfig();
    const title = frontMatter.title ?? defaultTitle;
    const fullTitle = `${title} | Celest`;

    const description = frontMatter.description || "The Flutter cloud platform";

    let ogImage = "https://celest.dev/api/og";
    if (asPath !== "/") {
      ogImage += `?title=${encodeURIComponent(title)}`;
    }

    return (
      <>
        <link rel="icon" type="image/png" href="/img/logo.png" />
        <title>{fullTitle}</title>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@celest_dev" />
        <meta name="twitter:creator" content="@celest_dev" />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={fullTitle} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
      </>
    );
  },
  search: {
    placeholder: "Search the docs...",
  },
  footer: {
    text: `Copyright © ${new Date().getFullYear()} Teo, Inc. (Celest)`,
  },
  sidebar: {
    defaultMenuCollapseLevel: 2,
  },
};

export default config;
