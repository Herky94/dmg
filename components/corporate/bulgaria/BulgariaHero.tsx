"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface BulgariaHeroProps {
  sede: string;
  sitoWeb: string;
  email: string;
}

export default function BulgariaHero({
  sede,
  sitoWeb,
  email,
}: BulgariaHeroProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Start animation on mount
  useEffect(() => {
    setAnimationStarted(true);
  }, []);

  // Auto-animate when triggered
  useEffect(() => {
    if (!animationStarted || animationComplete) return;

    let startTime: number | null = null;
    const duration = 1200;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      setScrollProgress(easeOut);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimationComplete(true);
      }
    };

    requestAnimationFrame(animate);
  }, [animationStarted, animationComplete]);

  const blurAmount = scrollProgress * 8;
  const textOpacity = scrollProgress;

  return (
    <div ref={heroRef} className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/dmg-bulgaria.png')",
          filter: `blur(${blurAmount}px)`,
          transform: `scale(${1 + scrollProgress * 0.1})`,
          transition: "none",
        }}
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: scrollProgress * 0.3 }}
      />

      {/* Content Container */}
      <div
        className="absolute inset-0 flex items-center"
        style={{ opacity: textOpacity }}
      >
        <div className="container-dmg text-white mt-60">
          {/* Title */}
          <h1 className="text-[60px] lg:text-[130px] font-thin leading-none mb-[60px] lg:mb-[80px]">
            D.M.G. Bulgaria ltd.
          </h1>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-2 max-w-[1200px]">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Sede */}
              <div>
                <p className="text-[16px] lg:text-[18px] font-semibold mb-2">
                  {sede}
                </p>
                <p className="text-[15px] lg:text-[17px] font-light leading-relaxed">
                  Ilka Popova st.N2
                  <br />
                  ent.B, fl.5 – Sofia 1404 Lozenets
                  <br />
                  Bulgaria
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Sito Web */}
              <div>
                <p className="text-[16px] lg:text-[18px] font-semibold mb-2">
                  {sitoWeb}
                </p>
                <a
                  href="http://www.dmgbg.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] lg:text-[17px] font-light underline hover:no-underline"
                >
                  www.dmgbg.com
                </a>
              </div>

              {/* Email */}
              <div>
                <p className="text-[16px] lg:text-[18px] font-semibold mb-2">
                  {email}
                </p>
                <a
                  href="mailto:info@dmgbg.com"
                  className="text-[15px] lg:text-[17px] font-light underline hover:no-underline"
                >
                  info@dmgbg.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
