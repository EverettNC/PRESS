const BANNED = [
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
  "synergy",
];

const PROOF_MARKERS = [
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
  "offline",
];

export type VoiceFlag = {
  ok: boolean;
  code: string;
  note: string;
};

export function firstLine(text: string): string {
  const line = text
    .split(/\n+/)
    .map((l) => l.trim())
    .find(Boolean);
  return line ?? "";
}

export function critiqueVoice(text: string): VoiceFlag[] {
  const raw = text.trim();
  const lower = raw.toLowerCase();
  const hook = firstLine(raw);
  const words = raw.split(/\s+/).filter(Boolean);
  const hookWords = hook.split(/\s+/).filter(Boolean);
  const tags = (raw.match(/#\w+/g) ?? []).length;
  const flags: VoiceFlag[] = [];

  flags.push({
    ok: hookWords.length > 0 && hookWords.length <= 12,
    code: "hook",
    note:
      hookWords.length === 0
        ? "No first line."
        : hookWords.length <= 12
          ? `Hook is ${hookWords.length} words.`
          : `Hook is ${hookWords.length} words. Cut it to twelve or fewer.`,
  });

  const bannedHit = BANNED.find((b) => lower.includes(b));
  flags.push({
    ok: !bannedHit,
    code: "theater",
    note: bannedHit
      ? `Kill “${bannedHit}”. That is not his voice.`
      : "No press-release theater.",
  });

  flags.push({
    ok: tags <= 3,
    code: "tags",
    note:
      tags <= 3
        ? tags === 0
          ? "No hashtag pile."
          : `${tags} hashtag${tags === 1 ? "" : "s"}.`
        : `${tags} hashtags. Three is the ceiling.`,
  });

  const hasProof = PROOF_MARKERS.some((m) => lower.includes(m));
  flags.push({
    ok: hasProof,
    code: "proof",
    note: hasProof
      ? "Specific proof is on the page."
      : "No named proof. Put NVIDIA, AlphaVox, the glove, Ohio, or Inferno in.",
  });

  flags.push({
    ok: words.length > 0 && words.length <= 80,
    code: "length",
    note:
      words.length === 0
        ? "Empty."
        : words.length <= 80
          ? `${words.length} words. Fits a post that can travel.`
          : `${words.length} words. This is a thread or a cut.`,
  });

  const pity = /(inspiring|despite his|special needs|suffering from)/i.test(raw);
  flags.push({
    ok: !pity,
    code: "dignity",
    note: pity
      ? "Pity language detected. Dignity, never inspiration-porn."
      : "Dignity holds.",
  });

  const originDump = /nonverbal until|until i was (4|6|four|six)|the school did not have a tool/i.test(
    raw,
  );
  flags.push({
    ok: !originDump,
    code: "origin",
    note: originDump
      ? "Childhood origin is for interviews. Take it out of the personal post."
      : "No childhood memoir.",
  });

  return flags;
}

export function voiceScore(flags: VoiceFlag[]): number {
  if (flags.length === 0) return 0;
  return Math.round((flags.filter((f) => f.ok).length / flags.length) * 100);
}
