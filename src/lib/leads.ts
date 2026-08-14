import { promises as fs } from "fs";
import path from "path";

export type LeadSource = "newsletter" | "lead-magnet" | "booking-intake";

export interface LeadRecord {
  source: LeadSource;
  email: string;
  name?: string;
  company?: string;
  goal?: string;
  brandName?: string;
  website?: string;
  niche?: string;
  createdAt: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value);
}

/**
 * Local JSON fallback store so submissions aren't lost while no ESP is wired up.
 * TODO: replace with a real ESP call (Resend/Loops/Beehiiv/Mailchimp) — see sendToEsp().
 */
const STORE_PATH = path.join(process.cwd(), ".data", "leads.json");

async function readStore(): Promise<LeadRecord[]> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    return JSON.parse(raw) as LeadRecord[];
  } catch {
    return [];
  }
}

async function writeStore(records: LeadRecord[]) {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(records, null, 2), "utf-8");
}

export async function saveLead(record: LeadRecord) {
  const records = await readStore();
  records.push(record);
  await writeStore(records);
  await Promise.all([sendToEsp(record), sendToSheet(record)]);
}

/**
 * TODO: wire this up to your ESP once an account/API key is available, e.g.:
 *
 *   await resend.contacts.create({ email: record.email, audienceId: process.env.RESEND_AUDIENCE_ID });
 *
 * Reads THRYVE_ESP_API_KEY from env so this can go live without further code changes.
 */
async function sendToEsp(record: LeadRecord): Promise<void> {
  if (!process.env.THRYVE_ESP_API_KEY) return;
  void record;
  // Intentionally unimplemented until an ESP is chosen — see TODO above.
}

/**
 * Forwards every lead to the "Main Website Submission" Google Sheet via an
 * Apps Script web app deployment (doPost handler appends a row). Failures
 * here are logged, not thrown — a Sheet outage shouldn't break form UX.
 */
async function sendToSheet(record: LeadRecord): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
  } catch (err) {
    console.error("Failed to forward lead to Google Sheet:", err);
  }
}
