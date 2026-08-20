import { addDays, format, startOfDay } from "date-fns";

export type PlanSeed = {
  offset: number;
  slot: "morning" | "midday" | "evening";
  title: string;
  body: string;
  channel: "x" | "reply" | "youtube" | "linkedin" | "facebook" | "tiktok" | "instagram";
};

export const PLAN_SEED: PlanSeed[] = [
  {
    offset: 0,
    slot: "morning",
    title: "Facebook Chef.Ev — recut NVIDIA, his words",
    body: `NVIDIA Inception took us in this week.

Not from a boardroom. From Ohio.

I walked away from this app for almost two years. Worked night and day. Then the biggest company in the world said hello to my country ass.

Offline voice. Memory that stays theirs. Dignity first.

If you know someone who needs this — send it.`,
    channel: "facebook",
  },
  {
    offset: 0,
    slot: "evening",
    title: "TikTok / Reels — 12 seconds, the work",
    body: `ON SCREEN:
NVIDIA just took us in.
Ohio. Not a boardroom.
Offline voice. Dignity first.

CAPTION:
NVIDIA Inception this week. Built in Ohio. Send this to someone who needs it.`,
    channel: "tiktok",
  },
  {
    offset: 1,
    slot: "morning",
    title: "LinkedIn — the work, one intro",
    body: `NVIDIA Inception took us in this week.

We build offline-first voice for people who cannot speak, and memory for people who are losing theirs.

I do not have a boardroom. I have a patent, a glove, and the work.

If you know a family, a veteran, or a memory-care floor that was walked past — I want the introduction.`,
    channel: "linkedin",
  },
  {
    offset: 1,
    slot: "evening",
    title: "Inferno — Facebook, about them",
    body: `22 veterans a day.

Inferno does not play therapist. It would rather hand you to a human than lie to you.

If you know a veteran who feels forgotten — send this.

We are here.`,
    channel: "facebook",
  },
];

export function materializePlan(from = new Date()) {
  const start = startOfDay(from);
  return PLAN_SEED.map((item) => ({
    day: format(addDays(start, item.offset), "yyyy-MM-dd"),
    slot: item.slot,
    title: item.title,
    body: item.body,
    channel: item.channel,
    status: "planned" as const,
  }));
}
