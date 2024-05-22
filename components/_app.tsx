import { PostHogProvider } from "posthog-js/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect } from "react";
import localFont from "next/font/local";
import { loadIntercom } from "./Intercom";

const poppins = localFont({
  preload: true,
  src: "../public/fonts/Poppins.woff2",
  display: "swap",
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    loadIntercom();
  }, []);

  return (
    <PostHogProvider
      apiKey={process.env.NEXT_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      }}
    >
      <link rel="preconnect" href="https://widget.intercom.io" crossOrigin="" />
      <link rel="preconnect" href="https://js.intercomcdn.com" crossOrigin="" />
      <link rel="preconnect" href="https://downloads.intercomcdn.com" crossOrigin="" />
      <link rel="preconnect" href="https://api-iam.intercom.io" crossOrigin="" />
      <main className={`${poppins.variable}`}>
        <Component {...pageProps} />
        <SpeedInsights />
      </main>
    </PostHogProvider>
  );
}
