import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as generatePack, c as saveDraft, r as cn } from "./command-D2U-7mFo.mjs";
import { n as useDesk, r as useInvalidateDesk, t as Button } from "./use-desk-BT2qjUjI.mjs";
import { t as CopyButton } from "./copy-button-DvSzBiOG.mjs";
import { t as Badge } from "./badge-BJEAf_ay.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-BcR-9Yl1.mjs";
import { n as Route$1 } from "./router-Cm_u5ZvL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-E9WDXSQJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BANNED = [
	"excited to announce",
	"we're thrilled",
	"we are thrilled",
	"humbled",
	"game-changer",
	"game changer",
	"leverage",
	"what an honor",
	"please like and share",
	"kindly",
	"synergy"
];
var PROOF_MARKERS = [
	"nvidia",
	"inception",
	"alphavox",
	"alphawolf",
	"inferno",
	"nebius",
	"anthropic",
	"patent",
	"nonverbal",
	"veteran",
	"ohio",
	"glove",
	"dignity",
	"offline"
];
function firstLine(text) {
	return text.split(/\n+/).map((l) => l.trim()).find(Boolean) ?? "";
}
function critiqueVoice(text) {
	const raw = text.trim();
	const lower = raw.toLowerCase();
	const hook = firstLine(raw);
	const words = raw.split(/\s+/).filter(Boolean);
	const hookWords = hook.split(/\s+/).filter(Boolean);
	const tags = (raw.match(/#\w+/g) ?? []).length;
	const flags = [];
	flags.push({
		ok: hookWords.length > 0 && hookWords.length <= 12,
		code: "hook",
		note: hookWords.length === 0 ? "No first line." : hookWords.length <= 12 ? `Hook is ${hookWords.length} words.` : `Hook is ${hookWords.length} words. Cut it to twelve or fewer.`
	});
	const bannedHit = BANNED.find((b) => lower.includes(b));
	flags.push({
		ok: !bannedHit,
		code: "theater",
		note: bannedHit ? `Kill “${bannedHit}”. That is not his voice.` : "No press-release theater."
	});
	flags.push({
		ok: tags <= 3,
		code: "tags",
		note: tags <= 3 ? tags === 0 ? "No hashtag pile." : `${tags} hashtag${tags === 1 ? "" : "s"}.` : `${tags} hashtags. Three is the ceiling.`
	});
	const hasProof = PROOF_MARKERS.some((m) => lower.includes(m));
	flags.push({
		ok: hasProof,
		code: "proof",
		note: hasProof ? "Specific proof is on the page." : "No named proof. Put NVIDIA, AlphaVox, the glove, Ohio, or the origin in."
	});
	flags.push({
		ok: words.length > 0 && words.length <= 80,
		code: "length",
		note: words.length === 0 ? "Empty." : words.length <= 80 ? `${words.length} words. Fits a post that can travel.` : `${words.length} words. This is a thread or a cut.`
	});
	const pity = /(inspiring|despite his|special needs|suffering from)/i.test(raw);
	flags.push({
		ok: !pity,
		code: "dignity",
		note: pity ? "Pity language detected. Dignity, never inspiration-porn." : "Dignity holds."
	});
	return flags;
}
function voiceScore(flags) {
	if (flags.length === 0) return 0;
	return Math.round(flags.filter((f) => f.ok).length / flags.length * 100);
}
var KINDS = [
	{
		id: "short",
		label: "Short post"
	},
	{
		id: "thread",
		label: "Thread"
	},
	{
		id: "reply",
		label: "Quote / reply"
	},
	{
		id: "linkedin",
		label: "LinkedIn"
	},
	{
		id: "youtube",
		label: "YouTube pack"
	}
];
function StudioPage() {
	const search = Route$1.useSearch();
	const { data } = useDesk();
	const invalidate = useInvalidateDesk();
	const library = data?.library ?? [];
	const [sourceId, setSourceId] = (0, import_react.useState)(search.source ?? "");
	const [kind, setKind] = (0, import_react.useState)(search.kind ?? "short");
	const [extra, setExtra] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [pack, setPack] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (search.source) setSourceId(search.source);
		if (search.kind) setKind(search.kind);
	}, [search.source, search.kind]);
	(0, import_react.useEffect)(() => {
		if (!sourceId && library[0]) setSourceId(library[0].id);
	}, [library, sourceId]);
	const source = (0, import_react.useMemo)(() => library.find((i) => i.id === sourceId) ?? library[0], [library, sourceId]);
	const flags = critiqueVoice(pack?.body ?? "");
	const score = voiceScore(flags);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.18em] text-faint",
					children: "Studio · writes in your voice, from your material"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-4xl tracking-tight",
					children: "Make it travel."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-2xl text-muted",
					children: "Pick something you already wrote. The desk will recut it. It will not invent a different company, and it will not congratulate you for a 21-view announcement."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-[11px] font-medium uppercase tracking-[0.14em] text-faint",
						children: "Source"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex max-h-36 flex-wrap gap-2 overflow-y-auto sm:max-h-none",
						children: library.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSourceId(item.id),
							className: cn("rounded-full border px-3 py-2 text-left text-xs transition-colors", source?.id === item.id ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:text-fg"),
							children: item.title
						}, item.id))
					}),
					source ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-lg border border-border bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] uppercase tracking-[0.14em] text-faint",
							children: [
								source.platform,
								" · ",
								source.views ?? "—",
								" views"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted",
							children: source.body
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setKind(k.id),
							className: cn("h-11 rounded-md border px-3 text-sm", kind === k.id ? "border-accent bg-accent text-accent-fg" : "border-border text-muted"),
							children: k.label
						}, k.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: extra,
						onChange: (e) => setExtra(e.target.value),
						placeholder: "Optional: a room to enter, a line that must stay, a person to mention.",
						className: "min-h-24"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						disabled: busy || !source || !data?.aiReady,
						onClick: async () => {
							if (!source) return;
							setBusy(true);
							const res = await generatePack({ data: {
								sourceTitle: source.title,
								sourceBody: source.body,
								kind,
								extra
							} });
							setBusy(false);
							if (!res.ok) {
								toast.error(res.error);
								return;
							}
							setPack(res.pack);
						},
						children: busy ? "Writing…" : data?.aiReady ? "Write the recut" : "AI unavailable"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: pack ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl",
							children: "Ready"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: score >= 80 ? "ok" : "signal",
							children: ["Voice ", score]
						})]
					}),
					pack.hook ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-3xl leading-tight",
						children: pack.hook
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "whitespace-pre-wrap rounded-lg border border-border bg-surface p-4 font-sans text-sm leading-relaxed",
						children: pack.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { text: pack.body }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: async () => {
								await saveDraft({ data: {
									kind,
									title: pack.hook || source?.title || "Draft",
									body: pack.body,
									sourceId: source?.id
								} });
								toast.success("Saved to drafts.");
								await invalidate();
							},
							children: "Save draft"
						})]
					}),
					pack.alt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-[0.14em] text-faint",
							children: "Shorter alternate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 whitespace-pre-wrap text-sm text-muted",
							children: pack.alt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
								text: pack.alt,
								label: "Copy alt"
							})
						})
					] }) : null,
					pack.why ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted",
						children: pack.why
					}) : null,
					pack.rooms.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-wrap gap-2",
						children: pack.rooms.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: r }, r))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1",
						children: flags.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: cn("text-sm", f.ok ? "text-ok" : "text-signal"),
							children: f.note
						}, f.code))
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg border border-dashed border-border p-6 text-sm text-muted",
					children: "The recut lands here. Voice lock runs on whatever is written — hook length, banned theater, proof, dignity, hashtag ceiling."
				})
			})]
		})]
	});
}
//#endregion
export { StudioPage as component };
