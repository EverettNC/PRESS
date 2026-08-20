import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AUDIENCES,
  BIO_FACTS,
  OWNER,
  PRODUCTS,
  PROOF,
  TAGLINES,
  VOICE_LAWS,
} from "@/lib/brand/identity";
import { CHANNELS } from "@/lib/brand/channels";
import { runRecon, saveNotes } from "@/lib/server/command";
import { useDesk, useInvalidateDesk } from "@/lib/use-desk";

export const Route = createFileRoute("/dossier")({ component: DossierPage });

function DossierPage() {
  const { data } = useDesk();
  const invalidate = useInvalidateDesk();
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (data?.notes != null) setNotes(data.notes);
  }, [data?.notes]);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-faint">
          Dossier · locked to you
        </p>
        <h1 className="font-serif text-4xl tracking-tight">Who you are.</h1>
        <p className="max-w-2xl text-muted">
          {OWNER.founder}, {OWNER.role}. {OWNER.legal}, operating as{" "}
          {OWNER.operatingAs}. {OWNER.location}. {OWNER.handle}.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        <Badge variant="paper">No login</Badge>
        <Badge>You own this</Badge>
        <Badge>Recon 19 Aug 2026</Badge>
      </div>

      <section className="grid gap-3 sm:grid-cols-2">
        <Meta label="Facebook" value="TheChristmanAIProject · 1.9k" href={OWNER.facebookPage} />
        <Meta label="Facebook page" value="TheChristmanAIProject" href={OWNER.facebookPage} />
        <Meta label="LinkedIn" value="thechristmanaiproject" href={OWNER.linkedin} />
        <Meta label="TikTok" value="@Chef_Ev" href={OWNER.tiktok} />
        <Meta label="Instagram" value="@chef_evs_journey" href={OWNER.instagram} />
        <Meta label="YouTube AI" value="@TheChristmanAIProject" href={OWNER.youtube} />
        <Meta label="YouTube kitchen" value="Evercook71" href={OWNER.youtubeChef} />
        <Meta label="X" value={OWNER.handle} href="https://x.com/ChristmanAI" />
        <Meta label="Clapper" value="Chef_Ev" href={OWNER.clapper} />
        <Meta label="Site" value={OWNER.site} href={OWNER.site} />
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl">The rooms</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {CHANNELS.map((c) => (
            <li key={c.id} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-medium">{c.name}</p>
                <p className="font-mono text-[11px] text-faint">{c.size}</p>
              </div>
              <p className="mt-1 text-sm text-muted">{c.role}</p>
              <p className="mt-2 text-[12px] text-faint">{c.play}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-2xl">Go look again</h2>
          <Button
            type="button"
            disabled={busy || !data?.aiReady}
            onClick={async () => {
              setBusy(true);
              const res = await runRecon();
              setBusy(false);
              if (!res.ok) {
                toast.error(res.error);
                return;
              }
              toast.success("Recon filed.");
              await invalidate();
            }}
          >
            {busy ? "Searching every room…" : "Run recon"}
          </Button>
        </div>
        {!data?.aiReady ? (
          <p className="text-sm text-muted">
            AI is not available in this environment. The dossier below still
            stands — it was built from your public record before this desk
            opened.
          </p>
        ) : (
          <p className="text-sm text-muted">
            Hits Facebook, LinkedIn, TikTok, Instagram, X, YouTube, and the
            site. Does not run until you say so. Does not spend the key on page
            load.
          </p>
        )}
        {data?.recon ? (
          <article className="whitespace-pre-wrap rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-fg/90">
            {data.recon.summary}
          </article>
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl">Proof</h2>
        <ul className="space-y-2">
          {PROOF.map((p) => (
            <li key={p.label} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-medium">{p.label}</p>
                <p className="font-mono text-[11px] text-faint">{p.date}</p>
              </div>
              <p className="mt-1 text-sm text-muted">{p.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl">What you build</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {PRODUCTS.map((p) => (
            <li key={p.name} className="rounded-lg border border-border bg-surface p-4">
              <p className="font-medium">{p.name}</p>
              <p className="mt-1 text-sm text-muted">{p.line}</p>
              <p className="mt-2 text-[12px] text-faint">{p.audience}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl">Voice laws</h2>
        <ol className="space-y-2">
          {VOICE_LAWS.map((law, i) => (
            <li key={law} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
              <span>{law}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl">Rooms</h2>
        <ul className="space-y-2">
          {AUDIENCES.map((a) => (
            <li key={a.room} className="rounded-lg border border-border px-4 py-3">
              <p className="text-sm font-medium">{a.room}</p>
              <p className="text-sm text-muted">{a.why}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl">Facts the operator may use</h2>
        <ul className="space-y-2 text-sm leading-relaxed text-muted">
          {BIO_FACTS.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 pt-2">
          {TAGLINES.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl">Your notes</h2>
        <p className="text-sm text-muted">
          Corrections, lines that are off-limits, people to mention. This stays
          on the desk.
        </p>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Anything I got wrong, add it here."
        />
        <Button
          type="button"
          variant="outline"
          onClick={async () => {
            await saveNotes({ data: { body: notes } });
            toast.success("Notes saved.");
            await invalidate();
          }}
        >
          Save notes
        </Button>
      </section>
    </div>
  );
}

function Meta({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-lg border border-border bg-surface px-4 py-3 hover:bg-surface-2"
    >
      <p className="text-[11px] uppercase tracking-[0.14em] text-faint">{label}</p>
      <p className="mt-1 text-sm">{value}</p>
    </a>
  );
}
