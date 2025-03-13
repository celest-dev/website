import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import Logo from "@components/Logo";
import Footer from "./components/Footer";
import { Button } from "./components/ui/button";

const config: DocsThemeConfig = {
  logo: <Logo />,
  logoLink: "/",
  project: {
    link: "https://github.com/celest-dev/celest",
  },
  chat: {
    link: "https://discord.gg/KtMAfSDXGQ",
  },
  darkMode: true,
  docsRepositoryBase: "https://github.com/celest-dev/website",
  useNextSeoProps() {
    return { titleTemplate: "%s | Celest" };
  },
  head() {
    const router = useRouter();
    const { asPath } = router;

    const url = `https://www.celest.dev${asPath}`;

    const { frontMatter, title: defaultTitle } = useConfig();
    const title = frontMatter.title ?? defaultTitle;
    const fullTitle = `${title} | Celest`;

    const description = frontMatter.description || "The Flutter cloud platform";

    let ogImage = "https://www.celest.dev/api/og";
    if (asPath !== "/") {
      ogImage += `?title=${encodeURIComponent(title)}`;
    }

    return (
      <>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
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
    text: Footer,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
};

export default config;
