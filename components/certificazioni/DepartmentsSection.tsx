"use client";

import Link from "next/link";

interface DepartmentsSectionProps {
  title: string;
  subtitle: string;
  departments: string[];
}

export default function DepartmentsSection({
  title,
  subtitle,
  departments,
}: DepartmentsSectionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container-dmg">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-[85px]">
          <h2 className="text-4xl lg:text-[64px] font-thin text-black leading-[1.1] mb-[60px]">
            {title.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index < title.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="text-[15px] lg:text-[17px] text-[#454444] leading-relaxed max-w-sm mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Departments List */}
        <div className="border-t border-[#929292]">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="border-b border-[#929292] py-[50px] px-10 lg:px-[120px] transition-colors duration-300 hover:bg-[#C34069] group"
            >
              <p className="text-2xl lg:text-[33px] font-thin text-black leading-tight w-full group-hover:text-white transition-colors duration-300">
                {dept}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-[50px] flex justify-center">
          <Link
            href="#"
            // Using a solid color #F6E1E7 instead of bg-[#C34069]/16 prevents rendering artifacts during transition
            className="flex items-center gap-3 bg-[#F6E1E7] text-[#C34069] px-6 py-3 rounded-full hover:bg-[#C34069] hover:text-white transition-colors duration-300 cursor-pointer w-fit group"
          >
            <span className="text-[12px] font-medium bg-transparent">
              Regolamento Europeo MDR
            </span>
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
