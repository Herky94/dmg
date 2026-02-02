"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getStrapiURL, normalizeToSlug } from "@/lib/strapi";
import { useProductFilters } from "@/lib/useProductFilters";

interface ProductDetailsProps {
  product: any;
}

const specializationIcons: Record<string, string> = {
  Pediatria: "/images/pediatria.png",
  Otorinolaringoiatria: "/images/otorinolaringoiatria.png",
  
  Gastroenterologia: "/images/gastroenterologia.png",
  Oftalmologia: "/images/oftalmologia.png",
};

const extractTextFromBlocks = (blocks: any[]): string => {
  if (!blocks || !Array.isArray(blocks)) return "";

  return blocks
    .map((block) => {
      if (block.type === "paragraph" || block.type === "heading") {
        return block.children?.map((child: any) => child.text).join(" ");
      }
      return "";
    })
    .join("\n\n");
};

const Accordion = ({
  title,
  content,
  isOpen,
  onToggle,
}: {
  title: string;
  content: any[];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  if (!content || content.length === 0) return null;

  return (
    <div className="border-t border-[#E6E6EA] py-6">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center group hover:transform-none transition-none cursor-pointer"
      >
        <h3 className="text-[22px] text-[#C34069] font-normal">{title}</h3>
        <div className="relative w-3.5 h-3.5 mr-1">
          <span className="absolute top-1/2 left-0 w-full h-[2px] bg-[#C34069] -translate-y-1/2" />
          <span
            className={`absolute top-1/2 left-0 w-full h-[2px] bg-[#C34069] -translate-y-1/2 transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-0" : "rotate-90"
            }`}
          />
        </div>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4 text-[16px] leading-relaxed text-black font-light opacity-90">
            {extractTextFromBlocks(content)}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProductDetailsProps {
  product: any;
  indications?: string;
  dosageAndUse?: string;
  leaflet?: string;
  backToProducts?: string;
  therapeuticAreas?: string;
  classification?: string;
  formulation?: string;
  otherFormulation?: string;
}

export default function ProductDetails({
  product,
  indications = "Indicazioni",
  dosageAndUse = "Posologia e Modo d'uso",
  leaflet = "Foglio illustrativo",
  backToProducts = "TORNA AI PRODOTTI",
  therapeuticAreas = "Aree terapeutiche:",
  classification = "Classificazione:",
  formulation = "Formulazione:",
  otherFormulation = "Altra formulazione disponibile:",
}: ProductDetailsProps) {
  const pathname = usePathname();
  const currentLocale = pathname.startsWith("/it")
    ? "it"
    : pathname.startsWith("/en")
      ? "en"
      : "it";

  const { buildQueryString } = useProductFilters();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [show360, setShow360] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    indications,
  );
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const images = product.Images || [];
  const videos = product.video || [];
  const areas = product.aree_terapeutiche || [];
  const classifications = product.classificazioni || [];
  const formulations = product.formulazioni || [];
  const otherFormulations = product.altreFormulazioni || [];

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1,
      );
    }
    if (isRightSwipe) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1,
      );
    }
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <section className="py-[90px] pt-[140px] container-dmg">
      <div className="mb-8">
        <Link
          href={`/${currentLocale}/prodotti${buildQueryString()}`}
          className="inline-flex items-center gap-3 bg-[#C34069]/16 text-[#C34069] px-6 py-3 rounded-full hover:bg-[#C34069] hover:text-white transition-all duration-300 cursor-pointer group"
        >
          <div className="bg-[#C34069] rounded-full w-6 h-6 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
            <svg
              className="w-3 h-3 text-white transition-colors duration-300 group-hover:text-[#C34069]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <span className="text-[12px] font-medium uppercase">
            {backToProducts}
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px]">
        {/* Left Column - Images */}
        <div className="relative">
          <div
            className="relative aspect-square w-full bg-white rounded-[25px] overflow-hidden"
            style={{ boxShadow: "0px 11.04px 23.73px rgba(0, 0, 0, 0.1)" }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {show360 && videos.length > 0 ? (
              <div className="w-full h-full flex items-center justify-center bg-white">
                <video
                  src={getStrapiURL(videos[0].url)}
                  controls
                  autoPlay
                  loop
                  className="w-full h-full object-contain"
                />
              </div>
            ) : images.length > 0 ? (
              images.map((img: any, idx: number) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    idx === currentImageIndex
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={getStrapiURL(img.url)}
                    alt={img.alternativeText || "Immagine prodotto"}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />
                </div>
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                No Image
              </div>
            )}

            {/* Pagination Dots */}
            {!show360 && images.length > 1 && (
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
                {images.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 cursor-pointer ${
                      idx === currentImageIndex
                        ? "bg-[#C34069]"
                        : "bg-[#E6E6EA]"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 360 Video Button */}
          {videos.length > 0 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShow360(!show360)}
                className={`flex flex-col items-center gap-2 group cursor-pointer transition-all duration-300 ${
                  show360
                    ? "text-[#C34069]"
                    : "text-gray-400 hover:text-[#C34069]"
                }`}
              >
                <div className="relative w-12 h-12 flex items-center justify-center border-2 border-current rounded-full p-2 transition-all duration-300 group-hover:scale-110">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-full h-full transition-transform duration-700 group-hover:rotate-[360deg]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M21 12L18 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 12L18 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <text
                      x="12"
                      y="12"
                      textAnchor="middle"
                      dy=".3em"
                      fontSize="6"
                      fill="currentColor"
                      fontWeight="bold"
                      stroke="none"
                    >
                      360°
                    </text>
                  </svg>
                </div>
                <span className="text-sm font-medium tracking-wider uppercase">
                  {show360 ? "Chiudi 360°" : "Vista 360°"}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="flex flex-col">
          {/* Header: Title & Icons */}
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-4xl lg:text-5xl font-normal text-black">
              {product.Name}
            </h2>

            {/* Therapeutic Area Icons - Now clickable */}
            <div className="flex gap-2">
              {areas.map((area: any) => {
                const iconPath = specializationIcons[area.Name];
                if (!iconPath) return null;

                return (
                  <Link
                    key={area.id || area.documentId}
                    href={`/${currentLocale}/prodotti?area=${normalizeToSlug(area.Name)}`}
                    className="relative w-10 h-10 lg:w-12 lg:h-12 transition-transform duration-300 hover:scale-110 group"
                  >
                    <Image
                      src={iconPath}
                      alt={area.Name}
                      fill
                      className="object-contain"
                    />
                    {/* Tooltip */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      <div className="bg-black text-white text-xs px-3 py-1.5 rounded-full shadow-lg">
                        {area.Name}
                      </div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rotate-45"></div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <p className="text-lg lg:text-xl mb-8 font-light text-black">
            {product.sottotitolo}
          </p>

          {/* Description */}
          <div className="mb-10 text-black text-[18px] font-light leading-relaxed">
            {extractTextFromBlocks(product.Description)}
          </div>

          {/* Accordions */}
          <div className="mb-10 border-b border-[#E6E6EA]">
            <Accordion
              title={indications}
              content={product.Indicazione}
              isOpen={openAccordion === "Indicazioni"}
              onToggle={() => toggleAccordion("Indicazioni")}
            />
            <Accordion
              title={dosageAndUse}
              content={product.posologiaModoDuso}
              isOpen={openAccordion === "Posologia"}
              onToggle={() => toggleAccordion("Posologia")}
            />
          </div>

          {/* Button */}
          {product.PDF && (
            <Link
              href={getStrapiURL(product.PDF.url)}
              target="_blank"
              className="border border-black rounded-full px-8 py-3 w-fit mb-12 hover:bg-black hover:text-white transition-colors text-[14px] font-medium"
            >
              {leaflet}
            </Link>
          )}

          {/* Footer Info - Now with clickable links */}
          <div className="text-[13px] text-[#929292] space-y-1 font-light">
            {areas.length > 0 && (
              <p>
                {therapeuticAreas}{" "}
                {areas.map((a: any, idx: number) => (
                  <span key={a.id || a.documentId}>
                    <Link
                      href={`/${currentLocale}/prodotti?area=${normalizeToSlug(a.Name)}`}
                      className="text-[#C34069] hover:underline transition-colors"
                    >
                      {a.Name}
                    </Link>
                    {idx < areas.length - 1 && ", "}
                  </span>
                ))}
              </p>
            )}
            {classifications.length > 0 && (
              <p>
                {classification}{" "}
                {classifications.map((c: any, idx: number) => (
                  <span key={c.id || c.documentId}>
                    <Link
                      href={`/${currentLocale}/prodotti?classificazione=${normalizeToSlug(
                        c.Name,
                      )}`}
                      className="text-[#C34069] hover:underline transition-colors"
                    >
                      {c.Name}
                    </Link>
                    {idx < classifications.length - 1 && ", "}
                  </span>
                ))}
              </p>
            )}
            {formulations.length > 0 && (
              <p>
                {formulation}{" "}
                {formulations.map((f: any, idx: number) => (
                  <span key={f.id || f.documentId}>
                    <Link
                      href={`/${currentLocale}/prodotti?formulazione=${normalizeToSlug(f.Name)}`}
                      className="text-[#C34069] hover:underline transition-colors"
                    >
                      {f.Name}
                    </Link>
                    {idx < formulations.length - 1 && ", "}
                  </span>
                ))}
              </p>
            )}
            {otherFormulations.length > 0 && (
              <p>
                {otherFormulation}{" "}
                {otherFormulations.map((p: any, idx: number) => (
                  <span key={p.id || p.documentId}>
                    <Link
                      href={`/${currentLocale}/prodotti/${p.Slug}`}
                      className="text-[#C34069] hover:underline transition-colors"
                    >
                      {p.Name}
                    </Link>
                    {idx < otherFormulations.length - 1 && ", "}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
