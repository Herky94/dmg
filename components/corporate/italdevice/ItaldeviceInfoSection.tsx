"use client";

import Link from "next/link";

export default function ItaldeviceInfoSection() {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="bg-white py-[20px] pb-[15px]">
        <div className="container-dmg text-[20px] font-light">
          <span className="text-[#919191]">
            <Link href="/" className="hover:text-[#C34069] transition-colors">
              Home
            </Link>{" "}
            &gt; Corporate &gt;{" "}
          </span>
          <span className="text-[#C34069]">DMG Italdevice</span>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="bg-[#E6E6EA] pt-[60px] pb-[110px]">
        <div className="container-dmg">
          {/* Main Title */}
          <h2 className="text-5xl lg:text-[130px] font-thin text-black leading-none mb-[35px] break-words">
            Italdevice srl
          </h2>

          {/* Content Block - Indented */}
          <div className="lg:pl-[120px] space-y-[35px]">
            {/* Sede */}
            <div className="text-black text-[20px]">
              <p className="font-bold mb-1">SEDE</p>
              <p className="font-light">
                Via Laurentina Km. 26,700
                <br />
                00071 Pomezia (RM)
              </p>
            </div>

            {/* Sito Web */}
            <div className="text-black text-[20px]">
              <p className="font-bold mb-1">SITO WEB</p>
              <a
                href="http://www.italdevice.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-light border-b border-black hover:text-[#C34069] hover:border-[#C34069] transition-colors"
              >
                www.italdevice.com
              </a>
            </div>

            {/* Email */}
            <div className="text-black text-[20px]">
              <p className="font-bold mb-1">EMAIL</p>
              <a
                href="mailto:info@dmgit.com"
                className="font-light border-b border-black hover:text-[#C34069] hover:border-[#C34069] transition-colors"
              >
                info@dmgit.com
              </a>
            </div>

            {/* Button */}
            <div className="pt-2">
              <Link
                href="/contatti"
                className="group inline-flex items-center gap-4 bg-[#C34069] border border-[#C34069] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-[#C34069] transition-all duration-300"
              >
                <span className="uppercase tracking-wider">CONTATTACI</span>
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-[#C34069] transition-colors duration-300">
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
        </div>
      </section>
    </>
  );
}
