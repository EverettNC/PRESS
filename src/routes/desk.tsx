import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { clearDeskChat, deskAsk } from "@/lib/server/command";
import { useDesk, useInvalidateDesk } from "@/lib/use-desk";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/desk")({ component: DeskPage });

const STARTERS = [
  "Rewrite the NVIDIA Inception video for Facebook Chef.Ev — 4.3k, 10 comments already waiting — then a 12-second TikTok/Reels cut.",
  "Write the LinkedIn founder letter. One ask for an introduction. No theater.",
  "Audit every channel like a hostile editor: Facebook, LinkedIn, TikTok, Instagram, YouTube, X. No praise.",
  "Turn Inferno into a Facebook native post AND a TikTok script. Veterans. Not a YouTube link dump.",
  "Draft the glove post for LinkedIn and a 12-second TikTok. Deadline 30 September.",
];

function DeskPage() {
  const { data } = useDesk();
  const invalidate = useInvalidateDesk();
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState(true);
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const chat = data?.chat ?? [];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.length]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    setMessage("");
    const res = await deskAsk({ data: { message: trimmed, search } });
    setBusy(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    await invalidate();
  }

  return (
    <div className="flex min-h-[70dvh] flex-col gap-6">
      <header className="space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-faint">
          Desk · already briefed on you
        </p>
        <h1 className="font-serif text-4xl tracking-tight">Ask the operator.</h1>
        <p className="max-w-2xl text-muted">
          It has the dossier, the view counts, the voice laws, and the glove
          deadline. It will go look at X when you leave search on. It will not
          ask you to introduce yourself.
        </p>
      </header>

      {chat.length === 0 ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {STARTERS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-lg border border-border bg-surface p-4 text-left text-sm leading-relaxed text-muted hover:text-fg"
            >
              {s}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {chat.map((m) => (
            <article
              key={m.id}
              className={cn(
                "rounded-lg px-4 py-3 text-sm leading-relaxed",
                m.role === "user"
                  ? "ml-6 bg-surface-2"
                  : "mr-2 whitespace-pre-wrap border border-border bg-surface",
              )}
            >
              <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-faint">
                {m.role === "user" ? "Everett" : "Operator"}
              </p>
              {m.content}
            </article>
          ))}
          {busy ? (
            <p className="text-sm text-faint">Looking…</p>
          ) : null}
          <div ref={endRef} />
        </div>
      )}

      <form
        className="sticky bottom-20 space-y-3 bg-bg pt-2 lg:bottom-0"
        onSubmit={(e) => {
          e.preventDefault();
          void send(message);
        }}
      >
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell it what to do with your content."
          className="min-h-24"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              void send(message);
            }
          }}
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex h-11 items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={search}
              onChange={(e) => setSearch(e.target.checked)}
              className="size-4 accent-accent"
            />
            Search every room
          </label>
          <div className="flex gap-2">
            {chat.length ? (
              <Button
                type="button"
                variant="ghost"
                onClick={async () => {
                  await clearDeskChat();
                  await invalidate();
                }}
              >
                Clear
              </Button>
            ) : null}
            <Button type="submit" disabled={busy || !data?.aiReady}>
              {busy ? "Working…" : "Send"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
