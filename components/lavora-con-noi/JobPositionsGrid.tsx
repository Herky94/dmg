"use client";

import Image from "next/image";
import Link from "next/link";
import { getStrapiURL } from "@/lib/strapi";

// IT fields: TitoloPosizione, Slug, Sottotitolo, Descrizione, Modalita, Immagine, Attiva
// EN fields: JobTitle, Slug, Subtitle, Description, WorkMode, Image, Active
interface JobPosition {
  id: number;
  documentId: string;
  // IT fields
  TitoloPosizione?: string;
  Sottotitolo?: string;
  Descrizione?: string;
  Modalita?: "da remoto" | "ibrido" | "in sede";
  Immagine?: {
    url: string;
    alternativeText?: string;
  };
  // EN fields
  JobTitle?: string;
  Subtitle?: string;
  Description?: string;
  WorkMode?: "remote" | "hybrid" | "on-site";
  Image?: {
    url: string;
    alternativeText?: string;
  };
  // Common
  Slug: string;
  publishedAt: string;
  updatedAt: string;
}

export default function JobPositionsGrid({
  positions = [],
  applyLabel = "Candidati",
  locale = "it",
  noPositionsMessage = "Al momento non ci sono posizioni aperte.",
  publishedLabel = "Pubblicato",
}: {
  positions?: JobPosition[];
  applyLabel?: string;
  locale?: string;
  noPositionsMessage?: string;
  publishedLabel?: string;
}) {
  const isEN = locale === "en";

  // Helper to get field value based on locale
  const getTitle = (job: JobPosition) =>
    job.JobTitle ?? job.TitoloPosizione ?? "";
  const getSubtitle = (job: JobPosition) =>
    job.Subtitle ?? job.Sottotitolo ?? "";
  const getDescription = (job: JobPosition) =>
    job.Description ?? job.Descrizione ?? "";
  const getImage = (job: JobPosition) => job.Image ?? job.Immagine;
  const getWorkMode = (job: JobPosition) => {
    if (isEN) {
      return job.WorkMode ?? job.Modalita ?? "";
    }
    return job.Modalita ?? job.WorkMode ?? "";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (isEN) {
      if (diffMins < 60) return `${diffMins} minutes ago`;
      if (diffHours < 24) return `${diffHours} hours ago`;
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } else {
      if (diffMins < 60) return `${diffMins} minuti fa`;
      if (diffHours < 24) return `${diffHours} ore fa`;
      if (diffDays < 7) return `${diffDays} giorni fa`;
      return date.toLocaleDateString("it-IT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  };

  return (
    <section className="bg-[#F5F5F5] pt-[100px] pb-[55px]">
      <div className="container-dmg">
        {positions.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">{noPositionsMessage}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {positions
              .filter((job) => job.Slug) // Only show jobs with a valid Slug
              .map((job) => {
                const image = getImage(job);
                return (
                  <div
                    key={job.documentId}
                    className="flex flex-col bg-white rounded-[15px] overflow-hidden group hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Image */}
                    <div className="h-[200px] bg-[#C34069] relative overflow-hidden">
                      {image ? (
                        <Image
                          src={getStrapiURL(image.url)}
                          alt={image.alternativeText || getTitle(job)}
                          fill
                          className="object-cover"
                        />
                      ) : null}
                    </div>

                    {/* Content */}
                    <div className="p-[20px] flex flex-col flex-grow">
                      <h3 className="text-[32px] font-medium leading-tight mb-1">
                        {getTitle(job)}
                      </h3>
                      <span className="text-[#929292] text-sm font-normal mb-4 block">
                        {getSubtitle(job)}
                      </span>

                      <p className="text-black text-lg font-light leading-relaxed mb-4 line-clamp-3">
                        {getDescription(job)}
                      </p>

                      <div className="mb-8">
                        <Link
                          href={`/${locale}/posizioni-aperte/${job.Slug}`}
                          className="inline-block"
                        >
                          <button className="group/btn flex items-center gap-4 bg-[#F2D7E0] hover:bg-[#C34069] text-[#C34069] hover:text-white px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 w-full sm:w-auto">
                            <span>{applyLabel}</span>
                            <div className="bg-[#C34069] rounded-full w-6 h-6 flex items-center justify-center group-hover/btn:bg-white transition-colors duration-300">
                              <svg
                                className="w-3 h-3 text-white group-hover/btn:text-[#C34069] transform transition-transform duration-300 group-hover/btn:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </div>
                          </button>
                        </Link>
                      </div>

                      <div className="mt-auto">
                        <span className="text-xs text-[#454444] tracking-wide">
                          {publishedLabel} {formatDate(job.publishedAt)} ·{" "}
                          {getWorkMode(job)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </section>
  );
}
