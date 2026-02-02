"use client";

import Image from "next/image";

interface MdrRegulationSectionProps {
  paragraph1?: string;
  paragraph2?: string;
  listItem1?: string;
  listItem2?: string;
  paragraph3?: string;
}

export default function MdrRegulationSection({
  paragraph1 = "Il nuovo Regolamento dei Dispositivi Medici (MDR) 2017/745, che sostituisce la Direttiva (MDD) 93/42/EEC, è entrato in vigore il 5 maggio 2017. A partire dal 26 maggio 2021, i nuovi dispositivi medici immessi sul mercato devono rispettare i requisiti dell'MDR, mentre i dispositivi medici precedentemente certificati ai sensi della Direttiva, hanno ottenuto una proroga della validità dei loro Certificati fino al 27 maggio 2024. Con il Regolamento (EU) 2023/607 del Parlamento Europeo e del Consiglio del 15 marzo 2023, è stata concessa una proroga del periodo di transizione, che introduce specifiche condizioni secondo le quali i certificati emessi dagli Organismi Notificati ai sensi della MDD e che rispettino le condizioni del Regolamento UE 2023/607 resteranno in vigore fino a:",
  listItem1 = "a) 31 dicembre 2027, per tutti i dispositivi della classe III e per i dispositivi impiantabili della classe IIb, salvo specifiche;",
  listItem2 = "b) 31 dicembre 2028, per i dispositivi della classe IIb diversi da quelli di cui alla lettera a) del presente paragrafo, per i dispositivi della classe IIa e per i dispositivi della classe I immessi sul mercato in condizioni di sterilità o con funzione di misura.",
  paragraph3 = "D.M.G. ITALIA, in qualità di Legal Manufacturer, garantisce la conformità dei propri Dispositivi Medici secondo quanto previsto sia dalla Direttiva sia dal Regolamento Europeo.",
}: MdrRegulationSectionProps = {}) {
  return (
    <section className="bg-white py-[80px]">
      <div className="container-dmg">
        <div className="max-w-full">
          {/* Text */}
          <div className="text-[15px] lg:text-[20px] font-extralight text-black leading-relaxed space-y-8">
            <p>{paragraph1}</p>

            <ul className="space-y-4">
              <li>{listItem1}</li>
              <li>{listItem2}</li>
            </ul>

            <p>{paragraph3}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
