import "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as cn } from "./command-D2U-7mFo.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-32 w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-fg placeholder:text-faint outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent/70", className),
		...props
	});
}
//#endregion
export { Textarea as t };
