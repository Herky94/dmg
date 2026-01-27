"use client";

import Link from "next/link";

export default function CorporateInfoSection() {
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
          <span className="text-[#C34069]">DMG Italia</span>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="bg-[#E6E6EA] pt-[60px] pb-[110px]">
        <div className="container-dmg">
          {/* Main Title */}
          <h2 className="text-5xl lg:text-[130px] font-thin text-black leading-none mb-[35px] break-words">
            D.M.G. Italia srl
          </h2>

          {/* Content Block - Indented */}
          <div className="lg:pl-[120px] space-y-[35px]">
            {/* Sede Legale */}
            <div className="text-black text-[20px]">
              <p className="font-bold mb-1">SEDE LEGALE</p>
              <p className="font-light">
                Via Laurentina km. 26,700 – 00071 Pomezia (RM)
              </p>
            </div>

            {/* Sede Operativa */}
            <div className="text-black text-[20px]">
              <p className="font-bold mb-1">
                SEDE OPERATIVA E UFFICI AMMINISTRATIVI
              </p>
              <p className="font-light">
                Via Nicaragua, 10- 00071 Pomezia (RM)
              </p>
            </div>

            {/* Telefono */}
            <div className="text-black text-[20px]">
              <p className="font-bold mb-1">TELEFONO</p>
              <p className="font-light leading-relaxed">
                06 91968038
                <br />
                06 91969082
                <br />
                06 9145963
              </p>
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

            {/* Magazzino */}
            <div className="text-black text-[20px]">
              <p className="font-bold mb-1">MAGAZZINO</p>
              <p className="font-light">
                Via dei Cedri, 22 – 00071 Pomezia (RM)
              </p>
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
