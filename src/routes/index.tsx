import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { CopyButton } from "@/components/copy-button";
import { PushBar } from "@/components/push-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ALPHAVOX_PUSH } from "@/lib/brand/alphavox-push";
import { CHANNEL } from "@/lib/brand/youtube";
import { deleteLibraryItem, loadDesk } from "@/lib/server/command";
import { useDesk, useInvalidateDesk } from "@/lib/use-desk";

export const Route = createFileRoute("/")({
  loader: () => loadDesk(),
  component: Briefing,
});

function Briefing() {
  const seeded = Route.useLoaderData();
  const { data } = useDesk();
  const invalidate = useInvalidateDesk();
  const desk = data ?? seeded;
  const youtube = desk.library.filter((i) => i.platform === "youtube");
  const rest = desk.library.filter((i) => i.platform !== "youtube");

  return (
    <div className="space-y-6 sm:space-y-10">
      <header className="space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-faint">
          Christman Command · the job is push
        </p>
        <h1 className="font-serif text-3xl leading-[1.05] tracking-tight sm:text-5xl">
          Push AlphaVox.
        </h1>
        <p className="hidden max-w-2xl text-sm leading-relaxed text-muted sm:block sm:text-base">
          Promo video is the job. File was too big to drop here — upload it,
          then hit a room. Caption is copied. Composer opens. You publish.
        </p>
      </header>

      <section className="rounded-xl border border-signal/40 bg-signal/10 p-4 sm:p-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-signal">
          AlphaVox · push now
        </p>
        <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
          {ALPHAVOX_PUSH.youtubeTitle}
        </h2>
        <p className="mt-2 text-sm text-muted">
          32 seconds. Start the upload at 0:01 — first frame is mid-sentence.
          Facebook is TheChristmanAIProject. Attach the file and publish.
        </p>
        <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-fg">
          {ALPHAVOX_PUSH.facebook}
        </pre>
        <div className="mt-4">
          <PushBar
            text={ALPHAVOX_PUSH.facebook}
            url={ALPHAVOX_PUSH.site}
            platform="facebook"
          />
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <PackCard
          room="YouTube title"
          body={ALPHAVOX_PUSH.youtubeTitle}
          platform="youtube"
        />
        <PackCard
          room="YouTube description"
          body={ALPHAVOX_PUSH.youtubeDescription}
          platform="youtube"
        />
        <PackCard room="TikTok / Reels" body={ALPHAVOX_PUSH.tiktok} platform="tiktok" />
        <PackCard room="Instagram" body={ALPHAVOX_PUSH.instagram} platform="instagram" />
        <PackCard room="LinkedIn" body={ALPHAVOX_PUSH.linkedin} platform="linkedin" />
        <PackCard room="X" body={ALPHAVOX_PUSH.x} platform="x" />
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl">YouTube · {CHANNEL.subs}</h2>
        <ul className="space-y-4">
          {youtube.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onDelete={async () => {
                await deleteLibraryItem({ data: { id: item.id } });
                toast.success("Deleted. It will not come back.");
                await invalidate();
              }}
            />
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl">Everything else</h2>
        <ul className="space-y-4">
          {rest.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onDelete={async () => {
                await deleteLibraryItem({ data: { id: item.id } });
                toast.success("Deleted. It will not come back.");
                await invalidate();
              }}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

function PackCard({
  room,
  body,
  platform,
}: {
  room: string;
  body: string;
  platform: string;
}) {
  return (
    <article className="rounded-xl border border-border bg-surface p-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">{room}</p>
      <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed">{body}</pre>
      <div className="mt-4">
        <PushBar text={body} url={ALPHAVOX_PUSH.site} platform={platform} />
      </div>
    </article>
  );
}

function ItemCard({
  item,
  onDelete,
}: {
  item: {
    id: string;
    platform: string;
    title: string;
    body: string;
    url: string | null;
    posted_at: string | null;
    views: number | null;
    diagnosis: string | null;
  };
  onDelete: () => Promise<void>;
}) {
  return (
    <li className="rounded-xl border border-border bg-surface p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{item.platform}</Badge>
        {item.views != null && item.views > 0 ? (
          <Badge variant={item.views < 50 ? "signal" : "ok"}>{item.views} views</Badge>
        ) : null}
        <span className="font-mono text-[11px] text-faint">{item.posted_at}</span>
      </div>
      <h3 className="mt-3 font-serif text-2xl">{item.title}</h3>
      <pre className="mt-3 line-clamp-8 whitespace-pre-wrap font-sans text-sm leading-relaxed text-fg">
        {item.body}
      </pre>
      {item.diagnosis ? <p className="mt-3 text-sm text-muted">{item.diagnosis}</p> : null}
      <div className="mt-4 space-y-3">
        <PushBar text={item.body} url={item.url} platform={item.platform} />
        <div className="flex flex-wrap gap-2">
          <CopyButton text={item.body} label="Copy only" />
          <Button asChild variant="outline">
            <Link
              to="/studio"
              search={{
                source: item.id,
                kind:
                  item.platform === "youtube"
                    ? "tiktok"
                    : item.platform === "facebook"
                      ? "facebook"
                      : "short",
              }}
            >
              Recut first
            </Link>
          </Button>
          <Button type="button" variant="ghost" onClick={() => void onDelete()}>
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}
