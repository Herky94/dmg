"use client";

import { useRef } from "react";
import Image from "next/image";

const achievements = [
  {
    type: "title",
    text: "Cosa abbiamo\nraggiunto fino\nad oggi.",
    bg: "bg-[#E03F82]",
  },
  {
    type: "stat",
    number: "+23",
    label: "Brevetti",
    sub: "in 76+ Paesi",
    bg: "bg-[#C34069]",
  },
  {
    type: "stat",
    number: "+34",
    label: "Prodotti",
    sub: "in svariate forme farmaceutiche e presentazioni",
    bg: "bg-[#E03F82]",
  },
  {
    type: "stat",
    number: "4",
    label: "Aree Terapeutiche",
    sub: "Otorinolaringoiatria, Pediatria, Oftalmologia, Gastroenterologia",
    bg: "bg-[#C34069]",
  },
  {
    type: "stat",
    number: "+50",
    label: "Paesi",
    sub: "in svariate forme farmaceutiche in cui sono distribuiti i nostri prodotti",
    bg: "bg-[#E03F82]",
  },
];

export default function AchievementsSection() {
  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="container-dmg">
        <div className="max-w-[1600px] mx-auto">
          {/* Top Cards Section */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 overflow-x-visible pb-10 lg:pb-20 items-stretch pl-4 isolate">
            {achievements.map((item, idx) => (
              <div
                key={idx}
                className={`
                relative flex-shrink-0 rounded-[30px] lg:rounded-[50px] text-white transition-all duration-500 ease-out min-h-[300px] lg:min-h-[380px]
                ${idx > 0 ? "lg:-ml-[100px]" : ""}
                ${
                  item.type === "title"
                    ? "p-8 lg:pl-[100px] lg:py-[90px] lg:pr-8"
                    : "p-8 lg:p-[60px]"
                }
                ${item.bg}
                ${
                  item.type === "title"
                    ? "w-full lg:w-[560px] flex items-center"
                    : "w-full lg:w-[360px] flex flex-col justify-start lg:hover:z-[100] lg:hover:-translate-x-12"
                }
                shadow-lg group/card
              `}
                style={{
                  zIndex: 10 + idx,
                }}
              >
                {item.type === "title" ? (
                  <p className="relative z-10 text-[32px] lg:text-[52px] leading-tight font-light whitespace-pre-line">
                    {item.text}
                  </p>
                ) : (
                  <div className="transition-transform duration-500">
                    <span className="text-[48px] lg:text-[64px] font-light leading-none mb-2 block">
                      {item.number}
                    </span>
                    <span className="text-[24px] lg:text-[33px] font-normal leading-tight mb-4 block">
                      {item.label}
                    </span>
                    <p className="text-[14px] lg:text-[12px] font-light opacity-90 leading-relaxed">
                      {item.sub}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Images Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[800px]">
            {/* Left Large Image */}
            <div className="relative w-full h-[400px] lg:h-full bg-black rounded-[30px] overflow-hidden group">
              {/* Placeholder for image */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6 h-full">
              {/* Top Row: 2 Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-[400px] lg:h-1/2">
                <div className="relative w-full h-full bg-black rounded-[30px] overflow-hidden"></div>
                <div className="relative w-full h-full bg-black rounded-[30px] overflow-hidden"></div>
              </div>

              {/* Bottom Row: 1 Wide Image */}
              <div className="relative w-full h-[400px] lg:h-1/2 bg-black rounded-[30px] overflow-hidden"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
