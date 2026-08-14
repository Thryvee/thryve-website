import { NextResponse } from "next/server";
import { isValidEmail, saveLead } from "@/lib/leads";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, name, company, goal, brandName, website, niche, hpField } = body as {
    email?: unknown;
    name?: unknown;
    company?: unknown;
    goal?: unknown;
    brandName?: unknown;
    website?: unknown;
    niche?: unknown;
    hpField?: unknown;
  };

  // Honeypot: real users never fill this hidden field.
  if (typeof hpField === "string" && hpField.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  await saveLead({
    source: "booking-intake",
    email,
    name: typeof name === "string" ? name.slice(0, 200) : undefined,
    company: typeof company === "string" ? company.slice(0, 200) : undefined,
    goal: typeof goal === "string" ? goal.slice(0, 1000) : undefined,
    brandName: typeof brandName === "string" ? brandName.slice(0, 200) : undefined,
    website: typeof website === "string" ? website.slice(0, 300) : undefined,
    niche: typeof niche === "string" ? niche.slice(0, 200) : undefined,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
