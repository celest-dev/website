import { PostHogProvider } from "posthog-js/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect } from "react";
import localFont from "next/font/local";
import { loadIntercom } from "./Intercom";
import { useRouter } from "next/router";

const poppins = localFont({
  preload: true,
  src: "../public/fonts/Poppins.woff2",
  display: "swap",
  variable: "--font-poppins",
});

const berkeleyMono = localFont({
  preload: true,
  src: "../public/fonts/BerkeleyMono-Regular.woff2",
  display: "swap",
  variable: "--font-berkeley-mono",
  weight: "400",
  fallback: ["monospace"],
});

// FA
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function App({ Component, pageProps }) {
  return (
    <PostHogProvider
      apiKey={process.env.NEXT_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      }}
    >
      <main className={`${poppins.variable} ${berkeleyMono.variable}`}>
        <Component {...pageProps} />
        <SpeedInsights />
      </main>
    </PostHogProvider>
  );
}
