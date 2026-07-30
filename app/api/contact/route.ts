import { NextResponse } from "next/server";

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const labels: Record<string, string> = {
  company: "Yritys",
  businessId: "Y-tunnus",
  name: "Nimi / yhteyshenkilö",
  email: "Sähköposti",
  phone: "Puhelin",
  spaceType: "Tilatyyppi",
  areaNeed: "Tarvittava pinta-ala",
  preferredLocation: "Toivottu sijainti",
  startDate: "Aloitusajankohta",
  property: "Haettava kohde",
  occupants: "Asukkaiden määrä",
  moveInDate: "Toivottu muuttopäivä",
  rentalDuration: "Arvioitu asumisen kesto",
  pets: "Lemmikit",
  smoking: "Tupakointi",
  message: "Lisätiedot",
  privacyConsent: "Tietojen käsittely hyväksytty",
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = clean(body.name, 100);
    const email = clean(body.email, 180);
    const phone = clean(body.phone, 40);
    const message = clean(body.message, 3000);
    const subject = clean(body.subject, 160) || "Yhteydenotto verkkosivulta";
    const website = clean(body.website, 100);
    const privacyConsent = clean(body.privacyConsent, 40);
    const startedAt = Number(body.startedAt || 0);

    if (website) return NextResponse.json({ message: "Lomakkeen lähetys epäonnistui." }, { status: 400 });
    if (!name || !email || !phone || !message || !email.includes("@")) {
      return NextResponse.json({ message: "Täytä pakolliset yhteystiedot ja lisätiedot." }, { status: 400 });
    }
    if (!privacyConsent) return NextResponse.json({ message: "Hyväksy tietojen käsittely ennen lähettämistä." }, { status: 400 });
    if (!startedAt || Date.now() - startedAt < 1000) {
      return NextResponse.json({ message: "Lomake lähetettiin liian nopeasti." }, { status: 429 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL || "jari.koskela@jkpgroup.fi";
    if (!apiKey || !from) {
      return NextResponse.json({ message: "Viestipalvelua ei ole vielä otettu käyttöön. Lähetä viesti suoraan sähköpostilla." }, { status: 503 });
    }

    const ignoredKeys = new Set(["subject", "website", "startedAt"]);
    const lines = Object.entries(body)
      .filter(([key]) => !ignoredKeys.has(key))
      .map(([key, value]) => {
        const cleaned = clean(value, key === "message" ? 3000 : 300);
        return `${labels[key] || key}: ${cleaned || "-"}`;
      });

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `${subject}: ${name}`,
        text: lines.join("\n"),
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Lomakkeen lähetys epäonnistui. Yritä myöhemmin uudelleen." }, { status: 502 });
    }
    return NextResponse.json({ message: "Tiedot lähetetty." });
  } catch {
    return NextResponse.json({ message: "Virheellinen lomakepyyntö." }, { status: 400 });
  }
}
