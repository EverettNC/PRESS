import { OWNER } from "@/lib/brand/identity";

export type PushRoom = {
  id: string;
  label: string;
  compose: (text: string, url?: string) => string;
};

function clip(text: string, max: number) {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export const PUSH_ROOMS: PushRoom[] = [
  {
    id: "facebook",
    label: "Facebook",
    compose: () => OWNER.facebookPage,
  },
  {
    id: "x",
    label: "X",
    compose: (text, url) => {
      const body = url ? `${clip(text, 240)}\n${url}` : clip(text, 270);
      return `https://x.com/intent/post?text=${encodeURIComponent(body)}`;
    },
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    compose: (text, url) => {
      const target = url || OWNER.site;
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(target)}`;
    },
  },
  {
    id: "tiktok",
    label: "TikTok",
    compose: () => "https://www.tiktok.com/tiktokstudio/upload",
  },
  {
    id: "instagram",
    label: "Instagram",
    compose: () => OWNER.instagram,
  },
  {
    id: "youtube",
    label: "YouTube",
    compose: () => "https://studio.youtube.com/",
  },
];

export function roomsFor(platform: string): PushRoom[] {
  if (platform === "youtube") {
    return PUSH_ROOMS.filter((r) =>
      ["facebook", "tiktok", "x"].includes(r.id),
    );
  }
  if (platform === "facebook") return PUSH_ROOMS.filter((r) => r.id === "facebook" || r.id === "x");
  if (platform === "linkedin") return PUSH_ROOMS.filter((r) => r.id === "linkedin");
  if (platform === "tiktok" || platform === "instagram") {
    return PUSH_ROOMS.filter((r) => r.id === "tiktok" || r.id === "instagram");
  }
  if (platform === "x") return PUSH_ROOMS.filter((r) => r.id === "x");
  return PUSH_ROOMS;
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  }
}

export async function pushToRoom(room: PushRoom, text: string, url?: string) {
  await copyText(text);
  const href = room.compose(text, url);
  window.open(href, "_blank", "noopener,noreferrer");
}
