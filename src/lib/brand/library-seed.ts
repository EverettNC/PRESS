import { YOUTUBE_VIDEOS } from "./youtube";

export type LibrarySeed = {
  id: string;
  platform: "x" | "youtube" | "site" | "facebook" | "linkedin" | "tiktok" | "instagram";
  title: string;
  body: string;
  url: string;
  postedAt: string;
  views: number;
  likes: number;
  reposts: number;
  diagnosis: string;
};

const YT_SEED: LibrarySeed[] = YOUTUBE_VIDEOS.map((v) => ({
  id: v.id,
  platform: "youtube" as const,
  title: v.title,
  body: v.body,
  url: v.url,
  postedAt: v.postedAt,
  views: v.views,
  likes: v.likes,
  reposts: 0,
  diagnosis: v.diagnosis,
}));

export const LIBRARY_SEED: LibrarySeed[] = [
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
    diagnosis:
      "Biggest proof, wrong room. Same video did 99 views and 10 comments on Facebook Chef.Ev. X is the side door.",
  },
  {
    id: "fb-nvidia-inception",
    platform: "facebook",
    title: "NVIDIA Inception — Chef.Ev",
    body: `We are in.

The Christman AI Project has officially been accepted into the NVIDIA Inception Program.

This wasn't built in a Silicon Valley boardroom. It was built from the margins.

Few people know I walked away from social media almost 2 years ago and I've been working on this night and day. The biggest company in the world just said hello to my country ass.

Dignity first. How can we help you love yourself more?`,
    url: "https://www.facebook.com/Chef.Ev/videos/2145118663080181/",
    postedAt: "2026-08-15",
    views: 99,
    likes: 7,
    reposts: 0,
    diagnosis:
      "Same news as X. 99 views, 7 reactions, 10 comments on a 4.3k graph. The comments are the job.",
  },
  {
    id: "fb-page-nvidia",
    platform: "facebook",
    title: "NVIDIA Inception — project page",
    body: `Thank you, NVIDIA, for seeing the vision and backing the reality of what we are building.

The Christman AI Project has officially been accepted into the NVIDIA Inception Program.

How can we help you love yourself more?`,
    url: "https://www.facebook.com/TheChristmanAIProject/",
    postedAt: "2026-08-15",
    views: 0,
    likes: 0,
    reposts: 0,
    diagnosis: "Company page. Point this at Chef.Ev. Do not run two comment threads.",
  },
  {
    id: "li-nebius",
    platform: "linkedin",
    title: "LinkedIn — Nebius for Startups",
    body: `Proud to announce that the Christman AI Project has officially been accepted into the Nebius for Startups community.

The eyes are open. The systems are online. Let's get to work.`,
    url: "https://www.linkedin.com/in/thechristmanaiproject",
    postedAt: "2026-08-01",
    views: 0,
    likes: 0,
    reposts: 0,
    diagnosis: "LinkedIn is for introductions, not announcements. The work, one ask. No memoir.",
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
    diagnosis: "YouTube link dump. Native video is 13 views on YouTube. Clip it. Don't link it.",
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
    diagnosis: "The last two sentences are a campaign. Deadline is 30 Sep.",
  },
  ...YT_SEED,
  {
    id: "tt-open",
    platform: "tiktok",
    title: "TikTok @Chef_Ev — clip mine",
    body: "Handle is live. 12-second native video from Inferno 0:00, 5:18, 8:02 and the Inception file. On-screen text. Caption under 150 characters.",
    url: "https://www.tiktok.com/@Chef_Ev",
    postedAt: "2026-08-19",
    views: 0,
    likes: 0,
    reposts: 0,
    diagnosis: "Cut Inferno. Do not paste a press release. Same file to Reels and Clapper.",
  },
  {
    id: "ig-journey",
    platform: "instagram",
    title: "Instagram @chef_evs_journey",
    body: "Chef Ev's journey. Reels get the same vertical file as TikTok. Caption is a letter. Five hashtags at the end, not a dump.",
    url: "https://www.instagram.com/chef_evs_journey/",
    postedAt: "2026-08-19",
    views: 0,
    likes: 0,
    reposts: 0,
    diagnosis: "Kitchen first, then the work. This account already knows him as a chef.",
  },
  {
    id: "site-home",
    platform: "site",
    title: "thechristmanaiproject.com — home",
    body: "We build AI for the people everyone else walked past. Five patent-pending systems. One governing framework.",
    url: "https://thechristmanaiproject.com/",
    postedAt: "2026-08-19",
    views: 0,
    likes: 0,
    reposts: 0,
    diagnosis: "The site already has the line.",
  },
];
