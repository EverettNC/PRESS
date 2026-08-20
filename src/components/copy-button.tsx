import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CopyButton({
  text,
  label = "Copy",
  prominent = false,
}: {
  text: string;
  label?: string;
  prominent?: boolean;
}) {
  const [done, setDone] = useState(false);
  return (
    <Button
      type="button"
      variant={prominent ? "default" : "outline"}
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setDone(true);
        window.setTimeout(() => setDone(false), 1600);
      }}
    >
      {done ? <Check /> : <Copy />}
      {done ? "Copied" : label}
    </Button>
  );
}
