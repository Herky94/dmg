"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getAPIURL } from "@/lib/strapi";

interface FormDataState {
  nome: string;
  cognome: string;
  email: string;
  cellulare: string;
  tipoCandidatura: string;
  posizione: string;
  privacy: boolean;
  lettera: string;
  cv: File | null;
}

interface JobApplicationFormProps {
  jobInfo?: {
    title: string;
    type: string;
    description: string;
    modalita?: string;
  };
  className?: string;
  paddingTop?: string;
  paddingBottom?: string;
  applyLabel?: string;
  sendingLabel?: string;
  successMessage?: string;
  privacyRequired?: string;
  cvRequired?: string;
  locale?: string;
  labels?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    applicationLabel?: string;
    specificPosition?: string;
    spontaneousApplication?: string;
    positionLabel?: string;
    loadingPositions?: string;
    selectPosition?: string;
    uploadCv?: string;
    uploadCvHint?: string;
    coverLetter?: string;
    privacyText?: string;
    modalita?: string;
    errorMissingFields?: string;
  };
}

export default function JobApplicationForm({
  jobInfo,
  className = "",
  paddingTop = "pt-[100px]",
  paddingBottom = "pb-[50px]",
  applyLabel = "Candidati",
  sendingLabel = "Invio in corso...",
  successMessage = "Candidatura inviata con successo!",
  privacyRequired = "Devi accettare la privacy policy per continuare.",
  cvRequired = "Il CV è obbligatorio.",
  locale = "it",
  labels = {},
}: JobApplicationFormProps) {
  // Default labels with fallbacks
  const formLabels = {
    firstName: labels.firstName || "Nome",
    lastName: labels.lastName || "Cognome",
    email: labels.email || "Email",
    phone: labels.phone || "Numero di cellulare",
    applicationLabel: labels.applicationLabel || "Candidatura",
    specificPosition:
      labels.specificPosition || "Mi candido per una posizione specifica",
    spontaneousApplication: labels.spontaneousApplication || "Autocandidatura",
    positionLabel: labels.positionLabel || "Posizione",
    loadingPositions: labels.loadingPositions || "Caricamento posizioni...",
    selectPosition: labels.selectPosition || "Seleziona posizione",
    uploadCv: labels.uploadCv || "Allega CV",
    uploadCvHint: labels.uploadCvHint || "Fai click o trascina i file qui",
    coverLetter: labels.coverLetter || "Lettera di presentazione",
    privacyText:
      labels.privacyText ||
      "Ho letto la Privacy Policy e accetto il trattamento dei dati personali, in conformità alla dichiarazione sulla protezione dei dati",
    modalita: labels.modalita || "Modalità",
    errorMissingFields: labels.errorMissingFields || "Errore o campi mancanti.",
  };

  const [formData, setFormData] = useState<FormDataState>({
    nome: "",
    cognome: "",
    email: "",
    cellulare: "",
    tipoCandidatura: "specifica", // 'specifica' or 'spontanea'
    posizione: jobInfo ? jobInfo.title : "",
    privacy: false,
    lettera: "",
    cv: null,
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [posizioni, setPosizioni] = useState<string[]>([]);
  const [loadingPositions, setLoadingPositions] = useState(true);

  // Fetch posizioni from Strapi based on locale
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const isEN = locale === "en";
        const endpoint = isEN
          ? "posizioni-lavorative-en"
          : "posizioni-lavorative";
        const activeFilter = isEN
          ? "filters[Active][$eq]=true"
          : "filters[Attiva][$eq]=true";
        const res = await fetch(getAPIURL(`${endpoint}?${activeFilter}`));
        const data = await res.json();
        // IT uses TitoloPosizione, EN uses JobTitle
        const titles =
          data.data?.map((pos: any) => pos.JobTitle ?? pos.TitoloPosizione) ||
          [];
        setPosizioni(titles);
      } catch (error) {
        console.error("Error fetching positions:", error);
        setPosizioni([]);
      } finally {
        setLoadingPositions(false);
      }
    };

    fetchPositions();
  }, [locale]);

  const handleSelectPosizione = (value: string) => {
    setFormData((prev) => ({ ...prev, posizione: value }));
    setIsDropdownOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    // Handle checkbox separately
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, tipoCandidatura: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, cv: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    if (!formData.privacy) {
      alert(privacyRequired);
      setStatus("idle");
      return;
    }

    if (!formData.cv && formData.tipoCandidatura === "specifica") {
      alert(cvRequired);
      setStatus("idle");
      return;
    }

    const data = new FormData();
    data.append("nome", formData.nome);
    data.append("cognome", formData.cognome);
    data.append("email", formData.email);
    data.append("cellulare", formData.cellulare);
    data.append("tipoCandidatura", formData.tipoCandidatura);
    data.append("posizione", formData.posizione);
    data.append("message", formData.lettera); // Changed from lettera to message to match API
    data.append("locale", locale);
    if (formData.cv) {
      data.append("cv", formData.cv);
    }

    try {
      const res = await fetch("/api/candidatura", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          nome: "",
          cognome: "",
          cellulare: "",
          email: "",
          tipoCandidatura: "specifica",
          posizione: "",
          privacy: false,
          lettera: "",
          cv: null,
        });
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Errore durante l'invio della candidatura");
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      alert("Errore di connessione");
      setStatus("error");
    }
  };

  return (
    <section
      className={`bg-[#DFDFDF] ${paddingTop} ${paddingBottom} ${className}`}
    >
      <div className="container-dmg">
        <div className="flex flex-col lg:flex-row min-h-[800px] rounded-[30px] overflow-hidden shadow-2xl">
          {/* Left Sidebar - Black Background or Job Info */}
          <div
            className={`w-full lg:w-1/3 p-10 lg:p-20 flex flex-col justify-start overflow-y-auto text-white relative ${
              jobInfo ? "bg-[#C34069]" : "bg-black"
            }`}
          >
            {!jobInfo && (
              <Image
                src="/images/form-foto.webp"
                alt="Form background"
                fill
                className="object-cover absolute inset-0"
                quality={100}
              />
            )}
            {jobInfo ? (
              <div className="flex flex-col">
                <h2 className="text-[40px] font-medium leading-tight mb-2 text-white">
                  {jobInfo.title}
                </h2>
                <span className="text-white/80 text-lg font-normal mb-4 block">
                  {jobInfo.type}
                </span>

                {jobInfo.modalita && (
                  <div className="mb-6">
                    <span className="text-white/60 text-sm">Modalità:</span>
                    <p className="text-white font-light">{jobInfo.modalita}</p>
                  </div>
                )}

                <p className="text-white text-lg font-light leading-relaxed mb-6">
                  {jobInfo.description}
                </p>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center relative z-10">
                {/* Default decorative content could go here */}
              </div>
            )}
          </div>

          {/* Right Content - Form */}
          <div className="w-full lg:w-2/3 bg-white p-8 lg:p-20 flex items-center">
            <div className="w-full max-w-2xl mx-auto">
              <form onSubmit={handleSubmit}>
                {/* Nome */}
                <div className="mb-[30px]">
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder={`${formLabels.firstName}*`}
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                    required
                  />
                </div>

                {/* Cognome */}
                <div className="mb-[30px]">
                  <input
                    type="text"
                    id="cognome"
                    name="cognome"
                    placeholder={`${formLabels.lastName}*`}
                    value={formData.cognome}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-[30px]">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={`${formLabels.email}*`}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                    required
                  />
                </div>

                {/* Cellulare */}
                <div className="mb-[50px]">
                  <input
                    type="tel"
                    id="cellulare"
                    name="cellulare"
                    placeholder={`${formLabels.phone}*`}
                    value={formData.cellulare}
                    onChange={handleChange}
                    pattern="[0-9+\s\-()]*"
                    className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                    required
                  />
                </div>

                {/* Candidatura */}
                <div className="space-y-4 mb-[30px]">
                  <label className="text-[#C34069] text-base font-medium block mb-[25px]">
                    {formLabels.applicationLabel}*
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-[10px] cursor-pointer group">
                      <div className="relative">
                        <input
                          type="radio"
                          name="tipoCandidatura"
                          value="specifica"
                          checked={formData.tipoCandidatura === "specifica"}
                          onChange={() => handleRadioChange("specifica")}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 ${
                            formData.tipoCandidatura === "specifica"
                              ? "bg-[#C34069] border-[#C34069]"
                              : "border-gray-400 bg-transparent group-hover:border-[#C34069]"
                          }`}
                        >
                          {formData.tipoCandidatura === "specifica" && (
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
                        {formLabels.specificPosition}
                      </span>
                    </label>

                    <label className="flex items-center space-x-[10px] cursor-pointer group">
                      <div className="relative">
                        <input
                          type="radio"
                          name="tipoCandidatura"
                          value="spontanea"
                          checked={formData.tipoCandidatura === "spontanea"}
                          onChange={() => handleRadioChange("spontanea")}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 ${
                            formData.tipoCandidatura === "spontanea"
                              ? "bg-[#C34069] border-[#C34069]"
                              : "border-gray-400 bg-transparent group-hover:border-[#C34069]"
                          }`}
                        >
                          {formData.tipoCandidatura === "spontanea" && (
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
                        {formLabels.spontaneousApplication}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Posizione Dropdown (Only if specific) */}
                {formData.tipoCandidatura === "specifica" && (
                  <div className="mt-[50px] mb-[50px]">
                    {/* Label "Posizione*" styled like empty input */}
                    <div className="w-full border-b border-gray-300 text-[#929292] pl-[15px] pb-[25px]">
                      {formLabels.positionLabel}*
                    </div>

                    {/* Dropdown Container with 20px margin from label */}
                    <div className="relative mt-[20px]">
                      <div
                        className="w-full bg-[#F2F2F2] rounded-[20px] px-6 py-4 cursor-pointer flex justify-between items-center"
                        onClick={() =>
                          !loadingPositions &&
                          setIsDropdownOpen(!isDropdownOpen)
                        }
                      >
                        <span
                          className={`text-base select-none ${
                            formData.posizione ? "text-black" : "text-[#929292]"
                          }`}
                        >
                          {loadingPositions
                            ? formLabels.loadingPositions
                            : formData.posizione || formLabels.selectPosition}
                        </span>
                        {/* Chevron Arrow */}
                        <svg
                          className={`w-4 h-4 text-gray-500 transform transition-transform duration-300 ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>

                      {/* Custom Dropdown Panel */}
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-[#F2F2F2] rounded-[20px] p-4 z-20 flex flex-col gap-1 shadow-lg">
                          {posizioni.map((pos) => (
                            <div
                              key={pos}
                              onClick={() => handleSelectPosizione(pos)}
                              className={`px-4 py-3 rounded-[20px] cursor-pointer text-sm font-medium transition-all duration-200 select-none ${
                                formData.posizione === pos
                                  ? "bg-[#C34069] text-white shadow-md"
                                  : "text-[#929292] hover:bg-white hover:text-[#C34069]"
                              }`}
                            >
                              {pos}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Allega CV */}
                <div className="mb-[50px]">
                  <div className="w-full text-[#929292] pl-[15px]">
                    {formLabels.uploadCv}*
                  </div>
                  <div
                    className="mt-[15px] rounded-[15px] p-8 flex flex-col items-center justify-center bg-[#F5F5F5] cursor-pointer hover:bg-[#eaeaea] transition-all group"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="mb-2 relative w-8 h-8">
                      <Image
                        src="/images/usefull-icons/cv-icon.svg"
                        alt="Upload CV"
                        fill
                        className="object-contain"
                      />
                    </div>
                    {formData.cv ? (
                      <span className="text-sm font-medium text-[#C34069] transition-colors">
                        {formData.cv.name}
                      </span>
                    ) : (
                      <span className="text-xs text-[#929292] group-hover:text-[#C34069] transition-colors">
                        {formLabels.uploadCvHint}
                      </span>
                    )}

                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                    />
                  </div>
                </div>

                {/* Lettera di presentazione */}
                <div className="mb-[50px]">
                  <textarea
                    id="lettera"
                    name="lettera"
                    rows={1}
                    placeholder={formLabels.coverLetter}
                    value={formData.lettera}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px] resize-y"
                  ></textarea>
                </div>

                {/* Privacy Checkbox */}
                <div className="mb-[45px]">
                  <label className="flex items-start gap-4 cursor-pointer group">
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
                    <span className="text-base text-[#929292] leading-tight max-w-[400px]">
                      {formLabels.privacyText}
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group flex items-center justify-center gap-2 bg-[#F2D7E0] hover:bg-[#C34069] text-[#C34069] hover:text-white w-[175px] py-[10px] rounded-[40px] text-sm font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? sendingLabel : applyLabel}
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
                  {status === "success" && (
                    <p className="text-green-600 mt-2 text-sm">
                      {successMessage}
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-red-500 mt-2 text-sm">
                      {formLabels.errorMissingFields}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
