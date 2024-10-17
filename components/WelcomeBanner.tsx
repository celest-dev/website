import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Callout } from "nextra-theme-docs";
import { usePostHog } from "posthog-js/react";

export default function WelcomeBanner() {
  const searchParams = useSearchParams();
  if (searchParams.has("subscribed")) {
    return (
      <div className="text-center">
        <Callout type="info" emoji={null}>
          Welcome to Celest Cloud! 🎉
          <br />
          Your subscription is now active and you're ready to deploy your first project! 🚀
        </Callout>
      </div>
    );
  } else if (searchParams.has("error")) {
    const error = searchParams.get("error");
    const postHog = usePostHog();
    postHog.captureException(new Error(error));

    return (
      <div className="text-center">
        <Callout type="error" emoji={null}>
          We encountered an error with your subscription to Celest Cloud.
          <br />
          Please contact{" "}
          <Link href="mailto:support@celest.dev" className="underline">
            support@celest.dev
          </Link>{" "}
          or visit us on{" "}
          <Link href="/discord" className="underline">
            Discord
          </Link>{" "}
          so we can resolve this issue.
        </Callout>
      </div>
    );
  }

  return null;
}
