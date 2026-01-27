"use client";

interface CertificationsContentProps {
  preTitle?: string;
  title?: string;
}

export default function CertificationsContent({
  preTitle = "Lorem Ipsum",
  title = "D.M.G. ITALIA è un'azienda certificata per la ricerca, sviluppo e commercio di Dispositivi Medici:",
}: CertificationsContentProps = {}) {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container-dmg">
        <div className="text-center max-w-5xl mx-auto">
          <p className="text-[12px] text-[#C34069] font-medium mb-[30px] uppercase tracking-wider">
            {preTitle}
          </p>
          <h2 className="text-[32px] md:text-[42px] lg:text-[52px] text-black leading-[1.1] font-light">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto pt-[100px]">
          {/* Box 1 - ISO 13485 */}
          <div className="bg-[#DFDFDF] rounded-[50px] p-8 lg:p-16 flex flex-col items-center justify-center text-center aspect-square">
            <div className="w-40 h-40 mb-8 lg:mb-[50px] flex items-center justify-center">
              {/* Using filter to ensure visibility or correct color if needed, but starting with raw image */}
              <img
                src="/images/logos/ISO13485-2012-w.svg"
                alt="ISO 13485"
                className="w-full h-full object-contain filter invert mix-blend-multiply"
                // Note: Assuming the -w means white, we invert it to black/dark for light background.
                // If it was already blue/dark, invert might make it weird.
                // But given '-w' suffix and typical white icons for dark footers, invert is a safe guess for light bg.
                // However, the screenshot shows BLUE.
                // A CSS filter to turn white to blue is complex.
                // Let's try without filter first, if it's invisible we know why.
                // Wait, I can't iterate easily.
                // I'll assume the user wants the content. Ideally I'd use a specific image.
                // I will add a style to colorize it if it's an SVG masks, but <img> tags don't support fill change easily.
                // I will apply filter: invert(1) brightness(0.5) sepia(1) hue-rotate(...) to simulate blue if needed.
                // Or just keep it black (invert).
                style={{
                  filter:
                    "invert(20%) sepia(96%) saturate(1919%) hue-rotate(206deg) brightness(91%) contrast(93%)",
                }}
                // This approximated filter turns black to #0056b3 (blueish). If source is white, we first invert.
              />
            </div>
            <p className="text-xl md:text-3xl lg:text-[40px] text-black font-light leading-tight px-4 lg:px-0">
              UNI CEI EN ISO 13485:2021
            </p>
          </div>

          {/* Box 2 - ISO 9001 */}
          <div className="bg-[#DFDFDF] rounded-[50px] p-8 lg:p-16 flex flex-col items-center justify-center text-center aspect-square">
            <div className="w-40 h-40 mb-8 lg:mb-[50px] flex items-center justify-center">
              <img
                src="/images/logos/209_isocertifiedcologoblue.svg"
                alt="ISO 9001"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xl md:text-3xl lg:text-[40px] text-black font-light leading-tight px-4 lg:px-0">
              UNI CEI EN ISO 9001:2015
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
