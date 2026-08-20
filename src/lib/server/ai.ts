import { SYSTEM_OPERATOR } from "@/lib/brand/identity";

const MODEL = "grok-4.5";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export type GrokResult =
  | { ok: true; text: string }
  | { ok: false; error: string };

function extractText(body: unknown): string {
  if (!body || typeof body !== "object") return "";
  const rec = body as Record<string, unknown>;
  const choices = rec.choices as
    | { message?: { content?: unknown } }[]
    | undefined;
  const content = choices?.[0]?.message?.content;
  if (typeof content === "string") return content.trim();
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (part && typeof part === "object" && "text" in part) {
          const t = (part as { text?: unknown }).text;
          return typeof t === "string" ? t : "";
        }
        return "";
      })
      .join("")
      .trim();
  }
  const outputText = rec.output_text;
  if (typeof outputText === "string") return outputText.trim();
  return "";
}

export function parseJsonBlock(text: string): unknown {
  const stripped = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");
  if (start >= 0 && end > start) {
    return JSON.parse(stripped.slice(start, end + 1));
  }
  return JSON.parse(stripped);
}

export async function grokChat(opts: {
  messages: ChatMessage[];
  maxTokens?: number;
  json?: boolean;
  search?: boolean;
}): Promise<GrokResult> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { ok: false, error: "AI is not available in this environment" };

  const body: Record<string, unknown> = {
    model: MODEL,
    messages: opts.messages,
    max_tokens: opts.maxTokens ?? 1800,
    temperature: 0.6,
  };
  if (opts.json) {
    body.response_format = { type: "json_object" };
  }
  if (opts.search) {
    body.tools = [
      { type: "x_search", allowed_x_handles: ["ChristmanAI"] },
      { type: "web_search" },
    ];
  }

  const run = async (payload: Record<string, unknown>) => {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(90_000),
    });
    const raw = await res.text();
    if (!res.ok) {
      return { ok: false as const, error: `xAI API error ${res.status}`, raw };
    }
    let parsed: unknown = raw;
    try {
      parsed = JSON.parse(raw);
    } catch {
      /* keep text */
    }
    const text = extractText(parsed);
    if (!text) {
      return { ok: false as const, error: "Empty model response", raw };
    }
    return { ok: true as const, text };
  };

  let result = await run(body);
  if (!result.ok && opts.search) {
    const { tools: _t, ...without } = body;
    void _t;
    result = await run(without);
  }
  if (!result.ok) return { ok: false, error: result.error };
  return { ok: true, text: result.text };
}

export function operatorMessages(
  history: { role: "user" | "assistant"; content: string }[],
  extra?: string,
): ChatMessage[] {
  const system = extra ? `${SYSTEM_OPERATOR}\n\n${extra}` : SYSTEM_OPERATOR;
  return [{ role: "system", content: system }, ...history];
}
