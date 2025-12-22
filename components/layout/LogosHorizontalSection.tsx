"use client";

export default function LogosHorizontalSection() {
  const logos = [
    { name: "Selentuss", src: "/images/selentuss.png" },
    { name: "Rinopanteina", src: "/images/rinopanteina.png" },
    { name: "Pepsino", src: "/images/pepsino.png" },
    { name: "Orogermina", src: "/images/orogermina.png" },
    { name: "Oftasiale", src: "/images/oftasiale.png" },
    { name: "Gastroftal", src: "/images/gastrooftal.png" },
    { name: "Elastar", src: "/images/elastar.png" },
  ];

  return (
    <section className="bg-black py-16 overflow-hidden">
      <div className="relative w-full">
        {/* Gradient overlays for smooth fade at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

        <div className="flex whitespace-nowrap animate-infinite-scroll">
          {/* First set of logos */}
          <div className="flex items-center gap-24 px-12">
            {logos.map((logo, index) => (
              <div
                key={`logo-1-${index}`}
                className="relative w-[230px] h-[100px] flex-shrink-0 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>

          {/* Second set of logos for infinite loop */}
          <div className="flex items-center gap-24 px-12">
            {logos.map((logo, index) => (
              <div
                key={`logo-2-${index}`}
                className="relative w-[230px] h-[100px] flex-shrink-0 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>

          {/* Third set of logos for safety on wide screens */}
          <div className="flex items-center gap-24 px-12">
            {logos.map((logo, index) => (
              <div
                key={`logo-3-${index}`}
                className="relative w-[230px] h-[100px] flex-shrink-0 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>

          {/* Fourth set of logos for safety on wide screens */}
          <div className="flex items-center gap-24 px-12">
            {logos.map((logo, index) => (
              <div
                key={`logo-4-${index}`}
                className="relative w-[230px] h-[100px] flex-shrink-0 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-25%);
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
          width: max-content; /* Ensure container fits all children */
        }
      `}</style>
    </section>
  );
}
