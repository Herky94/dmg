"use client";

interface ResearchDevelopmentContentProps {
  subtitle: string;
  heading: string;
  paragraphs: string[];
}

export default function ResearchDevelopmentContent({
  subtitle,
  heading,
  paragraphs,
}: ResearchDevelopmentContentProps) {
  return (
    <section className="bg-[#F5F5F5]">
      {/* Top Section: Title and Subtitle */}
      <div className="pt-[100px] container-dmg">
        <div className="max-w-[1600px] mx-auto text-center max-w-5xl mx-auto">
          <p className="text-[12px] text-[#C34069] font-medium mb-[30px] uppercase tracking-wider">
            {subtitle}
          </p>
          <h2 className="text-[32px] md:text-[42px] lg:text-[52px] text-black leading-[1.1] font-light">
            {heading}
          </h2>
        </div>
      </div>

      {/* Content Paragraphs */}
      <div className="pt-[80px] pb-[100px] px-5 lg:px-32">
        <div className="max-w-[1400px] mx-auto">
          {paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-[15px] lg:text-[16px] text-black leading-relaxed font-light text-left mb-6 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
