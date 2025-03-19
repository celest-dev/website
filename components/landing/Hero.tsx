import Link from "next/link";
import { Button } from "../ui/button";
import { usePostHog } from "posthog-js/react";
import DownloadButton from "../DownloadButton";

export default function Hero() {
  const posthog = usePostHog();

  return (
    <section
      id="hero"
      className="text-center flex flex-col items-center justify-center py-4"
    >
      <h1 className="text-6xl tracking-tighter font-extrabold lg:text-8xl md:text-7xl mt-8 mb-8">
        Flutter. Backend.
        <br />
        Done. ✅
      </h1>
      <p className="text-lg md:text-xl mb-8">
        Write your backend like a Flutter app &mdash; deploy it like magic 🚀
      </p>
      <div className="flex flex-col items-center space-y-4 my-4">
        <DownloadButton />
        <div className="flex flex-row justify-center items-center space-x-4">
          <Link href="/docs/get-started">
            <Button
              size="lg"
              variant="default"
              className="px-6"
              onClick={() => posthog.capture("cta_clicked", { location: "hero", variant: "docs" })}
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
