"use client";

export default function CorporateMapSection() {
  return (
    <section
      className="w-full h-[600px] bg-[#E6E6EA]"
      onMouseEnter={() => document.body.classList.add("hide-custom-cursor")}
      onMouseLeave={() => document.body.classList.remove("hide-custom-cursor")}
    >
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src="https://maps.google.com/maps?q=Via+Nicaragua,+10,+00071+Pomezia+RM&t=&z=10&ie=UTF8&iwloc=&output=embed"
        title="DMG Italia Map"
        className="w-full h-full"
      />
    </section>
  );
}
