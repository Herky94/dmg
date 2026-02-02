"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

interface InternationalSectionProps {
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  cta: string;
  videoNotSupported: string;
}

export default function InternationalSection({
  title,
  paragraph1,
  paragraph2,
  paragraph3,
  cta,
  videoNotSupported,
}: InternationalSectionProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "it";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-24 lg:py-0">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video-sfera-dmg.mp4" type="video/mp4" />
          {videoNotSupported}
        </video>
        {/* Dark overlay per migliorare la leggibilità del testo */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-dmg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center">
          {/* Left Column: Title and Button */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Title with line breaks */}
            <h1 className="text-5xl lg:text-[96px] font-[200] text-white leading-[1.1] mb-6 lg:mb-10">
              {title.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* CTA Button - Desktop */}
            <div className="pt-2 hidden lg:block">
              <Link
                href={`/${locale}/vocazione-internazionale`}
                className="group inline-flex items-center gap-4 bg-transparent border border-white text-white px-10 py-3 rounded-full text-sm font-light hover:bg-white hover:text-[#C34069] transition-all duration-300"
              >
                <span>{cta}</span>
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-[#C34069]">
                  <svg
                    className="w-4 h-4 text-[#C34069] transform transition-transform duration-300 group-hover:rotate-45 group-hover:text-white"
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
              </Link>
            </div>
          </div>

          {/* Right Column: Paragraphs */}
          <div className="space-y-6 text-white font-extralight text-sm lg:text-[15px] leading-relaxed text-center lg:text-left mx-auto lg:mx-0 lg:ml-auto">
            <p>{paragraph1}</p>

            <p className="hidden lg:block">{paragraph2}</p>

            <p className="hidden lg:block">{paragraph3}</p>

            {/* CTA Button - Mobile */}
            <div className="pt-8 flex justify-center lg:hidden">
              <Link
                href={`/${locale}/vocazione-internazionale`}
                className="group inline-flex items-center gap-4 bg-transparent border border-white text-white px-10 py-3 rounded-full text-sm font-light hover:bg-white hover:text-[#C34069] transition-all duration-300"
              >
                <span>{cta}</span>
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-[#C34069]">
                  <svg
                    className="w-5 h-5 text-[#C34069] transform transition-transform duration-300 group-hover:rotate-45 group-hover:text-white"
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
