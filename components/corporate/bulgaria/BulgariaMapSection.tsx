"use client";

export default function BulgariaMapSection() {
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
        src="https://maps.google.com/maps?q=Ilka+Popova+st.N2,+Sofia+1404+Lozenets,+Bulgaria&t=&z=14&ie=UTF8&iwloc=&output=embed"
        title="DMG Bulgaria Map"
        className="w-full h-full"
      />
    </section>
  );
}
