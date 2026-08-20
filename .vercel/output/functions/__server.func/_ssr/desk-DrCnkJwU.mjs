import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as deskAsk, n as clearDeskChat, r as cn } from "./command-D2U-7mFo.mjs";
import { n as useDesk, r as useInvalidateDesk, t as Button } from "./use-desk-BT2qjUjI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-BcR-9Yl1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-DrCnkJwU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STARTERS = [
	"Rewrite the NVIDIA Inception post so it can actually travel. Then tell me which NVIDIA room to quote it into.",
	"Audit my last ten posts like a hostile editor. No praise.",
	"Turn the Dario origin into six short posts I can ship without waiting for another viral clip.",
	"Where should Inferno be replied this week — name accounts and conversations, not vibes.",
	"Draft the Physical AI / glove post for Nebius. Deadline is 30 September."
];
function DeskPage() {
	const { data } = useDesk();
	const invalidate = useInvalidateDesk();
	const [message, setMessage] = (0, import_react.useState)("");
	const [search, setSearch] = (0, import_react.useState)(true);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const endRef = (0, import_react.useRef)(null);
	const chat = data?.chat ?? [];
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chat.length]);
	async function send(text) {
		const trimmed = text.trim();
		if (!trimmed || busy) return;
		setBusy(true);
		setMessage("");
		const res = await deskAsk({ data: {
			message: trimmed,
			search
		} });
		setBusy(false);
		if (!res.ok) {
			toast.error(res.error);
			return;
		}
		await invalidate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[70dvh] flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium uppercase tracking-[0.18em] text-faint",
						children: "Desk · already briefed on you"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-serif text-4xl tracking-tight",
						children: "Ask the operator."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-muted",
						children: "It has the dossier, the view counts, the voice laws, and the glove deadline. It will go look at X when you leave search on. It will not ask you to introduce yourself."
					})
				]
			}),
			chat.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: STARTERS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => send(s),
					className: "rounded-lg border border-border bg-surface p-4 text-left text-sm leading-relaxed text-muted hover:text-fg",
					children: s
				}, s))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					chat.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: cn("rounded-lg px-4 py-3 text-sm leading-relaxed", m.role === "user" ? "ml-6 bg-surface-2" : "mr-2 whitespace-pre-wrap border border-border bg-surface"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1 text-[11px] uppercase tracking-[0.14em] text-faint",
							children: m.role === "user" ? "Everett" : "Operator"
						}), m.content]
					}, m.id)),
					busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-faint",
						children: "Looking…"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "sticky bottom-20 space-y-3 bg-bg pt-2 lg:bottom-0",
				onSubmit: (e) => {
					e.preventDefault();
					send(message);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: message,
					onChange: (e) => setMessage(e.target.value),
					placeholder: "Tell it what to do with your content.",
					className: "min-h-24",
					onKeyDown: (e) => {
						if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
							e.preventDefault();
							send(message);
						}
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex h-11 items-center gap-2 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: search,
							onChange: (e) => setSearch(e.target.checked),
							className: "size-4 accent-accent"
						}), "Search X and the web"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [chat.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: async () => {
								await clearDeskChat();
								await invalidate();
							},
							children: "Clear"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy || !data?.aiReady,
							children: busy ? "Working…" : "Send"
						})]
					})]
				})]
			})
		]
	});
}
//#endregion
export { DeskPage as component };
