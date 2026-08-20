import { createFileRoute } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";
import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteCalendarItem, setCalendarStatus } from "@/lib/server/command";
import { useDesk, useInvalidateDesk } from "@/lib/use-desk";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calendar")({ component: CalendarPage });

function CalendarPage() {
  const { data } = useDesk();
  const invalidate = useInvalidateDesk();
  const items = data?.calendar ?? [];
  const days = [...new Set(items.map((i) => i.day))];

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-faint">
          Calendar · already loaded from recon
        </p>
        <h1 className="font-serif text-4xl tracking-tight">Do this. In this order.</h1>
        <p className="max-w-2xl text-muted">
          Built from recon. Today's six posts are already written on the
          briefing — copy them from there. The rest of the week is below.
        </p>
      </header>

      <div className="space-y-8">
        {days.map((day) => (
          <section key={day} className="space-y-3">
            <h2 className="font-serif text-2xl">
              {safeDay(day)}
            </h2>
            <ul className="space-y-3">
              {items
                .filter((i) => i.day === day)
                .map((item) => (
                  <li
                    key={item.id}
                    className={cn(
                      "rounded-xl border bg-surface p-5",
                      item.status === "shipped"
                        ? "border-ok/40"
                        : "border-border",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>{item.slot}</Badge>
                      <Badge variant="paper">{item.channel}</Badge>
                      {item.status === "shipped" ? (
                        <Badge variant="ok">Shipped</Badge>
                      ) : null}
                    </div>
                    <h3 className="mt-3 font-serif text-xl">{item.title}</h3>
                    <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted">
                      {item.body}
                    </pre>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <CopyButton text={item.body} />
                      {item.status !== "shipped" ? (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={async () => {
                            await setCalendarStatus({
                              data: { id: item.id, status: "shipped" },
                            });
                            toast.success("Marked shipped.");
                            await invalidate();
                          }}
                        >
                          Mark shipped
                        </Button>
                      ) : null}
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={async () => {
                          await deleteCalendarItem({ data: { id: item.id } });
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
        ))}
      </div>
    </div>
  );
}

function safeDay(day: string) {
  try {
    return format(parseISO(day), "EEEE, d MMMM");
  } catch {
    return day;
  }
}
