import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal — Thryve",
  description: "Short weekly notes from Sakcham Raj on revenue systems, growth, and the work we do at Thryve.",
};

// Add new entries at the top. Keep each under ~150 words.
const entries = [
  {
    date: "27 Mar 2025",
    title: "Why most D2C brands lose ROAS after Month 2",
    body: "We see the same pattern constantly — a brand launches Meta campaigns, ROAS looks healthy in week one, then starts decaying. The typical culprit is audience overlap: Prospecting, Lookalike, and Retargeting all bidding against each other, inflating CPMs, cannibalising budget. The fix is structural, not creative. Separate campaigns, separate budgets, hard exclusions at every level. It takes two hours to set up correctly and most agencies never do it. That is why we start every Acquire engagement with an architecture audit before touching a single creative.",
  },
  {
    date: "20 Mar 2025",
    title: "The email list that was making ₹0",
    body: "A B2C fitness brand came to us with 12,000 subscribers and zero email revenue. Every founder thinks the list is the problem — too small, wrong audience. It almost never is. The list was fine. There were simply no flows active. We deployed five sequences in week two of the engagement. By month three the list was generating ₹3.8L per month. The cheapest channel most brands completely ignore.",
  },
  {
    date: "13 Mar 2025",
    title: "On the difference between a campaign and a system",
    body: "A campaign runs until the budget is gone. A system compounds. The difference is intentionality — are you running ads to get sales this week, or building infrastructure that makes every future rupee safer to spend? Most brands are stuck in campaign mode. We are always building toward the system. That is why our engagements have a hard end date: by Month 4, you should not need us for day-to-day execution. Independence is the outcome, not continued dependency.",
  },
];

export default function JournalPage() {
  return (
    <>
      <Nav />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "120px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 48px) 120px" }}>

          {/* Header */}
          <div style={{ marginBottom: "80px" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--purple)", display: "block", marginBottom: "16px" }}>
              Journal
            </span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.05, color: "var(--text)", marginBottom: "20px" }}>
              Notes from the work.
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--text-tertiary)", lineHeight: 1.75, maxWidth: "480px" }}>
              Short weekly observations from Sakcham on revenue systems, what we are seeing across client work, and the thinking behind the Thryve approach.
            </p>
          </div>

          {/* Entries */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {entries.map((entry, i) => (
              <article
                key={i}
                style={{
                  padding: "48px 0",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <time style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-tertiary)", display: "block", marginBottom: "14px" }}>
                  {entry.date}
                </time>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--text)", marginBottom: "16px" }}>
                  {entry.title}
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                  {entry.body}
                </p>
              </article>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "48px" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--text-tertiary)", lineHeight: 1.7 }}>
                More entries coming weekly. In the meantime —{" "}
                <Link href="/contact" style={{ color: "var(--purple)", textDecoration: "none", borderBottom: "1px solid var(--purple-mid)" }}>
                  book a free audit
                </Link>
                {" "}or{" "}
                <Link href="/playbook" style={{ color: "var(--purple)", textDecoration: "none", borderBottom: "1px solid var(--purple-mid)" }}>
                  grab the free playbook
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
