import Link from "next/link";
import YCLogo from "./YCLogo";
import { Button } from "../ui/button";
import { usePostHog } from "posthog-js/react";

export default function Hero() {
  const posthog = usePostHog();
  return (
    <section
      id="hero"
      className="text-center flex flex-col items-center justify-center py-6"
    >
      <h1 className="text-6xl tracking-tighter font-extrabold lg:text-8xl md:text-7xl mt-8 mb-8">
        Flutter. Backend.
        <br />
        Done. ✅
      </h1>
      <p className="text-lg md:text-xl mb-8">
        Write your backend like a Flutter app &mdash; deploy it like magic 🚀
      </p>
      <div className="flex flex-row justify-center items-center space-x-4 my-4">
        <Link href="https://dash.celest.dev">
          <Button
            size="lg"
            variant="default"
            className="px-6"
            onClick={() => posthog.capture("cta_clicked", { location: "hero", variant: "get_started" })}
          >
            Get Started
          </Button>
        </Link>

        <Link href="/docs">
          <Button
            size="lg"
            variant="secondary"
            className="px-6"
            onClick={() => posthog.capture("cta_clicked", { location: "hero", variant: "docs" })}
          >
            Docs
          </Button>
        </Link>
      </div>
    </section>
  );
}
