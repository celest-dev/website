import Link from "next/link";
import EmailForm from "./EmailForm";
import { cn } from "@/src/utils";

export default function Newsletter({
  className,
  header = "Stay in the loop",
}: {
  header?: string;
} & React.ComponentProps<"section">) {
  return (
    <section
      id="notify"
      className={cn(
        "flex flex-col items-center justify-center text-center my-4",
        className
      )}
    >
      <p className="text-md max-w-lg my-4">
        Subscribe to our newsletter for the latest product updates and news!
      </p>
      <EmailForm className="w-full" />
    </section>
  );
}
