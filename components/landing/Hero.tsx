import Link from "next/link";
import YCLogo from "./YCLogo";
import { Button } from "../ui/button";
import { usePostHog } from "posthog-js/react";

export default function Hero() {
  const posthog = usePostHog();
  return (
    <section
      id="hero"
      className="text-center flex flex-col items-center justify-center"
    >
      <YCLogo className="mt-4" />
      <h1 className="text-4xl tracking-tighter font-extrabold md:text-5xl mt-8 mb-8"  style={{ textShadow: '0px 0px 10px white' }}>
        Deploy your code to the stars
      </h1>
      <p className="text-lg md:text-xl mb-8">
        Build, deploy, and scale your app's backend. All in Dart. All without leaving your IDE.
      </p>
      <Link href="/docs/get-started">
        <Button
          className="px-6"
          onClick={() => posthog.capture("cta_clicked", { location: "hero" })}
        >
          Get Started
        </Button>
      </Link>
    </section>
  );
}
