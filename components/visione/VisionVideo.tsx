"use client";

export default function VisionVideo() {
  return (
    <section className="w-full h-auto bg-black">
      <div className="w-full h-full">
        <video className="w-full h-full object-cover" controls playsInline>
          <source src="/bg-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
