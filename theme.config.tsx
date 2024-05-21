import React from 'react'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import Logo from '@components/Logo'

const config: DocsThemeConfig = {
  logo: <Logo />,
  logoLink: '/',
  project: {
    link: 'https://github.com/celest-dev/website',
  },
  chat: {
    link: 'https://discord.gg/KtMAfSDXGQ',
  },
  docsRepositoryBase: 'https://github.com/celest-dev/website',
  useNextSeoProps() {
    return { titleTemplate: '%s | Celest' };
  },
  head() {
    const { asPath } = useRouter();
    const url = `https://docs.celest.dev${asPath}`;

    const { frontMatter, title: defaultTitle } = useConfig();
    const title = `${frontMatter.title ?? defaultTitle} | Celest`;

    return (
      <>
        <link rel="icon" type="image/png" href="/img/logo.png" />
        <title>{title}</title>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={frontMatter.description || 'The next site builder'}
        />
      </>
    );
  },
  search: {
    placeholder: 'Search the docs...'
  },
  footer: {
    text:  `Copyright © ${new Date().getFullYear()} Teo, Inc. (Celest)`,
  },
  sidebar: {
    defaultMenuCollapseLevel: 2,
  },
}

export default config
