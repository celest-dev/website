import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import Logo from "@components/Logo";
import Footer from "./components/Footer";

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
    const router = useRouter();
    const { asPath } = router;

    const url = `https://www.celest.dev${asPath}`;
    const { frontMatter, title: defaultTitle } = useConfig();
    const title = frontMatter.title ?? defaultTitle;
    const fullTitle = `${title} | Celest`;
    const description = frontMatter.description || "The Flutter cloud platform";

    // Conditional Open Graph image generation
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
  banner: {
    key: '0.4-release',
    text: (
      <div className="banner">
        Celest 0.4 is out with support for server-side Flutter! 🚀{" "}
        <a href="/blog/fluttering-in-the-sky">Read more →</a>
      </div>
    ),
    dismissible: false,
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
  // Disable theme switcher
  theme: undefined, // This will hide the light/dark mode switcher
  // Add the container with the backdrop and background styles
  components: {
    wrapper: ({ children }) => {
      const router = useRouter();
      
      // Conditionally apply the background to all pages except the home page
      if (router.pathname === "/") {
        return <>{children}</>; // No background for the home page
      }

      return (
        <div
          style={{
            backdropFilter: 'blur(10px)', // Adds blur effect to the background
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Translucent background
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Optional shadow for effect
            minHeight: '100vh', // Ensures the background covers the entire viewport height
          }}
        >
          {children}
        </div>
      );
    },
  },
};

export default config;
