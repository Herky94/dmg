"use client";

export default function TurchiaMapSection() {
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
        src="https://maps.google.com/maps?q=Te%C5%9Fvikiye+mah.+Valikona%C4%9F%C4%B1+cad.+No:74+D:7A,+%C5%9Ei%C5%9Fli,+%C4%B0stanbul,+Turkey&t=&z=14&ie=UTF8&iwloc=&output=embed"
        title="DMG Turkey Map"
        className="w-full h-full"
      />
    </section>
  );
}
