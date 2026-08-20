import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { deleteDraft, generatePack, saveDraft } from "@/lib/server/command";
import { critiqueVoice, voiceScore } from "@/lib/brand/voice";
import { useDesk, useInvalidateDesk } from "@/lib/use-desk";
import { cn } from "@/lib/utils";

type Search = { source?: string; kind?: string };

export const Route = createFileRoute("/studio")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    source: typeof s.source === "string" ? s.source : undefined,
    kind: typeof s.kind === "string" ? s.kind : undefined,
  }),
  component: StudioPage,
});

const KINDS = [
  { id: "facebook", label: "Facebook" },
  { id: "tiktok", label: "TikTok / Reels" },
  { id: "instagram", label: "Instagram" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "short", label: "X short" },
  { id: "reply", label: "X quote" },
  { id: "thread", label: "X thread" },
  { id: "youtube", label: "YouTube" },
] as const;

function StudioPage() {
  const search = Route.useSearch();
  const { data } = useDesk();
  const invalidate = useInvalidateDesk();
  const library = data?.library ?? [];
  const [sourceId, setSourceId] = useState(search.source ?? "");
  const [kind, setKind] = useState(search.kind ?? "facebook");
  const [extra, setExtra] = useState("");
  const [busy, setBusy] = useState(false);
  const [pack, setPack] = useState<{
    hook: string;
    body: string;
    alt: string;
    why: string;
    rooms: string[];
  } | null>(null);

  useEffect(() => {
    if (search.source) setSourceId(search.source);
    if (search.kind) setKind(search.kind);
  }, [search.source, search.kind]);

  useEffect(() => {
    if (!sourceId && library[0]) setSourceId(library[0].id);
  }, [library, sourceId]);

  const source = useMemo(
    () => library.find((i) => i.id === sourceId) ?? library[0],
    [library, sourceId],
  );
  const liveBody = pack?.body ?? "";
  const flags = critiqueVoice(liveBody);
  const score = voiceScore(flags);

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-faint">
          Studio · writes in your voice, from your material
        </p>
        <h1 className="font-serif text-4xl tracking-tight">Make it travel.</h1>
        <p className="max-w-2xl text-muted">
          Pick something you already wrote. Pick the room. Facebook, TikTok,
          Instagram, LinkedIn, YouTube, and X are different objects. This will
          not emit one blob and tell you to post it everywhere.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
            Source
          </label>
          <div className="flex max-h-36 flex-wrap gap-2 overflow-y-auto sm:max-h-none">
            {library.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSourceId(item.id)}
                className={cn(
                  "rounded-full border px-3 py-2 text-left text-xs transition-colors",
                  source?.id === item.id
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-border text-muted hover:text-fg",
                )}
              >
                {item.title}
              </button>
            ))}
          </div>

          {source ? (
            <article className="rounded-lg border border-border bg-surface p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-faint">
                {source.platform} · {source.views ?? "—"} views
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted">
                {source.body}
              </p>
            </article>
          ) : null}

          <div className="flex flex-wrap gap-2">
            {KINDS.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setKind(k.id)}
                className={cn(
                  "h-11 rounded-md border px-3 text-sm",
                  kind === k.id
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-border text-muted",
                )}
              >
                {k.label}
              </button>
            ))}
          </div>

          <Textarea
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            placeholder="Optional: a room to enter, a line that must stay, a person to mention."
            className="min-h-24"
          />

          <Button
            type="button"
            disabled={busy || !source || !data?.aiReady}
            onClick={async () => {
              if (!source) return;
              setBusy(true);
              const res = await generatePack({
                data: {
                  sourceTitle: source.title,
                  sourceBody: source.body,
                  kind,
                  extra,
                },
              });
              setBusy(false);
              if (!res.ok) {
                toast.error(res.error);
                return;
              }
              setPack(res.pack);
            }}
          >
            {busy ? "Writing…" : data?.aiReady ? "Write the recut" : "AI unavailable"}
          </Button>
        </div>

        <div className="space-y-4">
          {pack ? (
            <>
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-serif text-2xl">Ready</h2>
                <Badge variant={score >= 80 ? "ok" : "signal"}>Voice {score}</Badge>
              </div>
              {pack.hook ? (
                <p className="font-serif text-3xl leading-tight">{pack.hook}</p>
              ) : null}
              <pre className="whitespace-pre-wrap rounded-lg border border-border bg-surface p-4 font-sans text-sm leading-relaxed">
                {pack.body}
              </pre>
              <div className="flex flex-wrap gap-2">
                <CopyButton text={pack.body} />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    await saveDraft({
                      data: {
                        kind,
                        title: pack.hook || source?.title || "Draft",
                        body: pack.body,
                        sourceId: source?.id,
                      },
                    });
                    toast.success("Saved to drafts.");
                    await invalidate();
                  }}
                >
                  Save draft
                </Button>
              </div>
              {pack.alt ? (
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-faint">
                    Shorter alternate
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-muted">{pack.alt}</p>
                  <div className="mt-2">
                    <CopyButton text={pack.alt} label="Copy alt" />
                  </div>
                </div>
              ) : null}
              {pack.why ? (
                <p className="text-sm leading-relaxed text-muted">{pack.why}</p>
              ) : null}
              {pack.rooms.length ? (
                <ul className="flex flex-wrap gap-2">
                  {pack.rooms.map((r) => (
                    <Badge key={r}>{r}</Badge>
                  ))}
                </ul>
              ) : null}
              <ul className="space-y-1">
                {flags.map((f) => (
                  <li
                    key={f.code}
                    className={cn("text-sm", f.ok ? "text-ok" : "text-signal")}
                  >
                    {f.note}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted">
              The recut lands here. Voice lock runs on whatever is written —
              hook length, banned theater, proof, dignity, hashtag ceiling.
            </div>
          )}
        </div>
      </div>

      {(data?.drafts ?? []).length ? (
        <section className="space-y-3">
          <h2 className="font-serif text-2xl">Drafts</h2>
          <ul className="space-y-3">
            {data?.drafts.map((draft) => (
              <li
                key={draft.id}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{draft.kind}</Badge>
                  <span className="text-sm text-muted">{draft.title}</span>
                </div>
                <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {draft.body}
                </pre>
                <div className="mt-3 flex flex-wrap gap-2">
                  <CopyButton text={draft.body} />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={async () => {
                      await deleteDraft({ data: { id: draft.id } });
                      toast.success("Deleted. It will not come back.");
                      await invalidate();
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
