import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
          Watched the channel · {CHANNEL.subs} · {CHANNEL.videos} videos
        </p>
        <h1 className="font-serif text-3xl leading-[1.05] tracking-tight sm:text-5xl">
          I watched @TheChristmanAIProject.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Inferno is 18 minutes and 13 views. The song from 2024 has 220. Old
          Chef Ev still beats the new walkthrough. Delete whatever isn’t you.
        </p>
        <Button asChild variant="outline">
          <a href={CHANNEL.href} target="_blank" rel="noreferrer">
            Open the channel
          </a>
        </Button>
      </header>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl">YouTube</h2>
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
      <div className="mt-4 flex flex-wrap gap-2">
        <CopyButton text={item.body} label="Copy" />
        <Button asChild variant="outline">
          <Link
            to="/studio"
            search={{
              source: item.id,
              kind: item.platform === "youtube" ? "tiktok" : item.platform === "facebook" ? "facebook" : "short",
            }}
          >
            Recut
          </Link>
        </Button>
        {item.url ? (
          <Button asChild variant="outline">
            <a href={item.url} target="_blank" rel="noreferrer">
              Open
            </a>
          </Button>
        ) : null}
        <Button type="button" variant="ghost" onClick={() => void onDelete()}>
          Delete
        </Button>
      </div>
    </li>
  );
}
