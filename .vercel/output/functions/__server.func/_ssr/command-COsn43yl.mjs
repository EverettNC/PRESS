import { r as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { i as addDays, n as format, r as startOfDay } from "../_libs/date-fns.mjs";
import { r as getSql } from "./db-iP53QCKk.mjs";
import { o as SYSTEM_OPERATOR } from "./identity-CWOuXfES.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/command-COsn43yl.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var LIBRARY_SEED = [
	{
		id: "x-nvidia-inception",
		platform: "x",
		title: "NVIDIA Inception announcement",
		body: `The Christman AI Project has officially been accepted into the @NVIDIA Inception Program.

This wasn't built in a Silicon Valley boardroom. It was built from the margins, engineered on a single, non-negotiable standard: reality over abstraction.

We aren't theorizing. We've developed offline-resilient, local-first voice engines for nonverbal individuals, and advanced cognition support for dementia.

For our users, this software is their voice and their memory. Dignity first.

"How can we help you love yourself more?"`,
		url: "https://x.com/ChristmanAI/status/2088745672434503982",
		postedAt: "2026-08-15",
		views: 21,
		likes: 1,
		reposts: 0,
		diagnosis: "Biggest proof on the account. Written as a press release. The news is in line one, then a wall. No quote of a NVIDIA room. 21 views is an emergency, not a metric."
	},
	{
		id: "x-inferno-veterans",
		platform: "x",
		title: "Inferno walkthrough — veterans",
		body: `The Moment the Body Says Fight — Inferno AI, Full Walkthrough. It's time we take a look. This is for every Veteran that feels forgotten. We are here.`,
		url: "https://x.com/ChristmanAI/status/2086854518071820698",
		postedAt: "2026-08-10",
		views: 43,
		likes: 2,
		reposts: 0,
		diagnosis: "Right audience, wrong distribution. This belongs as a reply inside veteran and PTSD threads, not as a broadcast with a raw YouTube URL."
	},
	{
		id: "x-soulforge",
		platform: "x",
		title: "SoulForge neurosomatic bridge",
		body: `Enter the SoulForge Neurosomatic Bridge. The "Scream" Filter (>0.4 Threshold). The LTP Multiplier. Reality over theory. If a system claims to protect the human, it must do it in the real world — not just in the logs.`,
		url: "https://x.com/ChristmanAI/status/2085704895517065554",
		postedAt: "2026-08-07",
		views: 47,
		likes: 2,
		reposts: 1,
		diagnosis: "Technical rooms would eat this. Human rooms bounce off CUDA and LTP in paragraph one. Split: math thread for NVIDIA/builders, one human sentence for everyone else."
	},
	{
		id: "x-campus",
		platform: "x",
		title: "Geothermal campus + cooking school",
		body: `We aren't just building software; we are building a self-sustaining ecosystem. Geothermal bedrock at 55°F. Net-positive water return. A free coding and cooking school for Ohio residents. Software exists to safeguard people, not egos. Nothing vital lives below root.`,
		url: "https://x.com/ChristmanAI/status/2085694475506975218",
		postedAt: "2026-08-07",
		views: 48,
		likes: 3,
		reposts: 1,
		diagnosis: "Best-performing original. The Ohio school is the image people can hold. Still a wall of text. One photo of neighbors, one line about the school, then the architecture."
	},
	{
		id: "x-peak-scream",
		platform: "x",
		title: "Peak Scream / stackable empathy",
		body: `Standard AI learns at a flat, static rate. It processes a mundane prompt the exact same way it processes a human in absolute crisis. SoulForge changes the math. Memory → Context → Understanding → Empathy. The house holds. The bridge hums. The tether holds. Always.`,
		url: "https://x.com/ChristmanAI/status/2085436081961623775",
		postedAt: "2026-08-06",
		views: 36,
		likes: 1,
		reposts: 0,
		diagnosis: "The first two sentences are excellent. Everything after is a second post. Cut at 'SoulForge changes the math.'"
	},
	{
		id: "x-nbis-quote",
		platform: "x",
		title: "Quote: Nebius / Anthropic rumor",
		body: `Not here yet. But look at what's already underneath us. Nebius fellowship. NVIDIA developing partner. Approved Anthropic startup. I won't call that a blessing. I showed up for the work, every day, on whatever machine I had that morning. It's still amazing to sit at the table.`,
		url: "https://x.com/ChristmanAI/status/2083673433926156481",
		postedAt: "2026-08-01",
		views: 85,
		likes: 0,
		reposts: 0,
		diagnosis: "Entered someone else's $NBIS room. Views more than doubled a typical original. This is the play. Do it on purpose, daily."
	},
	{
		id: "x-dario",
		platform: "x",
		title: "Quote: Dario Amodei / origin",
		body: `He's right about the exponential. I don't say anything bad about Dario. They already counted me. Approved startup. They see me. That lands harder than people realize when you've spent most of your life not being seen. I'm autistic. ADHD. Neurodivergent. I was the kid pushed off to the side because I couldn't communicate correctly. Nobody built a tool for that kid. So I did. That's AlphaVox.`,
		url: "https://x.com/ChristmanAI/status/2083663541496602912",
		postedAt: "2026-08-01",
		views: 143,
		likes: 1,
		reposts: 0,
		diagnosis: "Highest reach on the account. Rode a ~93k-view clip, then told the origin. This is the voice. Recut this origin as its own short posts all week — do not wait for another Dario video."
	},
	{
		id: "x-glove",
		platform: "x",
		title: "Physical AI — the glove",
		body: `Nebius gets invested in the participants. Submissions close September 30. See you in San Francisco in November. Everybody else is bringing a body. We brought a glove.`,
		url: "https://x.com/ChristmanAI/status/2083657784910889336",
		postedAt: "2026-08-01",
		views: 12,
		likes: 0,
		reposts: 0,
		diagnosis: "The last two sentences are a campaign. They are buried under a reply. Pull them. Deadline is 30 Sep. Clock is running."
	},
	{
		id: "yt-inferno",
		platform: "youtube",
		title: "The Moment the Body Says Fight — Inferno AI",
		body: "Full Inferno walkthrough. Trauma-informed system for veterans and PTSD. Channel has 1.24k subscribers and 84 videos — larger than the X audience, treated like a link dump.",
		url: "https://www.youtube.com/watch?v=4TXEIwGHKmk",
		postedAt: "2026-08-10",
		views: 43,
		likes: 2,
		reposts: 0,
		diagnosis: "Clip the first 12 seconds. Put that clip natively on X. Stop sending people off-platform in line one."
	},
	{
		id: "site-home",
		platform: "site",
		title: "thechristmanaiproject.com — home",
		body: "We build AI for the people everyone else walked past. Five patent-pending systems. One governing framework. Built from scratch by a neurodivergent founder who refused to accept that dignity is a premium feature.",
		url: "https://thechristmanaiproject.com/",
		postedAt: "2026-08-19",
		views: 0,
		likes: 0,
		reposts: 0,
		diagnosis: "The site already has the line. X is not using it. Bio currently reads like a generic tech company. Fix the bio to the site's first sentence."
	}
];
var PLAN_SEED = [
	{
		offset: 0,
		slot: "morning",
		title: "Recut NVIDIA Inception — 9 words, then the truth",
		body: `NVIDIA Inception just took us in.

Not from a boardroom. From Ohio.

Offline-first voice for people who cannot speak. Memory for people who are losing theirs.

Dignity first.

@NVIDIA`,
		channel: "x"
	},
	{
		offset: 0,
		slot: "midday",
		title: "Walk the NVIDIA Inception room",
		body: "Find a live NVIDIA Inception / Jensen / local-AI post with real oxygen and quote it. Do not compose a new broadcast. One sentence: we got in, we build offline voice for people who were never given one.",
		channel: "reply"
	},
	{
		offset: 1,
		slot: "morning",
		title: "Origin. Nonverbal until 6.",
		body: `I was nonverbal until I was 6.

The school did not have a tool for that kid. Nobody did.

So I built one. That's AlphaVox.

If you know a family still waiting for a voice, send this.`,
		channel: "x"
	},
	{
		offset: 1,
		slot: "evening",
		title: "Inferno — native clip, veteran rooms",
		body: "Clip the first 12 seconds of The Moment the Body Says Fight. Native video on X. First line: 22 veterans a day. Then: we are here. Reply it into veteran threads, do not only post it to the void.",
		channel: "reply"
	},
	{
		offset: 2,
		slot: "morning",
		title: "The glove vs the body",
		body: `Everybody else is bringing a body. We brought a glove.

Nebius Physical AI. Submissions close September 30. San Francisco in November.

@nebiusai`,
		channel: "x"
	},
	{
		offset: 2,
		slot: "midday",
		title: "Fix the X bio",
		body: `Replace the generic company bio with the site's first sentence: We build AI for the people everyone else walked past. Then: NVIDIA Inception · AlphaVox · Inferno · Ohio.`,
		channel: "x"
	},
	{
		offset: 3,
		slot: "morning",
		title: "Ohio school — one image, one line",
		body: `A free coding and cooking school for Ohio residents.

Neighbors next to neighbors. That is the campus.

The servers can wait. The people cannot.`,
		channel: "x"
	},
	{
		offset: 4,
		slot: "morning",
		title: "Dario origin, recut without waiting for Dario",
		body: `They counted me. Approved startup.

That lands harder than people realize when you've spent most of your life not being seen.

I was the kid who could not communicate correctly. Nobody built a tool for that kid.

So I did.`,
		channel: "x"
	},
	{
		offset: 5,
		slot: "midday",
		title: "YouTube: native title, not a link dump",
		body: "Retitle the Inferno walkthrough as a human sentence. First 12 seconds on X. Pin the NVIDIA recut on X until it has more than 21 views.",
		channel: "youtube"
	},
	{
		offset: 6,
		slot: "morning",
		title: "LinkedIn: Inception, founder voice, no theater",
		body: `NVIDIA Inception took us in this week.

I am a neurodivergent founder from Ohio. I was nonverbal until I was 6. We build offline-first voice for people who cannot speak, and memory for people who are losing theirs.

I do not have a boardroom story. I have a patent, a glove, and the work.

If you know a family, a veteran, or a memory-care floor that was walked past — I want the introduction.`,
		channel: "linkedin"
	}
];
function materializePlan(from = /* @__PURE__ */ new Date()) {
	const start = startOfDay(from);
	return PLAN_SEED.map((item) => ({
		day: format(addDays(start, item.offset), "yyyy-MM-dd"),
		slot: item.slot,
		title: item.title,
		body: item.body,
		channel: item.channel,
		status: "planned"
	}));
}
var MODEL = "grok-4.5";
function extractText(body) {
	if (!body || typeof body !== "object") return "";
	const rec = body;
	const content = rec.choices?.[0]?.message?.content;
	if (typeof content === "string") return content.trim();
	if (Array.isArray(content)) return content.map((part) => {
		if (typeof part === "string") return part;
		if (part && typeof part === "object" && "text" in part) {
			const t = part.text;
			return typeof t === "string" ? t : "";
		}
		return "";
	}).join("").trim();
	const outputText = rec.output_text;
	if (typeof outputText === "string") return outputText.trim();
	return "";
}
function parseJsonBlock(text) {
	const stripped = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
	const start = stripped.indexOf("{");
	const end = stripped.lastIndexOf("}");
	if (start >= 0 && end > start) return JSON.parse(stripped.slice(start, end + 1));
	return JSON.parse(stripped);
}
async function grokChat(opts) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available in this environment"
	};
	const body = {
		model: MODEL,
		messages: opts.messages,
		max_tokens: opts.maxTokens ?? 1800,
		temperature: .6
	};
	if (opts.json) body.response_format = { type: "json_object" };
	if (opts.search) body.tools = [{
		type: "x_search",
		allowed_x_handles: ["ChristmanAI"]
	}, { type: "web_search" }];
	const run = async (payload) => {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify(payload),
			signal: AbortSignal.timeout(9e4)
		});
		const raw = await res.text();
		if (!res.ok) return {
			ok: false,
			error: `xAI API error ${res.status}`,
			raw
		};
		let parsed = raw;
		try {
			parsed = JSON.parse(raw);
		} catch {}
		const text = extractText(parsed);
		if (!text) return {
			ok: false,
			error: "Empty model response",
			raw
		};
		return {
			ok: true,
			text
		};
	};
	let result = await run(body);
	if (!result.ok && opts.search) {
		const { tools: _t, ...without } = body;
		result = await run(without);
	}
	if (!result.ok) return {
		ok: false,
		error: result.error
	};
	return {
		ok: true,
		text: result.text
	};
}
function operatorMessages(history, extra) {
	return [{
		role: "system",
		content: extra ? `${SYSTEM_OPERATOR}\n\n${extra}` : SYSTEM_OPERATOR
	}, ...history];
}
async function ensureSeeded() {
	const sql = await getSql();
	const [{ n }] = await sql`select count(*)::int as n from library_items`;
	if (n === 0) for (const item of LIBRARY_SEED) await sql`
        insert into library_items (id, platform, title, body, url, posted_at, views, likes, reposts, diagnosis, source)
        values (${item.id}, ${item.platform}, ${item.title}, ${item.body}, ${item.url}, ${item.postedAt}, ${item.views}, ${item.likes}, ${item.reposts}, ${item.diagnosis}, ${"seed"})
      `;
	const [{ c }] = await sql`select count(*)::int as c from calendar_items`;
	if (c === 0) for (const item of materializePlan()) await sql`
        insert into calendar_items (day, slot, title, body, channel, status)
        values (${item.day}, ${item.slot}, ${item.title}, ${item.body}, ${item.channel}, ${item.status})
      `;
	if ((await sql`select id, body, updated_at from desk_notes limit 1`).length === 0) await sql`insert into desk_notes (body) values (${""})`;
}
var loadDesk_createServerFn_handler = createServerRpc({
	id: "809e639f88f7f58be3995c4262afa1e22825cda65b48a1a00bab5c0b908c1028",
	name: "loadDesk",
	filename: "src/lib/server/command.ts"
}, (opts) => loadDesk.__executeServer(opts));
var loadDesk = createServerFn({ method: "GET" }).handler(loadDesk_createServerFn_handler, async () => {
	await ensureSeeded();
	const sql = await getSql();
	const library = await sql`
    select id, platform, title, body, url, posted_at, views, likes, reposts, diagnosis, source
    from library_items
    order by posted_at desc nulls last, created_at desc
  `;
	const drafts = await sql`
    select id, kind, title, body, source_id, status, created_at::text as created_at
    from drafts
    order by id desc
    limit 40
  `;
	const calendar = await sql`
    select id, day, slot, title, body, channel, status
    from calendar_items
    order by day asc, case slot when 'morning' then 1 when 'midday' then 2 else 3 end
  `;
	const chat = await sql`
    select id, role, content, created_at::text as created_at
    from chat_messages
    order by id asc
    limit 80
  `;
	const recon = await sql`
    select id, summary, created_at::text as created_at
    from recon_reports
    order by id desc
    limit 1
  `;
	const notes = await sql`
    select id, body, updated_at::text as updated_at from desk_notes order by id desc limit 1
  `;
	return {
		library,
		drafts,
		calendar,
		chat,
		recon: recon[0] ?? null,
		notes: notes[0]?.body ?? "",
		aiReady: Boolean(process.env.XAI_API_KEY)
	};
});
var saveNotes_createServerFn_handler = createServerRpc({
	id: "390c5d6d1a8a1f7218f8245f4510597c9b50e40250604581eb2f5f1488ccb038",
	name: "saveNotes",
	filename: "src/lib/server/command.ts"
}, (opts) => saveNotes.__executeServer(opts));
var saveNotes = createServerFn({ method: "POST" }).validator((input) => input).handler(saveNotes_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const existing = await sql`select id from desk_notes order by id desc limit 1`;
	if (existing[0]) await sql`update desk_notes set body = ${data.body}, updated_at = now() where id = ${existing[0].id}`;
	else await sql`insert into desk_notes (body) values (${data.body})`;
	return { ok: true };
});
var addLibraryItem_createServerFn_handler = createServerRpc({
	id: "a75956a51553e5d783700813883987e3caf68f33d01c33b5e2ce2e23ac0e1447",
	name: "addLibraryItem",
	filename: "src/lib/server/command.ts"
}, (opts) => addLibraryItem.__executeServer(opts));
var addLibraryItem = createServerFn({ method: "POST" }).validator((input) => input).handler(addLibraryItem_createServerFn_handler, async ({ data }) => {
	const title = data.title.trim();
	const body = data.body.trim();
	if (!title || !body) return {
		ok: false,
		error: "Need a title and the actual content."
	};
	const id = `user-${Date.now()}`;
	await (await getSql())`
      insert into library_items (id, platform, title, body, url, posted_at, source, diagnosis)
      values (${id}, ${data.platform || "x"}, ${title}, ${body}, ${data.url?.trim() || null}, ${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}, ${"user"}, ${"Pasted by Everett. Not yet scored."})
    `;
	return {
		ok: true,
		id
	};
});
var saveDraft_createServerFn_handler = createServerRpc({
	id: "c40f9ffbe9af672df31adcd481df4473cebcea77b37c2398623bcc13809c45c2",
	name: "saveDraft",
	filename: "src/lib/server/command.ts"
}, (opts) => saveDraft.__executeServer(opts));
var saveDraft = createServerFn({ method: "POST" }).validator((input) => input).handler(saveDraft_createServerFn_handler, async ({ data }) => {
	return {
		ok: true,
		id: (await (await getSql())`
      insert into drafts (kind, title, body, source_id, status)
      values (${data.kind}, ${data.title}, ${data.body}, ${data.sourceId ?? null}, ${"ready"})
      returning id
    `)[0]?.id ?? 0
	};
});
var setDraftStatus_createServerFn_handler = createServerRpc({
	id: "db55459c19899633ad8862227ba3b4a9253c7f4a0f2bdd387855a2a0004af54e",
	name: "setDraftStatus",
	filename: "src/lib/server/command.ts"
}, (opts) => setDraftStatus.__executeServer(opts));
var setDraftStatus = createServerFn({ method: "POST" }).validator((input) => input).handler(setDraftStatus_createServerFn_handler, async ({ data }) => {
	await (await getSql())`update drafts set status = ${data.status} where id = ${data.id}`;
	return { ok: true };
});
var setCalendarStatus_createServerFn_handler = createServerRpc({
	id: "c0aa329669f6b0c43eaadf527ebed7fe99a581699b5d6ac0b657d9134792d062",
	name: "setCalendarStatus",
	filename: "src/lib/server/command.ts"
}, (opts) => setCalendarStatus.__executeServer(opts));
var setCalendarStatus = createServerFn({ method: "POST" }).validator((input) => input).handler(setCalendarStatus_createServerFn_handler, async ({ data }) => {
	await (await getSql())`update calendar_items set status = ${data.status} where id = ${data.id}`;
	return { ok: true };
});
var addCalendarItem_createServerFn_handler = createServerRpc({
	id: "8edc9b754346a47264aedb93ceac483b009add54718f70951fd6edfe2ca6fe65",
	name: "addCalendarItem",
	filename: "src/lib/server/command.ts"
}, (opts) => addCalendarItem.__executeServer(opts));
var addCalendarItem = createServerFn({ method: "POST" }).validator((input) => input).handler(addCalendarItem_createServerFn_handler, async ({ data }) => {
	return {
		ok: true,
		id: (await (await getSql())`
      insert into calendar_items (day, slot, title, body, channel, status)
      values (${data.day}, ${data.slot}, ${data.title}, ${data.body}, ${data.channel}, ${"planned"})
      returning id
    `)[0]?.id ?? 0
	};
});
var generatePack_createServerFn_handler = createServerRpc({
	id: "642a1473428234d8a397c6a0b81aad66859514d8c22584b15147b1e1b1f0123e",
	name: "generatePack",
	filename: "src/lib/server/command.ts"
}, (opts) => generatePack.__executeServer(opts));
var generatePack = createServerFn({ method: "POST" }).validator((input) => input).handler(generatePack_createServerFn_handler, async ({ data }) => {
	const result = await grokChat({
		json: true,
		maxTokens: 1600,
		messages: operatorMessages([{
			role: "user",
			content: `Write ${{
				short: "a short X post, 40–80 words, first line under 12 words",
				thread: "an X thread of 5–7 posts, each able to stand alone, numbered",
				reply: "a quote-tweet / reply designed to enter someone else's room",
				linkedin: "a LinkedIn post in founder voice, no corporate theater",
				youtube: "a YouTube title, 2-sentence description, and first 12-second on-screen line"
			}[data.kind] ?? "a short X post"} from this existing content. Use the content. Do not invent a different company.

TITLE: ${data.sourceTitle}

CONTENT:
${data.sourceBody}

${data.extra ? `OPERATOR NOTE: ${data.extra}` : ""}

Return JSON with keys:
- hook (the first line, under 12 words)
- body (the full post or thread; if thread, separate posts with a line that is exactly ---)
- alt (one alternate version, shorter)
- why (2 sentences: why this will move given HIS actual view counts, not theory)
- rooms (array of 3 specific rooms / accounts / hashtags to walk this into)`
		}], "Return only JSON.")
	});
	if (!result.ok) return result;
	try {
		const parsed = parseJsonBlock(result.text);
		return {
			ok: true,
			pack: {
				hook: parsed.hook ?? "",
				body: parsed.body ?? result.text,
				alt: parsed.alt ?? "",
				why: parsed.why ?? "",
				rooms: Array.isArray(parsed.rooms) ? parsed.rooms.map(String) : []
			}
		};
	} catch {
		return {
			ok: true,
			pack: {
				hook: "",
				body: result.text,
				alt: "",
				why: "",
				rooms: []
			}
		};
	}
});
var runRecon_createServerFn_handler = createServerRpc({
	id: "428f56f350509463e17f8a0059c1e15bba8fced10f038f0cfd1016945018d17e",
	name: "runRecon",
	filename: "src/lib/server/command.ts"
}, (opts) => runRecon.__executeServer(opts));
var runRecon = createServerFn({ method: "POST" }).handler(runRecon_createServerFn_handler, async () => {
	const result = await grokChat({
		search: true,
		maxTokens: 1400,
		messages: operatorMessages([{
			role: "user",
			content: `Go look again. Search @ChristmanAI on X and thechristmanaiproject.com.

Report ONLY:
1. Anything new since 19 Aug 2026 (new posts, new proof, bio changes).
2. Whether the NVIDIA Inception post has moved off 21 views.
3. Three rooms he should walk into in the next 48 hours, named specifically (accounts or live conversations), tied to AlphaVox / Inferno / Inception / the glove.
4. One bio rewrite, under 160 characters, in his voice.

If search fails, say so and work from the dossier. Do not invent view counts.`
		}])
	});
	if (!result.ok) return result;
	await (await getSql())`insert into recon_reports (summary) values (${result.text})`;
	return {
		ok: true,
		summary: result.text
	};
});
var deskAsk_createServerFn_handler = createServerRpc({
	id: "0770ca5e9de5d393f1861fbc4e74335126ced509eeeabfa531c316891f482277",
	name: "deskAsk",
	filename: "src/lib/server/command.ts"
}, (opts) => deskAsk.__executeServer(opts));
var deskAsk = createServerFn({ method: "POST" }).validator((input) => input).handler(deskAsk_createServerFn_handler, async ({ data }) => {
	const message = data.message.trim();
	if (!message) return {
		ok: false,
		error: "Say something."
	};
	const sql = await getSql();
	await sql`insert into chat_messages (role, content) values (${"user"}, ${message})`;
	const chronological = (await sql`
      select id, role, content, created_at::text as created_at
      from chat_messages
      order by id desc
      limit 16
    `).reverse().map((m) => ({
		role: m.role === "assistant" ? "assistant" : "user",
		content: m.content
	}));
	const result = await grokChat({
		search: Boolean(data.search),
		maxTokens: 1400,
		messages: operatorMessages(chronological)
	});
	if (!result.ok) return result;
	await sql`insert into chat_messages (role, content) values (${"assistant"}, ${result.text})`;
	return {
		ok: true,
		text: result.text
	};
});
var clearDeskChat_createServerFn_handler = createServerRpc({
	id: "7087bd43d4e2537dde6f9440488bfcd2fc763d0cabea5832a4a6efa8446b4977",
	name: "clearDeskChat",
	filename: "src/lib/server/command.ts"
}, (opts) => clearDeskChat.__executeServer(opts));
var clearDeskChat = createServerFn({ method: "POST" }).handler(clearDeskChat_createServerFn_handler, async () => {
	await (await getSql())`delete from chat_messages`;
	return { ok: true };
});
//#endregion
export { addCalendarItem_createServerFn_handler, addLibraryItem_createServerFn_handler, clearDeskChat_createServerFn_handler, deskAsk_createServerFn_handler, generatePack_createServerFn_handler, loadDesk_createServerFn_handler, runRecon_createServerFn_handler, saveDraft_createServerFn_handler, saveNotes_createServerFn_handler, setCalendarStatus_createServerFn_handler, setDraftStatus_createServerFn_handler };
