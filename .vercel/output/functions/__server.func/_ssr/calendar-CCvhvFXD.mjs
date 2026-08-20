import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as cn, u as setCalendarStatus } from "./command-D2U-7mFo.mjs";
import { n as useDesk, r as useInvalidateDesk, t as Button } from "./use-desk-BT2qjUjI.mjs";
import { t as CopyButton } from "./copy-button-DvSzBiOG.mjs";
import { t as Badge } from "./badge-BJEAf_ay.mjs";
import { n as format, t as parseISO } from "../_libs/date-fns.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-CCvhvFXD.js
var import_jsx_runtime = require_jsx_runtime();
function CalendarPage() {
	const { data } = useDesk();
	const invalidate = useInvalidateDesk();
	const items = data?.calendar ?? [];
	const days = [...new Set(items.map((i) => i.day))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.18em] text-faint",
					children: "Calendar · already loaded from recon"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-4xl tracking-tight",
					children: "Do this. In this order."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-2xl text-muted",
					children: "Built from the last two weeks of your feed, the Inception window, the glove deadline (30 Sep), and the only pattern that has ever moved your numbers: walk into rooms that already have a crowd."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-8",
			children: days.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl",
					children: safeDay(day)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: items.filter((i) => i.day === day).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("rounded-xl border bg-surface p-5", item.status === "shipped" ? "border-ok/40" : "border-border"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: item.slot }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "paper",
										children: item.channel
									}),
									item.status === "shipped" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "ok",
										children: "Shipped"
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-serif text-xl",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted",
								children: item.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { text: item.body }), item.status !== "shipped" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: async () => {
										await setCalendarStatus({ data: {
											id: item.id,
											status: "shipped"
										} });
										toast.success("Marked shipped.");
										await invalidate();
									},
									children: "Mark shipped"
								}) : null]
							})
						]
					}, item.id))
				})]
			}, day))
		})]
	});
}
function safeDay(day) {
	try {
		return format(parseISO(day), "EEEE, d MMMM");
	} catch {
		return day;
	}
}
//#endregion
export { CalendarPage as component };
