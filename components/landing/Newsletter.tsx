import Link from "next/link";
import EmailForm from "./EmailForm";
import { cn } from "@/src/utils";

export default function Newsletter({
  className,
  header = "Celest Cloud is currently closed for sign ups",
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
      <p className="font-bold max-w-lg my-4 text-2xl">{header}</p>
      <p className="text-md max-w-lg my-4">
        Subscribe to our newsletter for product updates and to get notified when
        we open up again!
        <br />
        <br />
        And if you have any questions, feel free to{" "}
        <Link className="text-blue-600" href="/contact">
          give us a shout
        </Link>
        .
      </p>
      <EmailForm className="w-full" />
    </section>
  );
}
