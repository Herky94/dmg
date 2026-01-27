"use client";

import { useState } from "react";
import Image from "next/image";

interface FormDataState {
  tipoSegnalazione: string;
  richiesta: string;
  altro: string;
  nome: string;
  cognome: string;
  email: string;
  nomeFarmaco: string;
  lottoDisponibile: string;
  dataInizio: string;
  dataFine: string;
  descrizione: string;
  privacy: boolean;
  consenso: boolean;
}

interface FarmacovigilanzaFormProps {
  sendLabel?: string;
  sendingLabel?: string;
  sentLabel?: string;
  successMessage?: string;
  declarationsRequired?: string;
}

export default function FarmacovigilanzaForm({
  sendLabel = "Invia",
  sendingLabel = "Invio...",
  sentLabel = "Inviato!",
  successMessage = "Segnalazione inviata con successo!",
  declarationsRequired = "Devi accettare entrambe le dichiarazioni per continuare.",
}: FarmacovigilanzaFormProps = {}) {
  const [formData, setFormData] = useState<FormDataState>({
    tipoSegnalazione: "segnalazione",
    richiesta: "",
    altro: "",
    nome: "",
    cognome: "",
    email: "",
    nomeFarmaco: "",
    lottoDisponibile: "",
    dataInizio: "",
    dataFine: "",
    descrizione: "",
    privacy: false,
    consenso: false,
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRadioChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    if (!formData.privacy || !formData.consenso) {
      alert(declarationsRequired);
      setStatus("idle");
      return;
    }

    // Simulate API call
    try {
      // const res = await fetch("/api/farmacovigilanza", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      // if (res.ok) {
      //   setStatus("success");
      //   // Reset form
      // }

      // For now, simulate success
      setTimeout(() => {
        setStatus("success");
        setFormData({
          tipoSegnalazione: "segnalazione",
          richiesta: "",
          altro: "",
          nome: "",
          cognome: "",
          email: "",
          nomeFarmaco: "",
          lottoDisponibile: "",
          dataInizio: "",
          dataFine: "",
          descrizione: "",
          privacy: false,
          consenso: false,
        });
      }, 1000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-white rounded-[30px] p-8 lg:p-[130px] lg:pr-[130px] lg:pb-[70px] lg:pl-[130px] shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left Column */}
        <div>
          <h2 className="text-[28px] lg:text-[33px] font-light text-black mb-[30px]">
            Segnalazione evento avverso
          </h2>

          <p className="text-[14px] lg:text-[17px] text-black/80 leading-relaxed mb-[50px]">
            Per la segnalazione di sospette reazioni avverse (adverse drug
            reaction - adr) da parte degli operatori sanitari o cittadini, è
            possibile{" "}
            <a
              href="https://www.aifa.gov.it/content/segnalazioni-reazioni-avverse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C34069] underline hover:no-underline"
            >
              collegarsi al sito dell'Aifa (Agenzia Italiana del Farmaco).
            </a>
          </p>

          <div>
            <p className="text-[14px] lg:text-[17px] text-black/90 leading-relaxed mb-[25px] font-semibold">
              D.M.G. Italia mette a disposizione i seguenti canali per segnalare
              un evento avverso legato all'impiego di un nostro farmaco:
            </p>

            <div className="space-y-2">
              <p className="text-[14px] lg:text-[20px] text-black flex items-center gap-[10px] font-semibold">
                <Image
                  src="/images/usefull-icons/richieste-segnalazioni.svg"
                  alt="Richieste"
                  width={20}
                  height={20}
                />
                <span className="text-[#C34069] underline">
                  Richieste e Segnalazioni
                </span>
              </p>
              <p className="text-[14px] lg:text-[20px] text-black flex items-center gap-[10px] font-semibold">
                <Image
                  src="/images/usefull-icons/email.svg"
                  alt="Email"
                  width={20}
                  height={20}
                />
                <a
                  href="mailto:farmacovigilanza@dmgit.com"
                  className="text-[#C34069] underline hover:no-underline"
                >
                  farmacovigilanza@dmgit.com
                </a>
              </p>
              <p className="text-[14px] lg:text-[20px] text-black flex items-center gap-[10px] font-semibold">
                <Image
                  src="/images/usefull-icons/phone.svg"
                  alt="Phone"
                  width={20}
                  height={20}
                />
                <a
                  href="tel:3929823266"
                  className="text-[#C34069] underline hover:no-underline"
                >
                  3929823266
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div>
          <form onSubmit={handleSubmit}>
            {/* Tipo di richiesta */}
            <div>
              <label className="text-[#C34069] text-base font-medium block mb-[15px]">
                Tipo di richiesta*
              </label>
              <p className="text-[12px] text-gray-500 mb-[20px]">lorem ipsum</p>
              <div className="space-y-3">
                <label className="flex items-center space-x-[10px] cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="tipoSegnalazione"
                      value="segnalazione"
                      checked={formData.tipoSegnalazione === "segnalazione"}
                      onChange={() =>
                        handleRadioChange("tipoSegnalazione", "segnalazione")
                      }
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 ${
                        formData.tipoSegnalazione === "segnalazione"
                          ? "bg-[#C34069] border-[#C34069]"
                          : "border-gray-400 bg-transparent group-hover:border-[#C34069]"
                      }`}
                    >
                      {formData.tipoSegnalazione === "segnalazione" && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-base text-black group-hover:text-[#C34069] transition-colors">
                    Segnalazione evento avverso
                  </span>
                </label>

                <label className="flex items-center space-x-[10px] cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="tipoSegnalazione"
                      value="richiesta"
                      checked={formData.tipoSegnalazione === "richiesta"}
                      onChange={() =>
                        handleRadioChange("tipoSegnalazione", "richiesta")
                      }
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 ${
                        formData.tipoSegnalazione === "richiesta"
                          ? "bg-[#C34069] border-[#C34069]"
                          : "border-gray-400 bg-transparent group-hover:border-[#C34069]"
                      }`}
                    >
                      {formData.tipoSegnalazione === "richiesta" && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-base text-black group-hover:text-[#C34069] transition-colors">
                    Richiesta di informazioni
                  </span>
                </label>

                <label className="flex items-center space-x-[10px] cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="tipoSegnalazione"
                      value="altro"
                      checked={formData.tipoSegnalazione === "altro"}
                      onChange={() =>
                        handleRadioChange("tipoSegnalazione", "altro")
                      }
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 ${
                        formData.tipoSegnalazione === "altro"
                          ? "bg-[#C34069] border-[#C34069]"
                          : "border-gray-400 bg-transparent group-hover:border-[#C34069]"
                      }`}
                    >
                      {formData.tipoSegnalazione === "altro" && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-base text-black group-hover:text-[#C34069] transition-colors">
                    Altro
                  </span>
                </label>
              </div>
            </div>

            {/* Dati del Segnalatore */}
            <div className="mt-[70px]">
              <label className="text-[#C34069] text-base font-medium block mb-[35px]">
                Dati del Segnalatore*
              </label>

              <div className="space-y-[35px]">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome*"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                  required
                />
                <input
                  type="text"
                  name="cognome"
                  placeholder="Cognome*"
                  value={formData.cognome}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                  required
                />
              </div>
            </div>

            {/* Informazioni sul prodotto */}
            <div className="mt-[70px]">
              <label className="text-[#C34069] text-base font-medium block mb-[15px]">
                Informazioni sul prodotto *
              </label>
              <p className="text-[12px] text-gray-500 mb-[20px]">lorem ipsum</p>

              <div className="space-y-[20px]">
                <input
                  type="text"
                  name="nomeFarmaco"
                  placeholder="Nome del farmaco *"
                  value={formData.nomeFarmaco}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                  required
                />
                <input
                  type="text"
                  name="lottoDisponibile"
                  placeholder="Lotto (se disponibile)"
                  value={formData.lottoDisponibile}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                />
                <input
                  type="text"
                  name="dataInizio"
                  placeholder="Data di inizio assunzione"
                  value={formData.dataInizio}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                />
                <input
                  type="text"
                  name="dataFine"
                  placeholder="Data di fine assunzione (se conclusa)"
                  value={formData.dataFine}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                />
              </div>
            </div>

            {/* Descrizione dettagliata */}
            <div className="mt-[70px]">
              <label className="text-[#C34069] text-base font-medium block mb-[15px]">
                Descrizione dettagliata *
              </label>
              <p className="text-[12px] text-gray-500 mb-[20px]">
                (Sintomi, tempistica, eventuali terapie concomitanti, esito
                dell'evento, ecc.)
              </p>

              <textarea
                name="descrizione"
                placeholder="Descrivici in modo chiaro l'evento o la richiesta"
                value={formData.descrizione}
                onChange={handleChange}
                rows={1}
                className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px] resize-y"
                required
              ></textarea>
            </div>

            {/* Privacy Checkboxes */}
            <div className="space-y-[25px] mt-[60px]">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      formData.privacy
                        ? "bg-[#C34069] border-[#C34069]"
                        : "bg-[#F5F5F5] border-transparent"
                    }`}
                  >
                    {formData.privacy && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-base text-[#929292] leading-tight">
                  Dichiaro di aver letto l'informativa Privacy e autorizzo il
                  trattamento dei dati personali ai sensi del Reg. UE n. 679 del
                  2016.
                </span>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer group">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    name="consenso"
                    checked={formData.consenso}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      formData.consenso
                        ? "bg-[#C34069] border-[#C34069]"
                        : "bg-[#F5F5F5] border-transparent"
                    }`}
                  >
                    {formData.consenso && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-base text-[#929292] leading-tight">
                  Dichiaro che le informazioni fornite sono corrette e complete
                  al meglio delle mie conoscenze.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-start mt-[40px]">
              <button
                type="submit"
                disabled={status === "loading"}
                className="group flex items-center justify-center gap-2 bg-[#F2D7E0] hover:bg-[#C34069] text-[#C34069] hover:text-white w-[175px] py-[10px] rounded-[40px] text-sm font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading"
                  ? sendingLabel
                  : status === "success"
                    ? sentLabel
                    : sendLabel}
                {status !== "loading" && (
                  <div className="bg-[#C34069] group-hover:bg-white rounded-full w-6 h-6 flex items-center justify-center transition-colors duration-300">
                    <svg
                      className="w-3 h-3 text-white group-hover:text-[#C34069] transform transition-transform duration-300 group-hover:rotate-45"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </div>

            {status === "success" && (
              <p className="text-green-600 text-sm mt-4">{successMessage}</p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-sm mt-4">
                Errore nell'invio. Riprova.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
