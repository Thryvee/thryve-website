export interface AiAction {
  type: "link" | "book" | "lead-capture" | "scroll";
  label: string;
  href?: string;
  targetId?: string;
}

export interface AiEntry {
  id: string;
  /** Phrases/keywords that should trigger this entry. Matched case-insensitively, fuzzy. */
  triggers: string[];
  /** Short quick-reply label shown as a suggestion chip. */
  chipLabel: string;
  /** The response, can be multiple paragraphs (rendered as separate bubbles). */
  response: string[];
  actions?: AiAction[];
  /** Related entry ids offered as follow-up chips after this answer. */
  followUps?: string[];
}

export const aiKnowledgeBase: AiEntry[] = [
  // ── Services ──────────────────────────────────────────────
  {
    id: "services-overview",
    triggers: ["services", "what do you do", "what does thryve do", "offerings", "what can you help with"],
    chipLabel: "What services do you offer?",
    response: [
      "We run one system across four connected pillars — Acquisition, Conversion, Retention, and Scaling — instead of handing off a single deliverable and disappearing like most agencies.",
      "Acquisition brings in the right buyers through paid, organic, and creative-led channels. Conversion turns visitors into customers with better funnels and landing pages. Retention keeps them coming back through lifecycle and CRM systems. Scaling takes what's working and pours fuel on it, profitably.",
    ],
    followUps: ["service-acquisition", "service-conversion", "service-retention", "service-scaling", "process-overview"],
  },
  {
    id: "service-acquisition",
    triggers: ["acquisition", "paid ads", "meta ads", "tiktok ads", "customer acquisition", "cac", "traffic"],
    chipLabel: "Tell me about Acquisition",
    response: [
      "Acquisition is about bringing in buyers who actually convert, not just traffic. We run paid, organic, and creative-led channels together instead of siloed.",
      "In practice this means a weekly creative testing cadence, dedicated retargeting funnels so cold and warm traffic don't compete for the same budget, and channel diversification once one account gets saturated. Juniper & Oat cut CAC 58% this way, and Solstice Eyewear launched at an $11 CAC with zero existing customer data.",
    ],
    actions: [{ type: "link", label: "See the Juniper & Oat case study", href: "/case-studies" }],
    followUps: ["service-conversion", "results-overview", "book-call"],
  },
  {
    id: "service-conversion",
    triggers: ["conversion", "landing pages", "funnels", "checkout", "cro", "conversion rate optimization"],
    chipLabel: "Tell me about Conversion",
    response: [
      "Conversion work is landing pages, funnels, and on-page experience built around one job — moving someone from interested to purchased.",
      "A lot of brands assume a conversion problem is a traffic problem. Northfield Supply Co. was pulling 80K sessions a month but converting at just 1.1% — the fix was almost entirely on-page: social proof, a simpler mobile checkout, and a smarter upsell flow. Conversion rate rose 142% in six weeks with zero new ad spend.",
    ],
    actions: [{ type: "link", label: "See the Northfield case study", href: "/case-studies" }],
    followUps: ["service-retention", "results-overview", "book-call"],
  },
  {
    id: "service-retention",
    triggers: ["retention", "email marketing", "sms", "lifecycle", "churn", "repeat customers", "ltv", "subscription"],
    chipLabel: "Tell me about Retention",
    response: [
      "Retention is lifecycle marketing and CRM systems that turn one-time buyers into repeat customers — post-purchase email sequences, win-back flows, loyalty tiers, and reorder timing based on actual usage data instead of generic calendar intervals.",
      "Birchwell Labs was losing 40% of first-time buyers before a second order. A proper lifecycle system lifted repeat purchase rate 67% and more than doubled 6-month LTV in a single quarter.",
    ],
    actions: [{ type: "link", label: "See the Birchwell Labs case study", href: "/case-studies" }],
    followUps: ["service-scaling", "results-overview", "book-call"],
  },
  {
    id: "service-scaling",
    triggers: ["scaling", "scale spend", "grow revenue", "multiple channels", "diversify"],
    chipLabel: "Tell me about Scaling",
    response: [
      "Scaling is the systematic, profitable growth of what's already working — not just increasing ad budget and hoping. We diagnose whether an account is actually saturated, build out new channels in parallel with their own attribution, and only scale spend once a channel proves stable for a set number of consecutive days.",
      "Harlow & Fern had tried scaling twice before and broken even both times. The third attempt, run our way, grew monthly revenue from $180K to over $500K in five months while holding net margin at 12%.",
    ],
    actions: [{ type: "link", label: "See the Harlow & Fern case study", href: "/case-studies" }],
    followUps: ["results-overview", "pricing", "book-call"],
  },

  // ── Results / case studies ────────────────────────────────
  {
    id: "results-overview",
    triggers: ["results", "case studies", "proof", "track record", "have you worked with", "clients", "portfolio", "numbers"],
    chipLabel: "Show me results",
    response: [
      "We've generated $4.2M for 128 brands with a 94% client retention rate — and every engagement is tied to a real number, not vanity metrics.",
      "A few highlights: Juniper & Oat cut blended CAC 58%, Northfield Supply Co. lifted conversion rate 142% in six weeks, Birchwell Labs grew repeat purchase rate 67%, and Harlow & Fern scaled monthly revenue 2.8x while holding margin. Full breakdowns — the challenge, what we did, and the trajectory chart — are on the case studies page.",
    ],
    actions: [{ type: "link", label: "Browse all case studies", href: "/case-studies" }],
    followUps: ["services-overview", "process-overview", "book-call"],
  },

  // ── Process ────────────────────────────────────────────────
  {
    id: "process-overview",
    triggers: ["process", "how does it work", "how do you work", "what happens first", "onboarding", "getting started"],
    chipLabel: "How does the process work?",
    response: [
      "We start with an audit, not a pitch deck. In the first two weeks we audit your current funnel, identify the highest-leverage gaps, and ship the first live test — you'll see something real move before month one is out.",
      "Day to day, we run async by default: a visible board, weekly updates, no calendar full of check-in calls. Most clients spend under an hour a week actually managing us. You always see the reasoning behind a test before it ships.",
    ],
    followUps: ["process-team", "process-timeline", "book-call"],
  },
  {
    id: "process-team",
    triggers: ["dedicated team", "account manager", "who works on my account", "team structure"],
    chipLabel: "Will I get a dedicated team?",
    response: [
      "Yes — a dedicated team stays on your account for the length of the engagement. No handoffs between strategists, no re-explaining your business every quarter, which is where a lot of agency relationships quietly fall apart.",
    ],
    followUps: ["process-overview", "pricing", "book-call"],
  },
  {
    id: "process-timeline",
    triggers: ["how long", "timeline", "how soon", "when can we start", "how quickly"],
    chipLabel: "How soon can we start?",
    response: [
      "Most engagements kick off within a week of the initial call, once we've scoped the audit and agreed on the first sprint's priorities. You'll see the first live test within the first two weeks.",
    ],
    followUps: ["process-overview", "book-call"],
  },

  // ── Pricing / investment ───────────────────────────────────
  {
    id: "pricing",
    triggers: ["price", "pricing", "cost", "how much", "budget", "fees", "retainer", "investment"],
    chipLabel: "What does it cost?",
    response: [
      "It depends on scope — which channels, how much build work is involved, and your current stage. The clearest way to get an accurate number is a quick call where we scope it against your goals.",
      "What I can tell you: engagements run month to month with no long-term lock-in, and most relationships start with a focused first sprint on the highest-leverage part of your funnel before scaling further. Strategy, execution, and reporting are always included — ad spend and third-party tools are billed separately and stay fully transparent.",
    ],
    followUps: ["fit-check", "book-call"],
  },

  // ── Fit ────────────────────────────────────────────────────
  {
    id: "fit-check",
    triggers: ["is this right for me", "am i a good fit", "who do you work with", "what kind of brands", "minimum size", "d2c only"],
    chipLabel: "Is Thryve a fit for me?",
    response: [
      "We work mostly with consumer brands and product companies that already have a baseline of traffic or customers — we're built for scaling something real, not validating an idea from zero.",
      "The clearest signal is this: if we can see a path to a result in the first sprint during the audit, we'll take the engagement. If we can't, we'll tell you honestly instead of taking your money anyway.",
    ],
    followUps: ["pricing", "book-call"],
  },

  // ── About / company ────────────────────────────────────────
  {
    id: "about-company",
    triggers: ["about thryve", "who is thryve", "company", "founded", "history", "mission"],
    chipLabel: "Tell me about Thryve",
    response: [
      "Thryve is the world's first revenue systems agency — built on the idea that acquisition, conversion, and retention shouldn't be three separate vendors passing you around, but one connected system.",
      "We've delivered 128+ brand audits with a 94% client retention rate, generating $4.2M for the brands we work with.",
    ],
    followUps: ["about-founder", "about-values", "services-overview"],
  },
  {
    id: "about-founder",
    triggers: ["founder", "sakcham", "ceo", "who runs thryve", "who started thryve"],
    chipLabel: "Who founded Thryve?",
    response: [
      "Sakcham Raj founded Thryve after years in D2C growth, tired of the \"just wing it\" approach most agencies take. He's scaled 120+ brands over 6+ years, built around the idea that every result has to trace back to a transparent, trackable number.",
      "His words: \"No guesswork, no vanity metrics. Just numbers you can trust and results you can trace.\"",
    ],
    followUps: ["about-values", "about-company", "book-call"],
  },
  {
    id: "about-values",
    triggers: ["values", "how do you work", "culture", "what makes you different", "why choose thryve", "different from other agencies"],
    chipLabel: "What makes Thryve different?",
    response: [
      "Four things, in practice: we move with speed (every sprint ships something live, not another deck), we let data override opinion, we run every account like it's our own revenue on the line, and there are no black boxes — you see the board and the reasoning behind every test.",
      "Most agencies specialize in one channel and hand you a report. We embed across the full funnel end to end and stay accountable to revenue, not impressions.",
    ],
    followUps: ["about-founder", "process-overview", "book-call"],
  },

  // ── Booking / contact ──────────────────────────────────────
  {
    id: "book-call",
    triggers: ["book a call", "schedule", "talk to someone", "get started", "contact", "audit call", "free audit", "speak to someone"],
    chipLabel: "Book a call",
    response: [
      "The fastest way in is a free 30-minute growth audit call. We'll look at your funnel, find the highest-leverage gaps, and show you exactly where the opportunity is — no pitch, no pressure.",
    ],
    actions: [{ type: "book", label: "Book your free audit call →" }],
    followUps: ["lead-capture-start"],
  },
  {
    id: "lead-capture-start",
    triggers: ["not ready to book", "just want more info", "send me something", "email me", "checklist"],
    chipLabel: "Not ready for a call yet",
    response: [
      "No problem — I can send you the same funnel audit checklist our team runs before every client engagement. Just drop your email and I'll get it over to you, no call required.",
    ],
    actions: [{ type: "lead-capture", label: "Get the free checklist" }],
    followUps: ["book-call"],
  },

  // ── Guarantees / risk ──────────────────────────────────────
  {
    id: "guarantees",
    triggers: ["guarantee", "results guaranteed", "what if it doesn't work", "risk", "money back", "refund"],
    chipLabel: "Do you guarantee results?",
    response: [
      "No agency honestly can, and we won't pretend otherwise. What we guarantee is a disciplined process, visible testing, and a team that tells you the truth about what's working — including when something isn't.",
      "There's no long lock-in either way. Engagements run month to month, and either side can step away with notice. We'd rather earn the renewal than force it.",
    ],
    followUps: ["fit-check", "pricing", "book-call"],
  },
  {
    id: "existing-team",
    triggers: ["already have a marketing team", "in-house team", "internal team"],
    chipLabel: "I already have an internal team",
    response: [
      "That's common, and it's fine — we plug in alongside your team, not over them. Most clients keep their in-house team focused on brand and use us for the systems and execution layer that's harder to hire for in-house.",
    ],
    followUps: ["process-overview", "book-call"],
  },
];

export const aiFallback: AiEntry = {
  id: "fallback",
  triggers: [],
  chipLabel: "",
  response: [
    "I don't have a canned answer for that one, but I can get you to someone who does — want me to connect you to a quick call, or point you at the right page?",
  ],
  actions: [{ type: "book", label: "Book a free audit call" }],
  followUps: ["services-overview", "results-overview", "pricing"],
};

export const aiGreeting: AiEntry = {
  id: "greeting",
  triggers: [],
  chipLabel: "",
  response: [
    "Hey — I'm Thryve AI. I can walk you through our services, share real results, explain how we work, or get you booked on a call. What's on your mind?",
  ],
  followUps: ["services-overview", "results-overview", "pricing", "book-call"],
};

export function findEntry(id: string): AiEntry | undefined {
  return aiKnowledgeBase.find((e) => e.id === id);
}

/**
 * Lightweight fuzzy scoring: counts trigger-phrase hits in the user's message,
 * with partial-word matches weighted lower than full-phrase matches.
 */
export function matchEntry(input: string): AiEntry {
  const normalized = input.toLowerCase().trim();
  if (!normalized) return aiFallback;

  let best: AiEntry | null = null;
  let bestScore = 0;

  for (const entry of aiKnowledgeBase) {
    let score = 0;
    for (const trigger of entry.triggers) {
      const t = trigger.toLowerCase();
      if (normalized.includes(t)) {
        score += t.split(" ").length * 2;
      } else {
        const words = t.split(" ");
        const hits = words.filter((w) => normalized.includes(w)).length;
        if (hits > 0) score += hits * 0.5;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return best && bestScore >= 1 ? best : aiFallback;
}
