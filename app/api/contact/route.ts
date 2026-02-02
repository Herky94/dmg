import { NextResponse } from "next/server";
import { transporter, mailOptions } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      address,
      postalCode,
      city,
      country,
      company,
      jobTitle,
      phone,
      email,
      website,
      requestType,
      message,
      privacy,
      locale, // IT o EN
    } = body;

    // Validazione base
    if (!firstName || !lastName || !city || !country || !email || !message) {
      return NextResponse.json(
        { error: "Campi obbligatori mancanti" },
        { status: 400 },
      );
    }

    if (!privacy) {
      return NextResponse.json(
        { error: "Devi accettare la privacy policy" },
        { status: 400 },
      );
    }

    // Lingua del form
    const languageLabel = locale === "en" ? "🇬🇧 English" : "🇮🇹 Italiano";

    // Mappa dei tipi di richiesta
    const requestTypeLabels: Record<string, string> = {
      business: "Business",
      distribution: "Distribuzione",
      development: "Sviluppo",
      partnership: "Partnership",
      consultation: "Consulenza",
      employment: "Lavoro",
      information: "Informazioni",
      other: "Altro",
    };

    const requestTypeLabel = requestTypeLabels[requestType] || requestType;

    await transporter.sendMail({
      ...mailOptions,
      subject: `[Contatti] ${requestTypeLabel} - ${firstName} ${lastName} [${languageLabel}]`,
      text: `
RICHIESTA DI CONTATTO
=====================
Lingua del form: ${languageLabel}
Tipo di richiesta: ${requestTypeLabel}

DATI DEL RICHIEDENTE
--------------------
Nome: ${firstName}
Cognome: ${lastName}
Email: ${email}
Telefono: ${phone || "Non specificato"}
${address ? `Indirizzo: ${address}` : ""}
${postalCode ? `CAP: ${postalCode}` : ""}
Città: ${city}
Nazione: ${country}
${company ? `Azienda: ${company}` : ""}
${jobTitle ? `Ruolo: ${jobTitle}` : ""}
${website ? `Sito web: ${website}` : ""}

MESSAGGIO
---------
${message}

---
Consenso privacy: ✓
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: ${locale === "en" ? "#1e3a5f" : "#C34069"}; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">Richiesta di Contatto</h2>
            <p style="margin: 5px 0 0 0; font-size: 14px;">${languageLabel} | ${requestTypeLabel}</p>
          </div>
          
          <div style="padding: 20px;">
            <h3 style="color: #C34069; border-bottom: 2px solid #C34069; padding-bottom: 10px;">Dati del Richiedente</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0;"><strong>Nome:</strong></td>
                <td style="padding: 8px 0;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${phone ? `<tr><td style="padding: 8px 0;"><strong>Telefono:</strong></td><td style="padding: 8px 0;">${phone}</td></tr>` : ""}
              ${address ? `<tr><td style="padding: 8px 0;"><strong>Indirizzo:</strong></td><td style="padding: 8px 0;">${address}</td></tr>` : ""}
              ${postalCode ? `<tr><td style="padding: 8px 0;"><strong>CAP:</strong></td><td style="padding: 8px 0;">${postalCode}</td></tr>` : ""}
              <tr>
                <td style="padding: 8px 0;"><strong>Città:</strong></td>
                <td style="padding: 8px 0;">${city}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Nazione:</strong></td>
                <td style="padding: 8px 0;">${country}</td>
              </tr>
              ${company ? `<tr><td style="padding: 8px 0;"><strong>Azienda:</strong></td><td style="padding: 8px 0;">${company}</td></tr>` : ""}
              ${jobTitle ? `<tr><td style="padding: 8px 0;"><strong>Ruolo:</strong></td><td style="padding: 8px 0;">${jobTitle}</td></tr>` : ""}
              ${website ? `<tr><td style="padding: 8px 0;"><strong>Sito web:</strong></td><td style="padding: 8px 0;"><a href="${website}">${website}</a></td></tr>` : ""}
            </table>
          </div>

          <div style="padding: 20px; background-color: #f5f5f5;">
            <h3 style="color: #C34069; border-bottom: 2px solid #C34069; padding-bottom: 10px;">Messaggio</h3>
            <p style="white-space: pre-line;">${message.replace(/\n/g, "<br>")}</p>
          </div>

          <div style="padding: 15px; background-color: #e8f5e9; border-left: 4px solid #4caf50; margin: 20px;">
            <p style="margin: 0; font-size: 12px;">✓ Consenso privacy fornito</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Messaggio inviato con successo" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Errore durante l'invio del messaggio" },
      { status: 500 },
    );
  }
}
