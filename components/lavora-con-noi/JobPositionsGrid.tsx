"use client";

import Image from "next/image";
import Link from "next/link";
import { getStrapiURL } from "@/lib/strapi";

interface JobPosition {
  id: number;
  documentId: string;
  TitoloPosizione: string;
  Slug: string;
  Sottotitolo: string;
  Descrizione: string;
  Modalita: "da remoto" | "ibrido" | "in sede";
  Immagine?: {
    url: string;
    alternativeText?: string;
  };
  publishedAt: string;
  updatedAt: string;
}

export default function JobPositionsGrid({
  positions = [],
  applyLabel = "Candidati",
}: {
  positions?: JobPosition[];
  applyLabel?: string;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minuti fa`;
    if (diffHours < 24) return `${diffHours} ore fa`;
    if (diffDays < 7) return `${diffDays} giorni fa`;

    return date.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="bg-[#F5F5F5] pt-[100px] pb-[55px]">
      <div className="container-dmg">
        {positions.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Al momento non ci sono posizioni aperte.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {positions.map((job) => (
              <div
                key={job.documentId}
                className="flex flex-col bg-white rounded-[15px] overflow-hidden group hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                <div className="h-[200px] bg-[#C34069] relative overflow-hidden">
                  {job.Immagine ? (
                    <Image
                      src={getStrapiURL(job.Immagine.url)}
                      alt={
                        job.Immagine.alternativeText || "Posizione lavorativa"
                      }
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </div>

                {/* Content */}
                <div className="p-[20px] flex flex-col flex-grow">
                  <h3 className="text-[32px] font-medium leading-tight mb-1">
                    {job.TitoloPosizione}
                  </h3>
                  <span className="text-[#929292] text-sm font-normal mb-4 block">
                    {job.Sottotitolo}
                  </span>

                  <p className="text-black text-lg font-light leading-relaxed mb-4 line-clamp-3">
                    {job.Descrizione}
                  </p>

                  <div className="mb-8">
                    <Link
                      href={`/posizioni-aperte/${job.Slug}`}
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
                      Pubblicato {formatDate(job.publishedAt)} · {job.Modalita}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
