"use client";

interface Section {
  title: string;
  paragraphs: string[];
  email?: string;
  link?: {
    text: string;
    url: string;
  };
}

interface VigilanzaSorveglianzaContentProps {
  sections: Section[];
  emailText: string;
  linkText: string;
}

export default function VigilanzaSorveglianzaContent({
  sections,
  emailText,
  linkText,
}: VigilanzaSorveglianzaContentProps) {
  return (
    <section className="bg-white py-[100px]">
      <div className="container-dmg">
        <div className="max-w-full">
          {/* Sections */}
          <div className="space-y-[80px]">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-[32px] lg:text-[42px] text-black font-light mb-6">
                  {section.title}
                </h2>

                <div className="space-y-4 text-[16px] lg:text-[18px] text-gray-700 leading-relaxed">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}

                  {section.email && (
                    <p className="mt-6">
                      {emailText.replace(
                        "{title}",
                        section.title.toLowerCase(),
                      )}{" "}
                      <a
                        href={`mailto:${section.email}`}
                        className="text-black underline hover:text-[#C34069] transition-colors font-medium"
                      >
                        {section.email}
                      </a>
                    </p>
                  )}

                  {section.link && (
                    <p>
                      {linkText}{" "}
                      <a
                        href={section.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black underline hover:text-[#C34069] transition-colors"
                      >
                        {section.link.text}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
