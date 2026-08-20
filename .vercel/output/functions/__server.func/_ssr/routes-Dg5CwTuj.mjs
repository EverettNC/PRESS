import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as useDesk, t as Button } from "./use-desk-BT2qjUjI.mjs";
import { t as TriangleAlert, u as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-BJEAf_ay.mjs";
import { r as Route$6 } from "./router-Cm_u5ZvL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dg5CwTuj.js
var import_jsx_runtime = require_jsx_runtime();
function Briefing() {
	const seeded = Route$6.useLoaderData();
	const { data } = useDesk();
	const desk = data ?? seeded;
	const nvidia = desk.library.find((i) => i.id === "x-nvidia-inception");
	const campus = desk.library.find((i) => i.id === "x-campus");
	const best = desk.library.slice().sort((a, b) => (b.views ?? 0) - (a.views ?? 0))[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 sm:space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium uppercase tracking-[0.18em] text-faint",
						children: "Wednesday 19 Aug 2026 · Recon complete"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-serif text-3xl leading-[1.05] tracking-tight sm:text-5xl",
						children: "I went and looked before I talked."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-sm leading-relaxed text-muted sm:text-base",
						children: "Everett Christman’s desk. No account, no gate. Built from @ChristmanAI, the site, YouTube, and GitHub — not a persona quiz."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-xl border border-signal/40 bg-signal/10 p-4 sm:p-7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-5 shrink-0 text-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-medium uppercase tracking-[0.16em] text-signal",
								children: "Distribution failure"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-serif text-2xl leading-tight sm:text-4xl",
								children: [
									"NVIDIA Inception. ",
									nvidia?.views ?? 21,
									" views."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-2xl text-sm leading-relaxed text-fg/80",
								children: "Biggest proof on the account. Written as a press release into an empty feed. Your best post rode a 93k-view Dario clip. You do not have a content shortage. You have a room shortage."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/studio",
										search: {
											source: "x-nvidia-inception",
											kind: "short"
										},
										children: ["Recut it now", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/studio",
										search: {
											source: "x-nvidia-inception",
											kind: "reply"
										},
										children: "Quote it"
									})
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Best original",
						value: `${campus?.views ?? 48}`,
						hint: "Campus + cooking school"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Best anything",
						value: `${best?.views ?? 143}`,
						hint: "Dario quote, 1 Aug"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "YouTube already",
						value: "1.24k",
						hint: "84 videos. Stop link-dumping them."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl",
						children: "The next 48 hours"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/calendar",
						className: "text-sm text-muted underline-offset-4 hover:text-fg hover:underline",
						children: "Full calendar"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-3",
					children: MOVES.map((move, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-border bg-surface p-4 sm:p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-[11px] text-faint",
									children: ["0", i + 1]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: move.when })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-serif text-xl",
								children: move.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: move.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/studio",
								search: {
									source: move.source,
									kind: move.kind
								},
								className: "mt-3 inline-flex h-11 items-center text-sm text-accent underline-offset-4 hover:underline",
								children: ["Open in Studio", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 size-4" })]
							})
						]
					}, move.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl",
						children: "What the numbers already said"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-lg border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-surface-2 text-[11px] uppercase tracking-[0.14em] text-faint",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Post"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Views"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "hidden px-4 py-3 font-medium sm:table-cell",
										children: "Verdict"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (desk.library.length ? desk.library : FALLBACK_ROWS).slice(0, 8).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-fg",
											children: row.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-faint",
											children: row.posted_at
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-mono tabular-nums text-muted",
										children: row.views ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "hidden px-4 py-3 text-muted sm:table-cell",
										children: row.diagnosis
									})
								]
							}, row.id)) })]
						})
					}),
					desk.library.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-faint",
						children: "Loading the library…"
					}) : null
				]
			})
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium uppercase tracking-[0.14em] text-faint",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-serif text-4xl tabular-nums leading-none",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: hint
			})
		]
	});
}
var MOVES = [
	{
		when: "Today, morning",
		title: "Recut Inception as a human sentence",
		body: "Nine words. Then Ohio. Then who the software is for. Quote a NVIDIA room — do not broadcast into silence again.",
		source: "x-nvidia-inception",
		kind: "short"
	},
	{
		when: "Today, afternoon",
		title: "Walk Inferno into veteran threads",
		body: "Native 12-second clip. First line: 22 veterans a day. Reply, do not announce.",
		source: "x-inferno-veterans",
		kind: "reply"
	},
	{
		when: "Tomorrow",
		title: "Ship the origin without waiting for Dario",
		body: "I was nonverbal until 6. Nobody built a tool for that kid. So I did. That's AlphaVox.",
		source: "x-dario",
		kind: "short"
	}
];
var FALLBACK_ROWS = [{
	id: "x-nvidia-inception",
	title: "NVIDIA Inception announcement",
	posted_at: "2026-08-15",
	views: 21,
	diagnosis: "Press release into an empty feed."
}];
//#endregion
export { Briefing as component };
