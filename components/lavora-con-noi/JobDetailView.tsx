"use client";

import { Header, Footer } from "@/components/layout";
import JobApplicationForm from "@/components/lavora-con-noi/JobApplicationForm";
import EcoMode from "@/components/ui/EcoMode";

interface JobDetailViewProps {
  job: {
    TitoloPosizione: string;
    Sottotitolo: string;
    Descrizione: string;
    Modalita: string;
  };
  applyLabel?: string;
  sendingLabel?: string;
  successMessage?: string;
  privacyRequired?: string;
  cvRequired?: string;
}

export default function JobDetailView({
  job,
  applyLabel,
  sendingLabel,
  successMessage,
  privacyRequired,
  cvRequired,
}: JobDetailViewProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Header />

      <div className="">
        <JobApplicationForm
          jobInfo={{
            title: job.TitoloPosizione,
            type: job.Sottotitolo,
            description: job.Descrizione,
            modalita: job.Modalita,
          }}
          paddingTop="pt-[120px]"
          paddingBottom="pb-[55px]"
          className="bg-[#F5F5F5]"
          applyLabel={applyLabel}
          sendingLabel={sendingLabel}
          successMessage={successMessage}
          privacyRequired={privacyRequired}
          cvRequired={cvRequired}
          sendingLabel={sendingLabel}
          successMessage={successMessage}
        />
      </div>

      <Footer />
      <EcoMode />
    </div>
  );
}
