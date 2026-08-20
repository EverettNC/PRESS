import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { LIBRARY_SEED } from "@/lib/brand/library-seed";
import { materializePlan } from "@/lib/brand/plan";
import { grokChat, operatorMessages, parseJsonBlock } from "@/lib/server/ai";

type LibraryRow = {
  id: string;
  platform: string;
  title: string;
  body: string;
  url: string | null;
  posted_at: string | null;
  views: number | null;
  likes: number | null;
  reposts: number | null;
  diagnosis: string | null;
  source: string;
};

type DraftRow = {
  id: number;
  kind: string;
  title: string;
  body: string;
  source_id: string | null;
  status: string;
  created_at: string;
};

type CalRow = {
  id: number;
  day: string;
  slot: string;
  title: string;
  body: string;
  channel: string;
  status: string;
};

type ChatRow = { id: number; role: string; content: string; created_at: string };
type ReconRow = { id: number; summary: string; created_at: string };
type NoteRow = { id: number; body: string; updated_at: string };

async function ensureSeeded() {
  const sql = await getSql();
  await sql.query(`
    create table if not exists tombstones (
      kind text not null,
      item_key text not null,
      primary key (kind, item_key)
    )
  `);
  const tombs = await sql<{ kind: string; item_key: string }>`
    select kind, item_key from tombstones
  `;
  const skip = new Set(tombs.map((t) => `${t.kind}:${t.item_key}`));

  await sql`delete from drafts where source_id in (
    ${"fb-origin"}, ${"tt-origin"}, ${"ig-journey"}, ${"li-letter"}, ${"fb-inferno"}, ${"fb-page"}
  )`;
  for (const key of [
    "fb-origin",
    "tt-origin",
    "ig-journey",
    "li-letter",
    "fb-inferno",
    "fb-page",
  ]) {
    await sql`
      insert into tombstones (kind, item_key) values (${"draft"}, ${key})
      on conflict do nothing
    `;
  }

  for (const item of LIBRARY_SEED) {
    if (skip.has(`library:${item.id}`)) continue;
    await sql`
      insert into library_items (id, platform, title, body, url, posted_at, views, likes, reposts, diagnosis, source)
      values (${item.id}, ${item.platform}, ${item.title}, ${item.body}, ${item.url}, ${item.postedAt}, ${item.views}, ${item.likes}, ${item.reposts}, ${item.diagnosis}, ${"seed"})
      on conflict (id) do update set
        title = excluded.title,
        body = excluded.body,
        url = excluded.url,
        views = excluded.views,
        likes = excluded.likes,
        diagnosis = excluded.diagnosis
        where library_items.source = ${"seed"}
    `;
  }

  const staleTitles = [
    "Recut NVIDIA Inception — 9 words, then the truth",
    "Walk the NVIDIA Inception room",
    "Origin. Nonverbal until 6.",
    "Inferno — native clip, veteran rooms",
    "The glove vs the body",
    "Fix the X bio",
    "Ohio school — one image, one line",
    "Dario origin, recut without waiting for Dario",
    "YouTube: native title, not a link dump",
    "LinkedIn: Inception, founder voice, no theater",
    "Facebook Chef.Ev — answer the 10 comments, then recut",
    "Facebook project page — point at Chef.Ev",
    "TikTok + Reels + Clapper — 12 seconds",
    "LinkedIn — founder letter, one intro ask",
    "Inferno clip — Facebook + TikTok, veteran rooms",
    "The glove vs the body — LinkedIn + X quote",
    "Instagram — chef who builds",
    "Origin on Facebook, then a Reel",
    "Ohio school — Facebook photo, not a thread",
    "Facebook · Chef.Ev",
    "TikTok · Reels · Clapper",
    "Instagram",
    "LinkedIn",
    "Facebook · project page",
  ];
  for (const title of staleTitles) {
    await sql`delete from calendar_items where title = ${title} and status = ${"planned"}`;
  }
  for (const item of materializePlan()) {
    if (skip.has(`calendar-title:${item.title}`)) continue;
    const existing = await sql<{ id: number }>`
      select id from calendar_items where title = ${item.title} limit 1
    `;
    if (existing.length === 0) {
      await sql`
        insert into calendar_items (day, slot, title, body, channel, status)
        values (${item.day}, ${item.slot}, ${item.title}, ${item.body}, ${item.channel}, ${item.status})
      `;
    }
  }
  const notes = await sql<NoteRow>`select id, body, updated_at from desk_notes limit 1`;
  if (notes.length === 0) {
    await sql`insert into desk_notes (body) values (${""})`;
  }
}

export const loadDesk = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeeded();
  const sql = await getSql();
  const library = await sql<LibraryRow>`
    select id, platform, title, body, url, posted_at, views, likes, reposts, diagnosis, source
    from library_items
    order by posted_at desc nulls last, created_at desc
  `;
  const drafts = await sql<DraftRow>`
    select id, kind, title, body, source_id, status, created_at::text as created_at
    from drafts
    order by id desc
    limit 40
  `;
  const calendar = await sql<CalRow>`
    select id, day, slot, title, body, channel, status
    from calendar_items
    order by day asc, case slot when 'morning' then 1 when 'midday' then 2 else 3 end
  `;
  const chat = await sql<ChatRow>`
    select id, role, content, created_at::text as created_at
    from chat_messages
    order by id asc
    limit 80
  `;
  const recon = await sql<ReconRow>`
    select id, summary, created_at::text as created_at
    from recon_reports
    order by id desc
    limit 1
  `;
  const notes = await sql<NoteRow>`
    select id, body, updated_at::text as updated_at from desk_notes order by id desc limit 1
  `;
  return {
    library,
    drafts,
    calendar,
    chat,
    recon: recon[0] ?? null,
    notes: notes[0]?.body ?? "",
    aiReady: Boolean(process.env.XAI_API_KEY),
  };
});

export const saveNotes = createServerFn({ method: "POST" })
  .validator((input: { body: string }) => input)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const existing = await sql<{ id: number }>`select id from desk_notes order by id desc limit 1`;
    if (existing[0]) {
      await sql`update desk_notes set body = ${data.body}, updated_at = now() where id = ${existing[0].id}`;
    } else {
      await sql`insert into desk_notes (body) values (${data.body})`;
    }
    return { ok: true as const };
  });

export const addLibraryItem = createServerFn({ method: "POST" })
  .validator((input: { title: string; body: string; platform: string; url?: string }) => input)
  .handler(async ({ data }) => {
    const title = data.title.trim();
    const body = data.body.trim();
    if (!title || !body) return { ok: false as const, error: "Need a title and the actual content." };
    const id = `user-${Date.now()}`;
    const sql = await getSql();
    await sql`
      insert into library_items (id, platform, title, body, url, posted_at, source, diagnosis)
      values (${id}, ${data.platform || "x"}, ${title}, ${body}, ${data.url?.trim() || null}, ${new Date().toISOString().slice(0, 10)}, ${"user"}, ${"Pasted by Everett. Not yet scored."})
    `;
    return { ok: true as const, id };
  });

export const deleteLibraryItem = createServerFn({ method: "POST" })
  .validator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`delete from library_items where id = ${data.id}`;
    await sql`
      insert into tombstones (kind, item_key) values (${"library"}, ${data.id})
      on conflict do nothing
    `;
    return { ok: true as const };
  });

export const saveDraft = createServerFn({ method: "POST" })
  .validator((input: { kind: string; title: string; body: string; sourceId?: string }) => input)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<{ id: number }>`
      insert into drafts (kind, title, body, source_id, status)
      values (${data.kind}, ${data.title}, ${data.body}, ${data.sourceId ?? null}, ${"ready"})
      returning id
    `;
    return { ok: true as const, id: rows[0]?.id ?? 0 };
  });

export const deleteDraft = createServerFn({ method: "POST" })
  .validator((input: { id: number }) => input)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<{ source_id: string | null }>`
      select source_id from drafts where id = ${data.id}
    `;
    await sql`delete from drafts where id = ${data.id}`;
    const key = rows[0]?.source_id || String(data.id);
    await sql`
      insert into tombstones (kind, item_key) values (${"draft"}, ${key})
      on conflict do nothing
    `;
    return { ok: true as const };
  });

export const setDraftStatus = createServerFn({ method: "POST" })
  .validator((input: { id: number; status: string }) => input)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`update drafts set status = ${data.status} where id = ${data.id}`;
    return { ok: true as const };
  });

export const setCalendarStatus = createServerFn({ method: "POST" })
  .validator((input: { id: number; status: string }) => input)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`update calendar_items set status = ${data.status} where id = ${data.id}`;
    return { ok: true as const };
  });

export const deleteCalendarItem = createServerFn({ method: "POST" })
  .validator((input: { id: number }) => input)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<{ title: string }>`
      select title from calendar_items where id = ${data.id}
    `;
    await sql`delete from calendar_items where id = ${data.id}`;
    if (rows[0]) {
      await sql`
        insert into tombstones (kind, item_key) values (${"calendar-title"}, ${rows[0].title})
        on conflict do nothing
      `;
    }
    return { ok: true as const };
  });

export const addCalendarItem = createServerFn({ method: "POST" })
  .validator(
    (input: { day: string; slot: string; title: string; body: string; channel: string }) => input,
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<{ id: number }>`
      insert into calendar_items (day, slot, title, body, channel, status)
      values (${data.day}, ${data.slot}, ${data.title}, ${data.body}, ${data.channel}, ${"planned"})
      returning id
    `;
    return { ok: true as const, id: rows[0]?.id ?? 0 };
  });

export const generatePack = createServerFn({ method: "POST" })
  .validator(
    (input: {
      kind: string;
      sourceTitle: string;
      sourceBody: string;
      extra?: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    const kindLabel: Record<string, string> = {
      short: "a short X post, 40–80 words, first line under 12 words",
      thread: "an X thread of 5–7 posts, each able to stand alone, numbered",
      reply: "a quote-tweet / reply designed to enter someone else's X room",
      facebook:
        "a Facebook post for Chef.Ev's 4.3k. Talk like a person in the comments, not a company page. Native video caption. You may use his actual line: the biggest company in the world just said hello to my country ass. Do NOT write a childhood origin story.",
      linkedin:
        "a LinkedIn founder letter about the WORK, not the childhood. No corporate theater. One ask for a warm introduction. Do not open with nonverbal / school / pity.",
      tiktok:
        "a TikTok/Reels/Clapper script: 7–12 seconds, on-screen text, spoken first line, caption under 150 characters. The work, not a childhood memoir. Hook in the first second. Sound-off readable.",
      instagram:
        "an Instagram caption for @chef_evs_journey. Chef first, then the work. Letter, not a hashtag dump. Five tags at the end maximum. No childhood origin.",
      youtube: "a YouTube title, 2-sentence description, and first 12-second on-screen line",
    };
    const result = await grokChat({
      json: true,
      maxTokens: 1600,
      messages: operatorMessages(
        [
          {
            role: "user",
            content: `Write ${kindLabel[data.kind] ?? "a short X post"} from this existing content. Use the content. Do not invent a different company. Do not write a childhood origin story. Interviews already cover that. Personal posts are the work.

TITLE: ${data.sourceTitle}

CONTENT:
${data.sourceBody}

${data.extra ? `OPERATOR NOTE: ${data.extra}` : ""}

Return JSON with keys:
- hook (the first line, under 12 words)
- body (the full post or thread; if thread, separate posts with a line that is exactly ---)
- alt (one alternate version, shorter)
- why (2 sentences: why this will move given HIS actual view counts, not theory)
- rooms (array of 3 specific rooms / accounts / hashtags to walk this into)`,
          },
        ],
        "Return only JSON.",
      ),
    });
    if (!result.ok) return result;
    try {
      const parsed = parseJsonBlock(result.text) as {
        hook?: string;
        body?: string;
        alt?: string;
        why?: string;
        rooms?: string[];
      };
      return {
        ok: true as const,
        pack: {
          hook: parsed.hook ?? "",
          body: parsed.body ?? result.text,
          alt: parsed.alt ?? "",
          why: parsed.why ?? "",
          rooms: Array.isArray(parsed.rooms) ? parsed.rooms.map(String) : [],
        },
      };
    } catch {
      return {
        ok: true as const,
        pack: {
          hook: "",
          body: result.text,
          alt: "",
          why: "",
          rooms: [],
        },
      };
    }
  });

export const runRecon = createServerFn({ method: "POST" }).handler(async () => {
  const result = await grokChat({
    search: true,
    maxTokens: 1400,
    messages: operatorMessages([
      {
        role: "user",
        content: `Go look again across ALL of his rooms, not just X.

Search:
- facebook.com/Chef.Ev and facebook.com/TheChristmanAIProject
- linkedin.com/in/thechristmanaiproject
- tiktok.com/@Chef_Ev
- instagram.com/chef_evs_journey
- x.com/ChristmanAI
- youtube.com/@TheChristmanAIProject and youtube.com/c/Evercook71
- thechristmanaiproject.com

Report ONLY:
1. Anything new since 19 Aug 2026 on ANY of those rooms.
2. NVIDIA Inception: Facebook was 99 views / 10 comments, X was 21 views. Has either moved?
3. Three moves for the next 48 hours, each named with a specific channel (Facebook, LinkedIn, TikTok/Reels, etc.).
4. One Facebook recut and one TikTok caption, in his voice — the WORK, not a childhood origin story.

If search fails, say so and work from the dossier. Do not invent view counts. Do not pretend X is the only network.`,
      },
    ]),
  });
  if (!result.ok) return result;
  const sql = await getSql();
  await sql`insert into recon_reports (summary) values (${result.text})`;
  return { ok: true as const, summary: result.text };
});

export const deskAsk = createServerFn({ method: "POST" })
  .validator((input: { message: string; search?: boolean }) => input)
  .handler(async ({ data }) => {
    const message = data.message.trim();
    if (!message) return { ok: false as const, error: "Say something." };
    const sql = await getSql();
    await sql`insert into chat_messages (role, content) values (${"user"}, ${message})`;
    const history = await sql<ChatRow>`
      select id, role, content, created_at::text as created_at
      from chat_messages
      order by id desc
      limit 16
    `;
    const chronological = history.reverse().map((m) => ({
      role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: m.content,
    }));
    const result = await grokChat({
      search: Boolean(data.search),
      maxTokens: 1400,
      messages: operatorMessages(chronological),
    });
    if (!result.ok) return result;
    await sql`insert into chat_messages (role, content) values (${"assistant"}, ${result.text})`;
    return { ok: true as const, text: result.text };
  });

export const clearDeskChat = createServerFn({ method: "POST" }).handler(async () => {
  const sql = await getSql();
  await sql`delete from chat_messages`;
  return { ok: true as const };
});
