import { i as getServerFnById, r as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/command-D2U-7mFo.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadDesk = createServerFn({ method: "GET" }).handler(createSsrRpc("809e639f88f7f58be3995c4262afa1e22825cda65b48a1a00bab5c0b908c1028"));
var saveNotes = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("390c5d6d1a8a1f7218f8245f4510597c9b50e40250604581eb2f5f1488ccb038"));
var addLibraryItem = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("a75956a51553e5d783700813883987e3caf68f33d01c33b5e2ce2e23ac0e1447"));
var saveDraft = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("c40f9ffbe9af672df31adcd481df4473cebcea77b37c2398623bcc13809c45c2"));
createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("db55459c19899633ad8862227ba3b4a9253c7f4a0f2bdd387855a2a0004af54e"));
var setCalendarStatus = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("c0aa329669f6b0c43eaadf527ebed7fe99a581699b5d6ac0b657d9134792d062"));
createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("8edc9b754346a47264aedb93ceac483b009add54718f70951fd6edfe2ca6fe65"));
var generatePack = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("642a1473428234d8a397c6a0b81aad66859514d8c22584b15147b1e1b1f0123e"));
var runRecon = createServerFn({ method: "POST" }).handler(createSsrRpc("428f56f350509463e17f8a0059c1e15bba8fced10f038f0cfd1016945018d17e"));
var deskAsk = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("0770ca5e9de5d393f1861fbc4e74335126ced509eeeabfa531c316891f482277"));
var clearDeskChat = createServerFn({ method: "POST" }).handler(createSsrRpc("7087bd43d4e2537dde6f9440488bfcd2fc763d0cabea5832a4a6efa8446b4977"));
//#endregion
export { generatePack as a, saveDraft as c, deskAsk as i, saveNotes as l, clearDeskChat as n, loadDesk as o, cn as r, runRecon as s, addLibraryItem as t, setCalendarStatus as u };
