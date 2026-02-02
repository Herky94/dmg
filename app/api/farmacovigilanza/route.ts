import { NextResponse } from "next/server";
import { transporter, mailOptions } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      tipoSegnalazione,
      richiesta,
      altro,
      nome,
      cognome,
      email,
      nomeFarmaco,
      lottoDisponibile,
      dataInizio,
      dataFine,
      descrizione,
      privacy,
      consenso,
      locale, // IT o EN
    } = body;

    // Validazione base
    if (!nome || !cognome || !email || !nomeFarmaco || !descrizione) {
      return NextResponse.json(
        { error: "Campi obbligatori mancanti" },
        { status: 400 },
      );
    }

    if (!privacy || !consenso) {
      return NextResponse.json(
        { error: "Devi accettare le dichiarazioni per continuare" },
        { status: 400 },
      );
    }

    // Determina il tipo di segnalazione in testo
    const tipoSegnalazioneText =
      tipoSegnalazione === "segnalazione"
        ? "Segnalazione evento avverso"
        : tipoSegnalazione === "richiesta"
          ? "Richiesta di informazioni"
          : "Altro";

    // Lingua del form
    const languageLabel = locale === "en" ? "🇬🇧 English" : "🇮🇹 Italiano";

    await transporter.sendMail({
      ...mailOptions,
      to: process.env.SMTP_FARMACOVIGILANZA_EMAIL || mailOptions.to,
      subject: `[Farmacovigilanza] ${tipoSegnalazioneText} - ${nome} ${cognome} [${languageLabel}]`,
      text: `
SEGNALAZIONE FARMACOVIGILANZA
=============================
Lingua del form: ${languageLabel}

Tipo di segnalazione: ${tipoSegnalazioneText}
${richiesta ? `Dettaglio richiesta: ${richiesta}` : ""}
${altro ? `Altro: ${altro}` : ""}

DATI DEL SEGNALATORE
--------------------
Nome: ${nome}
Cognome: ${cognome}
Email: ${email}

INFORMAZIONI SUL PRODOTTO
-------------------------
Nome del farmaco: ${nomeFarmaco}
Lotto: ${lottoDisponibile || "Non specificato"}
Data inizio assunzione: ${dataInizio || "Non specificata"}
Data fine assunzione: ${dataFine || "Non specificata"}

DESCRIZIONE DETTAGLIATA
-----------------------
${descrizione}

---
Consensi: Privacy ✓, Dichiarazione correttezza informazioni ✓
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: ${locale === "en" ? "#1e3a5f" : "#C34069"}; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">Segnalazione Farmacovigilanza</h2>
            <p style="margin: 5px 0 0 0; font-size: 14px;">${languageLabel}</p>
          </div>
          
          <div style="padding: 20px; background-color: #f5f5f5;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Tipo di segnalazione:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${tipoSegnalazioneText}</td>
              </tr>
              ${richiesta ? `<tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Dettaglio:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${richiesta}</td></tr>` : ""}
              ${altro ? `<tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Altro:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${altro}</td></tr>` : ""}
            </table>
          </div>

          <div style="padding: 20px;">
            <h3 style="color: #C34069; border-bottom: 2px solid #C34069; padding-bottom: 10px;">Dati del Segnalatore</h3>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Cognome:</strong> ${cognome}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>

          <div style="padding: 20px; background-color: #f9f9f9;">
            <h3 style="color: #C34069; border-bottom: 2px solid #C34069; padding-bottom: 10px;">Informazioni sul Prodotto</h3>
            <p><strong>Nome del farmaco:</strong> ${nomeFarmaco}</p>
            <p><strong>Lotto:</strong> ${lottoDisponibile || "Non specificato"}</p>
            <p><strong>Data inizio assunzione:</strong> ${dataInizio || "Non specificata"}</p>
            <p><strong>Data fine assunzione:</strong> ${dataFine || "Non specificata"}</p>
          </div>

          <div style="padding: 20px;">
            <h3 style="color: #C34069; border-bottom: 2px solid #C34069; padding-bottom: 10px;">Descrizione Dettagliata</h3>
            <p style="white-space: pre-line;">${descrizione.replace(/\n/g, "<br>")}</p>
          </div>

          <div style="padding: 15px; background-color: #e8f5e9; border-left: 4px solid #4caf50; margin: 20px;">
            <p style="margin: 0; font-size: 12px;">✓ Consenso privacy fornito<br>✓ Dichiarazione correttezza informazioni fornita</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Segnalazione inviata con successo" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing pharmacovigilance form:", error);
    return NextResponse.json(
      { error: "Errore durante l'invio della segnalazione" },
      { status: 500 },
    );
  }
}
