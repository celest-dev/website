import { useState } from "react";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";
import { clsx } from "clsx";

export default function DownloadButton(props: { className?: string }) {
    const [copied, setCopied] = useState(false);
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText("dart pub global activate celest_cli");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };


    return (
        <div className={clsx("flex items-center space-x-2 bg-muted px-4 py-2 rounded-md font-mono", props.className)}>
            <span>$ dart pub global activate celest_cli</span>
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={copyToClipboard}
            >
                {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                ) : (
                    <Copy className="h-4 w-4" />
                )}
            </Button>
        </div>
    );
}