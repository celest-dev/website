// @ts-check
import { withSentryConfig } from "@sentry/nextjs";
import nextra from "nextra";

/** @type {import('nextra/types').NextraConfig} */
const nextraConfig = {
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  staticImage: true,
  flexsearch: {
    codeblocks: false,
  },
  codeHighlight: true,
};

/**
 * @type {import('next').NextConfig}
 */
export default withSentryConfig(
  nextra(nextraConfig)({
    redirects: () => [
      {
        source: "/docs/functions/introduction",
        destination: "/docs/functions",
        statusCode: 301,
      },
      {
        source: "/docs/auth/introduction",
        destination: "/docs/auth",
        statusCode: 301,
      },
      {
        source: "/blog/local-iterations-mvp",
        destination: "/blog/local-iterations-release",
        statusCode: 301,
      },
      {
        source: "/download",
        destination: "/docs/download",
        statusCode: 302,
      },
      {
        source: "/docs/functions/http-requests",
        destination: "/docs/functions/http/conventions",
        statusCode: 301,
      },
      {
        source: "/docs/overview",
        destination: "/docs",
        statusCode: 301,
      },
      {
        source: "/about-us",
        destination: "/",
        statusCode: 302,
      },
      {
        // Found in the wild... Googlebot was trying to access this URL
        source: '/See',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/pricing',
        destination: '/docs/cloud',
        statusCode: 302,
      },
      {
        source: '/docs/cloud/pricing',
        destination: '/docs/cloud',
        statusCode: 302,
      },
      {
        source: '/tos',
        // The is the more common URL
        destination: '/terms',
        statusCode: 301,
      }
    ],
  }),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: "celest",
    project: "javascript",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    telemetry: false,
  }
);
