"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HistoryIntroProps {
  preTitle?: string;
  title?: string;
}

export default function HistoryIntro({
  preTitle = "Azienda",
  title = "Nel contesto della dinamica planetaria, tutto ciò è per noi un elemento indispensabile per continuare a orientarci nelle evoluzioni e trasformazioni della medicina moderna.",
}: HistoryIntroProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const image = imageRef.current;

    if (!container || !text || !image) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=400%", // Increased to allow next section to overlap
          pin: true,
          scrub: 1,
        },
      });

      // Phase 1: Text fades out, Image moves up to overlap
      tl.to(text, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.inOut",
      })
        .to(
          image,
          {
            y: -150, // Move up to overlap text
            scale: 1.1, // Start expanding slightly
            duration: 1,
            ease: "power2.inOut",
          },
          "<",
        )

        // Phase 2: Image expands to fill screen
        .to(image, {
          y: 0, // Reset Y (because text collapse will move it up naturally)
          marginTop: "-100px", // Negative margin to counteract section padding
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          scale: 1, // Reset scale to 1 to avoid compounding
          duration: 2,
          ease: "power2.inOut",
        })
        .to(
          text,
          {
            height: 0,
            margin: 0,
            padding: 0,
            duration: 2,
            ease: "power2.inOut",
          },
          "<",
        )
        // Phase 3: Hold state (empty tween) to allow next section to scroll over
        .to({}, { duration: 1 }); // 1 unit of duration (25% of total) for overlap
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center pt-[100px] bg-white overflow-hidden z-10"
    >
      <div
        ref={textRef}
        className="relative z-10 text-center container-dmg max-w-7xl"
      >
        <p className="text-[12px] text-[#C34069] font-medium mb-[30px] uppercase tracking-wider">
          {preTitle}
        </p>
        <h2 className="text-[32px] md:text-[42px] lg:text-[52px] text-black leading-[1.1] font-light">
          {title}
        </h2>
      </div>

      <div
        ref={imageRef}
        className="relative mt-[100px] w-[80%] md:w-[60%] aspect-video rounded-[50px] overflow-hidden shadow-2xl z-20"
      >
        <Image
          src="/images/building.webp"
          alt="History Building"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
