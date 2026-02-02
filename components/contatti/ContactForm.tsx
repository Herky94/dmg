"use client";

import { useState } from "react";

interface FormDataState {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  company: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
  requestType: string;
  message: string;
  privacy: boolean;
}

interface ContactFormProps {
  labels: {
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    company: string;
    jobTitle: string;
    phone: string;
    email: string;
    website: string;
    requestType: string;
    message: string;
    selectRequest: string;
  };
  requestTypes: {
    business: string;
    distribution: string;
    development: string;
    partnership: string;
    consultation: string;
    employment: string;
    information: string;
    other: string;
  };
  sendLabel?: string;
  sendingLabel?: string;
  successMessage?: string;
  privacyRequired?: string;
  privacyText?: string;
  locale?: string;
  className?: string;
  paddingTop?: string;
  paddingBottom?: string;
}

export default function ContactForm({
  labels,
  requestTypes,
  sendLabel = "Invia",
  sendingLabel = "Invio in corso...",
  successMessage = "Messaggio inviato con successo!",
  privacyRequired = "Devi accettare la privacy policy per continuare.",
  privacyText = "Ho letto la Privacy Policy e accetto il trattamento dei dati personali",
  locale = "it",
  className = "",
  paddingTop = "pt-[100px]",
  paddingBottom = "pb-[50px]",
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormDataState>({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    company: "",
    jobTitle: "",
    phone: "",
    email: "",
    website: "",
    requestType: "",
    message: "",
    privacy: false,
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacy) {
      alert(privacyRequired);
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, locale }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          address: "",
          postalCode: "",
          city: "",
          country: "",
          company: "",
          jobTitle: "",
          phone: "",
          email: "",
          website: "",
          requestType: "",
          message: "",
          privacy: false,
        });
        alert(successMessage);
      } else {
        setStatus("error");
        alert("Errore durante l'invio del messaggio.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      alert("Errore durante l'invio del messaggio.");
    }
  };

  const requestTypesArray = [
    { value: "business", label: requestTypes.business },
    { value: "distribution", label: requestTypes.distribution },
    { value: "development", label: requestTypes.development },
    { value: "partnership", label: requestTypes.partnership },
    { value: "consultation", label: requestTypes.consultation },
    { value: "employment", label: requestTypes.employment },
    { value: "information", label: requestTypes.information },
    { value: "other", label: requestTypes.other },
  ];

  return (
    <section className={`bg-white ${paddingTop} ${paddingBottom} ${className}`}>
      <div className="container-dmg">
        <div className="rounded-[30px] overflow-hidden shadow-2xl bg-white p-8 lg:p-20">
          <div className="w-full max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
              {/* Nome e Cognome - side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-[30px]">
                <input
                  type="text"
                  name="firstName"
                  placeholder={`${labels.firstName}*`}
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder={`${labels.lastName}*`}
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                  required
                />
              </div>

              {/* Email e Phone - side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-[30px]">
                <input
                  type="email"
                  name="email"
                  placeholder={`${labels.email}*`}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={labels.phone}
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[0-9+\s\-()]*"
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                />
              </div>

              {/* Company e Job Title - side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-[30px]">
                <input
                  type="text"
                  name="company"
                  placeholder={labels.company}
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                />
                <input
                  type="text"
                  name="jobTitle"
                  placeholder={labels.jobTitle}
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                />
              </div>

              {/* Address */}
              <div className="mb-[30px]">
                <input
                  type="text"
                  name="address"
                  placeholder={labels.address}
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                />
              </div>

              {/* City, Postal Code, Country - three columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-[30px]">
                <input
                  type="text"
                  name="city"
                  placeholder={`${labels.city}*`}
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                  required
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder={labels.postalCode}
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                />
                <input
                  type="text"
                  name="country"
                  placeholder={`${labels.country}*`}
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                  required
                />
              </div>

              {/* Website */}
              <div className="mb-[50px]">
                <input
                  type="url"
                  name="website"
                  placeholder={labels.website}
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] pl-[15px] pb-[25px]"
                />
              </div>

              {/* Request Type Dropdown */}
              <div className="mb-[50px]">
                <div className="w-full border-b border-gray-300 text-[#929292] pl-[15px] pb-[25px]">
                  {labels.requestType}*
                </div>

                <div className="relative mt-[20px]">
                  <div
                    className="w-full bg-[#F2F2F2] rounded-[20px] px-6 py-4 cursor-pointer flex justify-between items-center"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span
                      className={`text-base select-none ${
                        formData.requestType ? "text-black" : "text-[#929292]"
                      }`}
                    >
                      {formData.requestType
                        ? requestTypesArray.find(
                            (r) => r.value === formData.requestType,
                          )?.label
                        : labels.selectRequest}
                    </span>
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

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-[#F2F2F2] rounded-[20px] p-4 z-20 flex flex-col gap-1 shadow-lg">
                      {requestTypesArray.map((req) => (
                        <div
                          key={req.value}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              requestType: req.value,
                            }));
                            setIsDropdownOpen(false);
                          }}
                          className={`px-4 py-3 rounded-[20px] cursor-pointer text-sm font-medium transition-all duration-200 select-none ${
                            formData.requestType === req.value
                              ? "bg-[#C34069] text-white shadow-md"
                              : "text-[#929292] hover:bg-white hover:text-[#C34069]"
                          }`}
                        >
                          {req.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="mb-[50px]">
                <textarea
                  name="message"
                  placeholder={`${labels.message}*`}
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-transparent border border-gray-300 rounded-[15px] focus:outline-none focus:border-[#C34069] transition-colors text-black placeholder-[#929292] p-[15px] resize-none"
                  required
                />
              </div>

              {/* Privacy Checkbox */}
              <div className="mb-[40px]">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative mt-1">
                    <input
                      type="checkbox"
                      name="privacy"
                      checked={formData.privacy}
                      onChange={handleChange}
                      className="sr-only"
                      required
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
                  <span className="text-base text-[#929292] leading-tight max-w-[400px]">
                    {privacyText
                      .split("Privacy Policy")
                      .map((part, index, array) =>
                        index < array.length - 1 ? (
                          <>
                            {part}
                            <a
                              href="#"
                              className="underline hover:text-[#C34069]"
                            >
                              Privacy Policy
                            </a>
                          </>
                        ) : (
                          part
                        ),
                      )}
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
                  {status === "loading" ? sendingLabel : sendLabel}
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
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
