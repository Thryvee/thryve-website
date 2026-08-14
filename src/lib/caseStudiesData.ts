export interface CaseStudy {
  slug: string;
  brand: string;
  category: "Acquisition" | "Conversion" | "Retention" | "Scaling";
  industry: string;
  summary: string;
  headlineMetric: { value: string; label: string };
  stats: { value: string; label: string; context: string }[];
  challenge: string;
  approach: string[];
  result: string;
  timeframe: string;
  testimonial: { quote: string; name: string; role: string };
  /** Time series behind the headline metric, plotted as the modal's hero chart. */
  trend: {
    unit: "currency" | "percent" | "multiplier";
    points: { label: string; value: number }[];
    note: string;
  };
}

export const categoryAccent: Record<CaseStudy["category"], string> = {
  Acquisition: "#a855f7",
  Conversion: "#38bdf8",
  Retention: "#34d399",
  Scaling: "#fb923c",
};

export const categoryGlow: Record<CaseStudy["category"], string> = {
  Acquisition: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
  Conversion: "radial-gradient(circle, rgba(56,189,248,0.4) 0%, transparent 70%)",
  Retention: "radial-gradient(circle, rgba(52,211,153,0.38) 0%, transparent 70%)",
  Scaling: "radial-gradient(circle, rgba(251,146,60,0.4) 0%, transparent 70%)",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "juniper-and-oat",
    brand: "Juniper & Oat",
    category: "Acquisition",
    industry: "Beauty & Skincare",
    summary:
      "A DTC skincare brand stuck at a $54 CAC on Meta rebuilt its creative testing pipeline and cut acquisition cost by more than half.",
    headlineMetric: { value: "-58%", label: "Blended CAC" },
    stats: [
      {
        value: "-58%",
        label: "Blended CAC",
        context: "Dropped from $54 to $23 per acquired customer over the 10-week engagement.",
      },
      {
        value: "3.1x",
        label: "ROAS (from 1.4x)",
        context: "More than doubled return on ad spend without increasing the weekly budget.",
      },
      {
        value: "22",
        label: "Creative concepts tested",
        context: "Up from roughly one new concept every few months before the engagement.",
      },
    ],
    challenge:
      "Juniper & Oat was spending $40K a month on Meta off a single agency-produced ad set that had barely changed in five months. CAC had crept up to $54 against a $62 AOV, leaving almost no margin after fulfillment.",
    approach: [
      "Rebuilt the creative pipeline around a weekly testing cadence — 4-6 new concepts a week instead of one every few months",
      "Shifted spend from polished brand video to UGC-style testimonials and founder-led hooks",
      "Layered in a dedicated retargeting funnel so cold traffic wasn't competing with warm audiences for the same budget",
    ],
    result:
      "Within 10 weeks, blended CAC dropped from $54 to $23 and ROAS climbed from 1.4x to 3.1x. Juniper & Oat put the savings straight into scaling the winning concepts, doubling monthly spend without CAC creeping back up.",
    timeframe: "10 weeks",
    testimonial: {
      quote:
        "We'd tried three agencies before this and all of them just recut the same ad. Thryve actually rebuilt how we test.",
      name: "Devon Ashcroft",
      role: "Founder, Juniper & Oat",
    },
    trend: {
      unit: "currency",
      note: "Blended CAC, week over week",
      points: [
        { label: "Wk 1", value: 54 },
        { label: "Wk 2", value: 52 },
        { label: "Wk 3", value: 49 },
        { label: "Wk 4", value: 45 },
        { label: "Wk 5", value: 39 },
        { label: "Wk 6", value: 35 },
        { label: "Wk 7", value: 30 },
        { label: "Wk 8", value: 27 },
        { label: "Wk 9", value: 24 },
        { label: "Wk 10", value: 23 },
      ],
    },
  },
  {
    slug: "northfield-supply-co",
    brand: "Northfield Supply Co.",
    category: "Conversion",
    industry: "Outdoor & Apparel",
    summary:
      "An outdoor gear brand with strong traffic but a 1.1% conversion rate found the leak was in the product page, not the ad account.",
    headlineMetric: { value: "+142%", label: "Conversion rate" },
    stats: [
      {
        value: "+142%",
        label: "Conversion rate lift",
        context: "Rose from 1.1% to 2.7% across the site within six weeks.",
      },
      {
        value: "-31%",
        label: "Mobile bounce rate",
        context: "Faster checkout and clearer product pages kept more mobile visitors on-site.",
      },
      {
        value: "+19%",
        label: "Average order value",
        context: "Driven almost entirely by the post-add-to-cart bundle upsell.",
      },
    ],
    challenge:
      "Northfield was pulling over 80K sessions a month but converting at just 1.1%, well under the 2.5-3% benchmark for the category. Leadership assumed the problem was traffic quality; the audit found it was almost entirely on-page.",
    approach: [
      "Rebuilt product pages with above-the-fold social proof, a sizing confidence tool, and clearer shipping and return messaging",
      "Cut mobile checkout from 5 steps to 2 and added Shop Pay and PayPal express options",
      "Introduced a post-add-to-cart upsell flow tied to real bundle data instead of generic cross-sells",
    ],
    result:
      "Conversion rate rose from 1.1% to 2.7% in six weeks with no increase in ad spend, and AOV rose 19% from the bundle upsell alone. Northfield recovered its entire quarterly agency fee from the AOV lift alone.",
    timeframe: "6 weeks",
    testimonial: {
      quote:
        "Nobody told us our own product page was the bottleneck until Thryve's audit. Fixed it in six weeks, no new ad spend.",
      name: "Casey Holloman",
      role: "Head of DTC, Northfield Supply Co.",
    },
    trend: {
      unit: "percent",
      note: "Site-wide conversion rate, week over week",
      points: [
        { label: "Wk 1", value: 1.1 },
        { label: "Wk 2", value: 1.3 },
        { label: "Wk 3", value: 1.6 },
        { label: "Wk 4", value: 2.0 },
        { label: "Wk 5", value: 2.4 },
        { label: "Wk 6", value: 2.7 },
      ],
    },
  },
  {
    slug: "birchwell-labs",
    brand: "Birchwell Labs",
    category: "Retention",
    industry: "Health & Wellness",
    summary:
      "A subscription supplement brand losing 40% of first-time buyers before a second order built a lifecycle system that changed the curve.",
    headlineMetric: { value: "+67%", label: "Repeat purchase rate" },
    stats: [
      {
        value: "+67%",
        label: "Repeat purchase rate",
        context: "Measured within 90 days of first purchase, up from the prior baseline.",
      },
      {
        value: "-24%",
        label: "Subscription churn",
        context: "The skip-not-cancel flow alone absorbed most of the drop.",
      },
      {
        value: "2.4x",
        label: "LTV within 6 months",
        context: "More than doubled per-customer lifetime value in two quarters.",
      },
    ],
    challenge:
      "Birchwell had strong first-order conversion but a leaky second purchase: 40% of customers never bought again, and subscribers were churning within two billing cycles. There was no post-purchase email or SMS flow beyond a receipt.",
    approach: [
      "Built a 6-email post-purchase sequence timed to expected product usage, not generic send intervals",
      "Introduced a win-back SMS flow triggered at the exact point historical churn data showed customers dropped off",
      "Added a skip-not-cancel flow to the subscription portal, cutting the default cancellation path",
    ],
    result:
      "Repeat purchase rate within 90 days rose 67%, and subscription churn dropped 24% in the first full quarter. Six-month LTV per customer more than doubled.",
    timeframe: "1 quarter",
    testimonial: {
      quote:
        "We were basically renting customers one order at a time. This is the first quarter LTV has ever gone the right direction.",
      name: "Priya Ramaswami",
      role: "Co-Founder, Birchwell Labs",
    },
    trend: {
      unit: "percent",
      note: "90-day repeat purchase rate, month over month",
      points: [
        { label: "M1", value: 22 },
        { label: "M2", value: 25 },
        { label: "M3", value: 29 },
        { label: "M4", value: 31 },
        { label: "M5", value: 34 },
        { label: "M6", value: 37 },
      ],
    },
  },
  {
    slug: "harlow-and-fern",
    brand: "Harlow & Fern",
    category: "Scaling",
    industry: "Home Goods",
    summary:
      "A profitable home goods brand plateaued at $180K a month, having tried to scale spend twice before and broken even both times — the third attempt worked.",
    headlineMetric: { value: "2.8x", label: "Monthly revenue" },
    stats: [
      {
        value: "2.8x",
        label: "Monthly revenue growth",
        context: "Grew from $180K to over $500K a month within five months.",
      },
      {
        value: "+4",
        label: "New profitable channels",
        context: "Google Shopping, Pinterest, and an affiliate program joined Meta as stable spend.",
      },
      {
        value: "12%",
        label: "Net margin maintained",
        context: "Held steady through the scale-up instead of eroding as spend increased.",
      },
    ],
    challenge:
      "Harlow & Fern had a profitable but single-channel business — 90% of revenue from one Meta ad account. Two prior attempts to scale spend had crashed ROAS and burned budget without ever finding a repeatable second channel.",
    approach: [
      "Diagnosed that the account was saturated at the audience level, not a targeting or creative problem",
      "Built out Google Shopping, Pinterest, and an affiliate program in parallel rather than sequentially, each with its own attribution model",
      "Layered a phased spend-scaling model that only increased budget after a channel proved 14 consecutive stable days",
    ],
    result:
      "Monthly revenue grew from $180K to over $500K within five months, spread across four channels instead of one, while holding net margin at 12% — actually improving Harlow & Fern's cash position during the scale-up.",
    timeframe: "5 months",
    testimonial: {
      quote:
        "The first two times we tried to scale, we just lit money on fire faster. This time it actually held.",
      name: "Marcus Delgado",
      role: "CEO, Harlow & Fern",
    },
    trend: {
      unit: "currency",
      note: "Monthly revenue, in thousands",
      points: [
        { label: "M1", value: 180 },
        { label: "M2", value: 215 },
        { label: "M3", value: 290 },
        { label: "M4", value: 375 },
        { label: "M5", value: 505 },
      ],
    },
  },
  {
    slug: "solstice-eyewear",
    brand: "Solstice Eyewear",
    category: "Acquisition",
    industry: "Fashion & Accessories",
    summary:
      "A new eyewear brand needed to find product-market fit signals fast on a limited launch budget before its seed runway ran out.",
    headlineMetric: { value: "$11", label: "CAC at launch" },
    stats: [
      {
        value: "$11",
        label: "Launch CAC",
        context: "Held to a defensible cost even as spend scaled through the 90-day window.",
      },
      {
        value: "14K",
        label: "Units sold in 90 days",
        context: "From a standing start with no existing customer data to build from.",
      },
      {
        value: "4.2x",
        label: "Blended ROAS",
        context: "Across TikTok and Meta combined, weighted by spend.",
      },
    ],
    challenge:
      "Solstice launched with an $18K test budget and no existing customer data to build from. The founders needed proof of demand fast enough to justify a follow-on funding conversation within 90 days.",
    approach: [
      "Ran a structured concept-testing sprint across TikTok and Meta before committing to a hero creative direction",
      "Used a waitlist-to-launch sequence to build a warm list ahead of the public go-live, seeding early social proof",
      "Prioritized a narrow, high-intent audience over broad reach to keep CAC defensible on a small budget",
    ],
    result:
      "Solstice hit a blended $11 CAC and sold over 14,000 units in the first 90 days, giving the founders a clean growth story for their next funding conversation.",
    timeframe: "90 days",
    testimonial: {
      quote:
        "We had 90 days of runway and no customer data. Thryve got us to $11 CAC before we ran out of either.",
      name: "Talia Nakamura",
      role: "Founder, Solstice Eyewear",
    },
    trend: {
      unit: "multiplier",
      note: "Cumulative units sold, in thousands",
      points: [
        { label: "Day 1", value: 0.4 },
        { label: "Day 15", value: 1.8 },
        { label: "Day 30", value: 3.6 },
        { label: "Day 45", value: 6.1 },
        { label: "Day 60", value: 9.0 },
        { label: "Day 75", value: 11.8 },
        { label: "Day 90", value: 14.2 },
      ],
    },
  },
  {
    slug: "wrenhouse-coffee",
    brand: "Wrenhouse Coffee Roasters",
    category: "Retention",
    industry: "Food & Beverage",
    summary:
      "A specialty coffee subscription brand rebuilt its entire lifecycle program from scratch after realizing 70% of revenue depended on new-customer acquisition alone.",
    headlineMetric: { value: "+81%", label: "Subscriber base" },
    stats: [
      {
        value: "+81%",
        label: "Subscriber base growth",
        context: "Grew over two quarters following the lifecycle program launch.",
      },
      {
        value: "-19%",
        label: "CAC dependency",
        context: "Share of monthly revenue reliant on new-customer acquisition, down from 70%.",
      },
      {
        value: "3.6x",
        label: "Email-attributed revenue",
        context: "Lifecycle segmentation made email a primary revenue channel, not an afterthought.",
      },
    ],
    challenge:
      "Wrenhouse was healthy on paper but structurally fragile — 70% of monthly revenue came from new-customer acquisition, so any dip in ad performance hit revenue immediately. Retention was an afterthought with no dedicated program.",
    approach: [
      "Built a full lifecycle map segmented by roast preference and order frequency instead of one-size-fits-all campaigns",
      "Launched a loyalty tier tied to subscription length, giving long-term subscribers reasons to stay instead of switching to a cheaper competitor",
      "Introduced proactive reorder reminders timed to actual consumption data instead of fixed calendar intervals",
    ],
    result:
      "Subscriber base grew 81% over two quarters, and reliance on new-customer acquisition for revenue dropped from 70% to under 51%, giving the business a far more stable revenue base heading into its next fundraising round.",
    timeframe: "2 quarters",
    testimonial: {
      quote:
        "Every dip in ad performance used to hit our bank account the same week. That link is finally broken.",
      name: "Owen Kessler",
      role: "Operator, Wrenhouse Coffee Roasters",
    },
    trend: {
      unit: "percent",
      note: "Active subscriber base, indexed to Month 1",
      points: [
        { label: "M1", value: 100 },
        { label: "M2", value: 112 },
        { label: "M3", value: 128 },
        { label: "M4", value: 145 },
        { label: "M5", value: 163 },
        { label: "M6", value: 181 },
      ],
    },
  },
];
