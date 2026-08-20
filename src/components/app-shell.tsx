import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  CalendarDays,
  Fingerprint,
  Library,
  MessageSquare,
  PenTool,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Briefing", icon: Radio },
  { to: "/dossier", label: "Dossier", icon: Fingerprint },
  { to: "/library", label: "Library", icon: Library },
  { to: "/studio", label: "Studio", icon: PenTool },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/desk", label: "Desk", icon: MessageSquare },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="lg:grid lg:grid-cols-[220px_1fr]">
        <aside className="hidden border-r border-border lg:flex lg:min-h-dvh lg:flex-col lg:px-5 lg:py-6">
          <div className="px-2">
            <p className="font-serif text-2xl leading-none tracking-tight">Christman</p>
            <p className="mt-1 font-serif text-2xl leading-none tracking-tight text-muted">
              Command
            </p>
            <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.16em] text-faint">
              Yours · No login · No gate
            </p>
          </div>
          <nav className="mt-8 flex flex-1 flex-col gap-1">
            {NAV.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors",
                    active
                      ? "bg-surface-2 text-fg"
                      : "text-muted hover:bg-surface-2 hover:text-fg",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <p className="px-3 text-[11px] leading-relaxed text-faint">
            The Christman AI Project owns this desk. Everett Christman, sole operator.
          </p>
        </aside>

        <div className="flex min-h-dvh flex-col">
          <header className="flex items-center justify-between border-b border-border px-4 py-3 lg:hidden">
            <div>
              <p className="font-serif text-xl leading-none">Christman Command</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-faint">
                Yours · No login
              </p>
            </div>
          </header>
          <main className="flex-1 px-4 pb-28 pt-5 sm:px-8 lg:px-10 lg:pb-10 lg:pt-8">
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </main>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg/95 backdrop-blur-sm lg:hidden">
        <ul className="grid grid-cols-6">
          {NAV.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex h-14 flex-col items-center justify-center gap-1 text-[10px]",
                    active ? "text-fg" : "text-faint",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
