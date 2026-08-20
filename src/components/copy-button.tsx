import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  }
}

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
        const ok = await writeClipboard(text);
        if (!ok) {
          toast.error("Clipboard blocked. Select the text and copy it.");
          return;
        }
        setDone(true);
        toast.success("Copied.");
        window.setTimeout(() => setDone(false), 1600);
      }}
    >
      {done ? <Check /> : <Copy />}
      {done ? "Copied" : label}
    </Button>
  );
}
