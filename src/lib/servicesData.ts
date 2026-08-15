import type { CaseStudy } from "./caseStudiesData";

export interface ServicePage {
  slug: string;
  category: CaseStudy["category"];
  navLabel: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  headlineStat: { value: string; label: string };
  problem: {
    heading: string;
    body: string[];
  };
  chart: {
    unit: "currency" | "percent" | "multiplier";
    points: { label: string; value: number }[];
    note: string;
    heading: string;
    caption: string;
  };
  approach: {
    heading: string;
    steps: { title: string; body: string }[];
  };
  deliverables: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const servicePages: ServicePage[] = [
  {
    slug: "d2c-growth",
    category: "Scaling",
    navLabel: "D2C Growth",
    h1: "D2C Growth Systems for Brands Ready to Scale",
    metaTitle: "D2C Growth Agency — Acquisition, Conversion & Retention Systems",
    metaDescription:
      "Thryve is a D2C growth agency that builds the full acquisition, conversion, and retention system behind sustainable revenue growth — not a single-channel vendor.",
    eyebrow: "D2C Growth",
    intro:
      "Most D2C brands don't have a growth problem in one channel — they have a systems problem across all of them. Acquisition, conversion, and retention get run by different vendors, on different timelines, with no shared source of truth. Thryve builds and runs that system as one connected engine, under a single dedicated team.",
    headlineStat: { value: "2.8x", label: "Average revenue growth within 5 months" },
    problem: {
      heading: "Why growth stalls even when individual channels look healthy",
      body: [
        "A brand can have a profitable ad account and still plateau, because the product pages downstream aren't converting that traffic efficiently. Or retention can be an afterthought while acquisition spend keeps climbing to backfill the customers who never come back.",
        "Growth compounds when acquisition, conversion, and retention are diagnosed and improved together — not when each is optimized in isolation by a different specialist with no visibility into the others. A conversion fix that isn't matched by a retention plan just means more people churn faster. An acquisition win that isn't matched by on-site conversion just burns more budget on the same leaky bucket.",
        "This is the actual failure mode behind most stalled D2C brands: not a lack of effort in any one area, but a lack of a single team accountable for how all three areas interact.",
      ],
    },
    chart: {
      unit: "currency",
      note: "Monthly revenue, in thousands, five-month engagement",
      heading: "What compounding actually looks like on a graph",
      caption:
        "This is the real trajectory from a Harlow & Fern engagement — revenue growth that held once acquisition, conversion, and retention started reinforcing each other instead of working against each other.",
      points: [
        { label: "M1", value: 180 },
        { label: "M2", value: 215 },
        { label: "M3", value: 290 },
        { label: "M4", value: 375 },
        { label: "M5", value: 505 },
      ],
    },
    approach: {
      heading: "How we approach a growth engagement",
      steps: [
        {
          title: "Audit the full funnel first",
          body: "Before any spend or code changes, we map where the funnel is actually leaking — acquisition cost, on-site conversion, and repeat purchase rate — so the first sprint targets the highest-leverage gap, not the loudest one.",
        },
        {
          title: "Ship the first live test within two weeks",
          body: "The audit produces a prioritized list of tests, and the first one goes live inside the first two weeks of the engagement — not a strategy deck.",
        },
        {
          title: "Run acquisition, conversion, and retention as one system",
          body: "The same team that diagnoses a conversion problem also owns the acquisition spend and retention flows feeding into it, so fixes in one area account for their effect on the others.",
        },
        {
          title: "Scale only what's already proven stable",
          body: "Budget increases follow evidence, not optimism — a channel has to hold for a defined number of consecutive days before we scale spend into it.",
        },
      ],
    },
    deliverables: [
      {
        title: "Full-funnel audit",
        body: "Identifying the highest-leverage gaps across acquisition, conversion, and retention — with a prioritized list of what to fix first and why.",
      },
      {
        title: "One dedicated team",
        body: "The same strategists and builders stay on your account for the length of the engagement. No rotating account managers, no re-explaining your business every quarter.",
      },
      {
        title: "A visible, live board",
        body: "Every test, every result, every next step — visible to you at any time, with a weekly async summary of what shipped and what it moved.",
      },
      {
        title: "Month-to-month terms",
        body: "No long-term lock-in. We'd rather earn the renewal every month than hold you to a contract.",
      },
    ],
    faqs: [
      {
        q: "What size brand is a good fit for a D2C growth engagement?",
        a: "Brands with an existing baseline of traffic or customers, where a funnel improvement has a real dollar impact. Thryve is built for scaling something real, not validating an idea from zero.",
      },
      {
        q: "How is this different from hiring a paid media agency and a CRO agency separately?",
        a: "Those engagements often optimize their own channel in isolation — the ad account gets better while nobody owns whether that traffic actually converts or comes back. A D2C growth engagement puts acquisition, conversion, and retention under one accountable team.",
      },
      {
        q: "How soon do we see results?",
        a: "Most engagements ship the first live test within two weeks of kickoff, once the audit identifies where the highest-leverage opportunity is.",
      },
      {
        q: "What does the engagement actually cost?",
        a: "It depends on scope — which channels, how much build work, and your current stage. The clearest way to get an accurate number is a quick call where we scope it against your goals.",
      },
    ],
  },
  {
    slug: "ecommerce-cro",
    category: "Conversion",
    navLabel: "Ecommerce CRO",
    h1: "Ecommerce Conversion Rate Optimization",
    metaTitle: "Ecommerce CRO Agency — Conversion Rate Optimization for D2C Brands",
    metaDescription:
      "Thryve audits and rebuilds the on-site experience — product pages, checkout, and landing pages — that determines whether traffic actually converts.",
    eyebrow: "Conversion",
    intro:
      "Traffic is rarely the real bottleneck. Most conversion problems live on the page itself — unclear product pages, checkout friction, or a landing page that doesn't match the ad that brought the visitor there. We diagnose exactly where visitors are dropping off and fix the specific page, not the whole site at once.",
    headlineStat: { value: "+142%", label: "Conversion rate lift, six weeks, zero new spend" },
    problem: {
      heading: "Where ecommerce conversion actually breaks down",
      body: [
        "A brand can be driving strong, qualified traffic and still convert well below category benchmarks because the product page doesn't answer the questions a buyer actually has, or checkout adds friction that a mobile visitor won't push through.",
        "Conversion problems are usually specific and diagnosable — a missing sizing tool, a checkout with too many steps, an offer that isn't clear above the fold — not a vague need for 'better design.' The fix is almost never a full redesign; it's usually one or two precise changes to the page that's actually losing people.",
        "The mistake most brands make is assuming a conversion problem means a traffic-quality problem, and pouring more budget into acquisition instead of looking at what happens once someone actually lands.",
      ],
    },
    chart: {
      unit: "percent",
      note: "Site-wide conversion rate, week over week",
      heading: "The exact curve a page-level fix produces",
      caption:
        "Northfield Supply Co. was pulling 80K sessions a month at a 1.1% conversion rate. No new ad spend, no site-wide redesign — just fixing the specific pages losing the most people.",
      points: [
        { label: "Wk 1", value: 1.1 },
        { label: "Wk 2", value: 1.3 },
        { label: "Wk 3", value: 1.6 },
        { label: "Wk 4", value: 2.0 },
        { label: "Wk 5", value: 2.4 },
        { label: "Wk 6", value: 2.7 },
      ],
    },
    approach: {
      heading: "How a conversion engagement runs",
      steps: [
        {
          title: "Audit the on-page experience against the actual traffic",
          body: "We look at where visitors are landing, what they expect based on the ad or search query that brought them, and where the page fails to meet that expectation.",
        },
        {
          title: "Fix the highest-leverage page first",
          body: "Rather than a site-wide redesign, we prioritize the specific product page, landing page, or checkout step causing the most drop-off, and ship changes there first.",
        },
        {
          title: "Test and measure against a clear baseline",
          body: "Every change ships against a documented before-and-after, so the impact on conversion rate and average order value is traceable, not assumed.",
        },
        {
          title: "Expand to the next-highest-leverage page",
          body: "Once a page's fix is validated, we move to the next biggest drop-off point — compounding improvements instead of a one-time redesign that decays over time.",
        },
      ],
    },
    deliverables: [
      {
        title: "Conversion audit",
        body: "A full diagnostic of your highest-traffic product pages and checkout flow, ranked by where visitors are actually dropping off.",
      },
      {
        title: "On-page trust and clarity fixes",
        body: "Above-the-fold social proof, sizing and fit tools, and clearer shipping and return messaging — wherever the audit finds a real gap.",
      },
      {
        title: "Simplified mobile checkout",
        body: "Fewer steps, express payment options, and a flow built around how people actually check out on a phone.",
      },
      {
        title: "Bundle and upsell testing",
        body: "Tied to your real purchase data, not generic cross-sells — built to lift AOV without adding friction.",
      },
    ],
    faqs: [
      {
        q: "How do you know if a conversion problem is on-page or a traffic-quality problem?",
        a: "We look at session-level behavior — where visitors land, how far they scroll, where they drop off — against what the traffic source implied they were looking for. That distinguishes an on-page fix from a targeting problem.",
      },
      {
        q: "Do you redesign the whole site?",
        a: "No — we prioritize the specific page or step causing the most drop-off first, ship a test, and expand from there based on what the data shows.",
      },
      {
        q: "What platforms do you work with?",
        a: "Most of our ecommerce CRO work is on Shopify, though the diagnostic approach applies to any modern ecommerce stack.",
      },
      {
        q: "How long until we see a measurable lift?",
        a: "Most engagements show a measurable conversion lift within four to six weeks of the first shipped fix, since we prioritize the highest-leverage page first.",
      },
    ],
  },
  {
    slug: "ecommerce-acquisition",
    category: "Acquisition",
    navLabel: "Acquisition",
    h1: "Ecommerce Customer Acquisition & Paid Media",
    metaTitle: "Ecommerce Acquisition Agency — Paid Media & Creative Testing",
    metaDescription:
      "Thryve runs paid, organic, and creative-led acquisition for D2C brands — built around a weekly testing cadence, not a single static ad set.",
    eyebrow: "Acquisition",
    intro:
      "Acquisition cost creeps up for a predictable reason: the same handful of ad creatives run for months while performance decays and nobody's testing new angles fast enough to replace them. We rebuild the creative testing pipeline itself, not just the media buying.",
    headlineStat: { value: "-58%", label: "Blended CAC reduction, ten-week engagement" },
    problem: {
      heading: "Why acquisition cost drifts upward over time",
      body: [
        "Ad platforms reward fresh creative. A brand running the same one or two ad concepts for months will see CAC climb even if nothing else about the account changed, simply because the audience has seen the ad too many times.",
        "The fix usually isn't a bigger budget or a new platform — it's a faster, more disciplined creative testing cadence that keeps new concepts entering the account before the existing ones fatigue. Most brands we meet are testing one new concept every few months; the accounts that hold a stable CAC are testing four to six a week.",
        "Cold and warm audiences also need to be budgeted and measured separately. When they're blended together, a strong retargeting number can quietly mask a cold-acquisition problem that's actually getting worse.",
      ],
    },
    chart: {
      unit: "currency",
      note: "Blended CAC, week over week",
      heading: "What a real testing cadence does to CAC",
      caption:
        "Juniper & Oat was spending $40K a month on a single ad set that hadn't changed in five months. A weekly testing cadence cut blended CAC from $54 to $23 in ten weeks.",
      points: [
        { label: "Wk 1", value: 54 },
        { label: "Wk 3", value: 49 },
        { label: "Wk 5", value: 39 },
        { label: "Wk 7", value: 30 },
        { label: "Wk 9", value: 24 },
        { label: "Wk 10", value: 23 },
      ],
    },
    approach: {
      heading: "How an acquisition engagement runs",
      steps: [
        {
          title: "Diagnose whether the account is creative-starved or audience-saturated",
          body: "Rising CAC has different causes — sometimes it's genuine audience saturation, sometimes it's a stale creative rotation. We look at frequency, decay rate, and concept diversity before deciding which problem we're solving.",
        },
        {
          title: "Build a weekly creative testing cadence",
          body: "New concepts enter the account on a set weekly rhythm instead of an occasional refresh, so winners get identified and scaled before the current top performers fatigue.",
        },
        {
          title: "Separate cold and warm budget with dedicated funnels",
          body: "Cold prospecting and retargeting are budgeted and measured separately, so warm-audience performance doesn't mask a cold-acquisition problem.",
        },
        {
          title: "Diversify channels once the primary one saturates",
          body: "When a single account shows signs of genuine saturation rather than creative fatigue, we build out a second channel in parallel with its own attribution — not as a last resort, but as a planned next step.",
        },
      ],
    },
    deliverables: [
      {
        title: "Weekly creative cadence",
        body: "4-6 new ad concepts a week, replacing the occasional refresh most accounts run on — so winners get found and scaled before the current ones fatigue.",
      },
      {
        title: "Dedicated retargeting funnel",
        body: "Separated from cold-audience prospecting spend, so warm-audience performance can never quietly mask a cold-acquisition problem.",
      },
      {
        title: "Blended CAC and ROAS reporting",
        body: "Tied to a documented testing log, so you can see exactly which concept moved which number — not a vague monthly summary.",
      },
      {
        title: "Phased spend-scaling plan",
        body: "Budget only increases into a channel after it proves stable for a defined number of consecutive days — not on optimism.",
      },
    ],
    faqs: [
      {
        q: "How many new ad concepts do you test per week?",
        a: "It depends on account size and budget, but most engagements run 4–6 new concepts weekly rather than one every few months, which is the more common pattern we see when brands come to us.",
      },
      {
        q: "Do you only run Meta ads?",
        a: "No — acquisition work spans paid social, organic, and creative-led channels depending on where a brand's audience actually is, and we build out additional channels once the primary one shows signs of saturation.",
      },
      {
        q: "What if our CAC is already reasonable — is this still relevant?",
        a: "Yes. A healthy CAC today doesn't mean the creative pipeline is resilient to fatigue. The same testing discipline that fixes a rising CAC also protects a healthy one from drifting upward later.",
      },
      {
        q: "How fast can a new brand see results with no existing customer data?",
        a: "Meridian Eyewear launched with an $18K test budget and no prior customer data, and hit a blended $11 CAC within 90 days using a structured concept-testing sprint before committing to a hero creative direction.",
      },
    ],
  },
  {
    slug: "ecommerce-retention",
    category: "Retention",
    navLabel: "Retention",
    h1: "Ecommerce Retention & Lifecycle Marketing",
    metaTitle: "Ecommerce Retention Agency — Lifecycle Marketing for D2C Brands",
    metaDescription:
      "Thryve builds the post-purchase email, SMS, and subscription flows that turn one-time buyers into repeat customers — not a generic newsletter calendar.",
    eyebrow: "Retention",
    intro:
      "Most ecommerce brands have a post-purchase experience that stops at a receipt email. Retention isn't a newsletter calendar — it's a set of flows timed to when a customer is actually likely to reorder, churn, or need a nudge, built on real usage and purchase data instead of fixed send intervals.",
    headlineStat: { value: "+67%", label: "Repeat purchase rate within 90 days" },
    problem: {
      heading: "Why acquisition-only growth is structurally fragile",
      body: [
        "A business where the large majority of monthly revenue comes from new-customer acquisition is exposed to every dip in ad performance — retention isn't a nice-to-have, it's what keeps revenue stable when a channel underperforms for a month.",
        "The common failure mode isn't a lack of email tool — it's that the existing flows are generic and timed to a calendar instead of to actual customer behavior, so they underperform even when they exist. A receipt email and a monthly newsletter are not a retention program.",
        "The fix is usually simpler than brands expect: map when customers actually reorder or churn, and build flows timed to intervene right before that point — not on a fixed weekly or monthly schedule that has nothing to do with real behavior.",
      ],
    },
    chart: {
      unit: "percent",
      note: "90-day repeat purchase rate, month over month",
      heading: "What behavior-timed flows do to repeat purchase rate",
      caption:
        "Birchwell Labs was losing 40% of first-time buyers before a second order. A lifecycle system timed to real usage data lifted 90-day repeat purchase rate 67% in a single quarter.",
      points: [
        { label: "M1", value: 22 },
        { label: "M2", value: 25 },
        { label: "M3", value: 29 },
        { label: "M4", value: 31 },
        { label: "M5", value: 34 },
        { label: "M6", value: 37 },
      ],
    },
    approach: {
      heading: "How a retention engagement runs",
      steps: [
        {
          title: "Map the actual churn and reorder points",
          body: "We look at when customers historically stop buying or churn from a subscription, and build flows timed to intervene before that point — not on a generic weekly or monthly schedule.",
        },
        {
          title: "Build a full post-purchase sequence",
          body: "A structured email and SMS sequence timed to expected product usage, replacing a single receipt email with a real lifecycle program.",
        },
        {
          title: "Reduce default cancellation paths",
          body: "For subscription brands, we introduce skip-not-cancel options and win-back flows triggered at the specific point historical data shows customers drop off.",
        },
        {
          title: "Segment by behavior, not demographics",
          body: "Purchase frequency and product preference drive segmentation, so a high-frequency buyer and a first-time customer never get the same generic campaign.",
        },
      ],
    },
    deliverables: [
      {
        title: "Post-purchase sequence",
        body: "Email and SMS timed to expected product usage, not fixed calendar intervals — replacing a single receipt email with a real lifecycle program.",
      },
      {
        title: "Win-back flow",
        body: "Triggered at the exact point historical data shows your customers actually drop off, not a generic 30- or 60-day timer.",
      },
      {
        title: "Skip-not-cancel flow",
        body: "For subscription brands — a lower-friction alternative to canceling, cutting the default cancellation path without pressure tactics.",
      },
      {
        title: "Behavioral segmentation",
        body: "By purchase frequency and product preference, replacing one-size-fits-all campaigns with messaging that matches where each customer actually is.",
      },
    ],
    faqs: [
      {
        q: "What if we already have Klaviyo or a similar tool set up?",
        a: "Having the tool isn't the same as having the strategy. Most brands we work with already have an ESP — the gap is usually in flow timing, segmentation, and what triggers each message, not the platform itself.",
      },
      {
        q: "Does this apply to non-subscription DTC brands?",
        a: "Yes. Reorder timing, win-back flows, and post-purchase sequences apply to any repeat-purchase category, not just subscriptions — the triggers are just based on typical reorder windows instead of billing cycles.",
      },
      {
        q: "How is retention measured?",
        a: "Primarily repeat purchase rate within a defined window, subscription churn where applicable, and customer lifetime value — tracked against a documented baseline from before the engagement.",
      },
      {
        q: "How long before retention flows show a measurable impact?",
        a: "Most engagements see a measurable lift in repeat purchase rate within the first full quarter, since flows need at least one reorder cycle to show their real effect.",
      },
    ],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((s) => s.slug === slug);
}
