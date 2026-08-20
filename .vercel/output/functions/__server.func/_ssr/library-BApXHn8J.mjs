import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as cn, t as addLibraryItem } from "./command-D2U-7mFo.mjs";
import { n as useDesk, r as useInvalidateDesk, t as Button } from "./use-desk-BT2qjUjI.mjs";
import { t as Badge } from "./badge-BJEAf_ay.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-BcR-9Yl1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-BApXHn8J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-faint outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent/70", className),
		...props
	});
}
function LibraryPage() {
	const { data } = useDesk();
	const invalidate = useInvalidateDesk();
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	const [platform, setPlatform] = (0, import_react.useState)("x");
	const items = data?.library ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium uppercase tracking-[0.18em] text-faint",
						children: "Library · your actual content"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-serif text-4xl tracking-tight",
						children: "What you already made."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-muted",
						children: "Pulled from @ChristmanAI, YouTube, and the site. Views are real as of recon. Paste anything new and Studio will write from it instead of from a blank prompt."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3 rounded-xl border border-border bg-surface p-4 sm:p-5",
				onSubmit: async (e) => {
					e.preventDefault();
					const res = await addLibraryItem({ data: {
						title,
						body,
						platform,
						url
					} });
					if (!res.ok) {
						toast.error(res.error);
						return;
					}
					setTitle("");
					setBody("");
					setUrl("");
					toast.success("In the library.");
					await invalidate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Drop new material"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-[1fr_140px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "What is this",
							required: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: platform,
							onChange: (e) => setPlatform(e.target.value),
							className: "h-11 rounded-md border border-border bg-surface px-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "x",
									children: "X"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "youtube",
									children: "YouTube"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "site",
									children: "Site"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "other",
									children: "Other"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: url,
						onChange: (e) => setUrl(e.target.value),
						placeholder: "URL if it has one"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: body,
						onChange: (e) => setBody(e.target.value),
						placeholder: "Paste the post, transcript, or line.",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Add to library"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-border bg-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: item.platform }),
								item.views != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: item.views < 50 ? "signal" : "ok",
									children: [item.views, " views"]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[11px] text-faint",
									children: item.posted_at
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-serif text-2xl",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-5 whitespace-pre-wrap text-sm leading-relaxed text-muted",
							children: item.body
						}),
						item.diagnosis ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-fg/80",
							children: item.diagnosis
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/studio",
									search: {
										source: item.id,
										kind: "short"
									},
									children: "Use in Studio"
								})
							}), item.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: item.url,
									target: "_blank",
									rel: "noreferrer",
									children: "Open original"
								})
							}) : null]
						})
					]
				}, item.id))
			})
		]
	});
}
//#endregion
export { LibraryPage as component };
