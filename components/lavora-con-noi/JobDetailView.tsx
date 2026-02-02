"use client";

import { Header, Footer } from "@/components/layout";
import JobApplicationForm from "@/components/lavora-con-noi/JobApplicationForm";
import EcoMode from "@/components/ui/EcoMode";

interface JobDetailViewProps {
  job: {
    // IT fields
    TitoloPosizione?: string;
    Sottotitolo?: string;
    Descrizione?: string;
    Modalita?: string;
    // EN fields
    JobTitle?: string;
    Subtitle?: string;
    Description?: string;
    WorkMode?: string;
  };
  locale?: string;
  applyLabel?: string;
  sendingLabel?: string;
  successMessage?: string;
  privacyRequired?: string;
  cvRequired?: string;
  formLabels?: {
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

export default function JobDetailView({
  job,
  locale = "it",
  applyLabel,
  sendingLabel,
  successMessage,
  privacyRequired,
  cvRequired,
  formLabels,
}: JobDetailViewProps) {
  // Helper to get field value based on locale
  const getTitle = () => job.JobTitle ?? job.TitoloPosizione ?? "";
  const getSubtitle = () => job.Subtitle ?? job.Sottotitolo ?? "";
  const getDescription = () => job.Description ?? job.Descrizione ?? "";
  const getWorkMode = () => job.WorkMode ?? job.Modalita ?? "";

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Header />

      <div className="">
        <JobApplicationForm
          jobInfo={{
            title: getTitle(),
            type: getSubtitle(),
            description: getDescription(),
            modalita: getWorkMode(),
          }}
          paddingTop="pt-[120px]"
          paddingBottom="pb-[55px]"
          className="bg-[#F5F5F5]"
          applyLabel={applyLabel}
          sendingLabel={sendingLabel}
          successMessage={successMessage}
          privacyRequired={privacyRequired}
          cvRequired={cvRequired}
          locale={locale}
          labels={formLabels}
        />
      </div>

      <Footer />
      <EcoMode />
    </div>
  );
}
