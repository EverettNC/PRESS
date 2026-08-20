import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addLibraryItem, deleteLibraryItem } from "@/lib/server/command";
import { useDesk, useInvalidateDesk } from "@/lib/use-desk";

export const Route = createFileRoute("/library")({ component: LibraryPage });

function LibraryPage() {
  const { data } = useDesk();
  const invalidate = useInvalidateDesk();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("facebook");
  const [filter, setFilter] = useState("all");

  const items = (data?.library ?? []).filter(
    (item) => filter === "all" || item.platform === filter,
  );

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-faint">
          Library · your actual content
        </p>
        <h1 className="font-serif text-4xl tracking-tight">What you already made.</h1>
        <p className="max-w-2xl text-muted">
          Pulled from Facebook Chef.Ev, the project page, LinkedIn, TikTok,
          Instagram, YouTube, X, and the site. Paste anything new and Studio
          will write from it — for the channel you pick, not as a generic blob.
        </p>
      </header>

      <form
        className="space-y-3 rounded-xl border border-border bg-surface p-4 sm:p-5"
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await addLibraryItem({
            data: { title, body, platform, url },
          });
          if (!res.ok) {
            toast.error(res.error);
            return;
          }
          setTitle("");
          setBody("");
          setUrl("");
          toast.success("In the library.");
          await invalidate();
        }}
      >
        <p className="text-sm font-medium">Drop new material</p>
        <div className="grid gap-3 sm:grid-cols-[1fr_140px]">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What is this"
            required
          />
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="h-11 rounded-md border border-border bg-surface px-3 text-sm"
          >
            <option value="facebook">Facebook</option>
            <option value="linkedin">LinkedIn</option>
            <option value="tiktok">TikTok</option>
            <option value="instagram">Instagram</option>
            <option value="x">X</option>
            <option value="youtube">YouTube</option>
            <option value="site">Site</option>
            <option value="other">Other</option>
          </select>
        </div>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL if it has one"
        />
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Paste the post, transcript, or line."
          required
        />
        <Button type="submit">Add to library</Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {["all", "facebook", "linkedin", "tiktok", "instagram", "youtube", "x", "site"].map(
          (p) => (
            <button
              key={p}
              type="button"
              onClick={() => setFilter(p)}
              className={
                filter === p
                  ? "h-11 rounded-md bg-accent px-3 text-sm text-accent-fg"
                  : "h-11 rounded-md border border-border px-3 text-sm text-muted"
              }
            >
              {p === "all" ? "All rooms" : p}
            </button>
          ),
        )}
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="rounded-xl border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{item.platform}</Badge>
              {item.views != null && item.views > 0 ? (
                <Badge variant={item.views < 50 ? "signal" : "ok"}>
                  {item.views} views
                </Badge>
              ) : null}
              <span className="font-mono text-[11px] text-faint">{item.posted_at}</span>
            </div>
            <h2 className="mt-3 font-serif text-2xl">{item.title}</h2>
            <p className="mt-2 line-clamp-5 whitespace-pre-wrap text-sm leading-relaxed text-muted">
              {item.body}
            </p>
            {item.diagnosis ? (
              <p className="mt-3 text-sm text-fg/80">{item.diagnosis}</p>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link
                  to="/studio"
                  search={{
                    source: item.id,
                    kind:
                      item.platform === "facebook"
                        ? "facebook"
                        : item.platform === "linkedin"
                          ? "linkedin"
                          : item.platform === "tiktok"
                            ? "tiktok"
                            : item.platform === "instagram"
                              ? "instagram"
                              : item.platform === "youtube"
                                ? "youtube"
                                : "short",
                  }}
                >
                  Use in Studio
                </Link>
              </Button>
              {item.url ? (
                <Button asChild size="sm" variant="outline">
                  <a href={item.url} target="_blank" rel="noreferrer">
                    Open original
                  </a>
                </Button>
              ) : null}
              <Button
                type="button"
                variant="ghost"
                onClick={async () => {
                  await deleteLibraryItem({ data: { id: item.id } });
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
    </div>
  );
}
