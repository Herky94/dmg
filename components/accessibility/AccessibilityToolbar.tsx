"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getTranslations, type Locale } from "@/lib/translations";

// Icone SVG minimali
const Icons = {
  Keyboard: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <line x1="6" y1="10" x2="6.01" y2="10" />
      <line x1="10" y1="10" x2="10.01" y2="10" />
      <line x1="14" y1="10" x2="14.01" y2="10" />
      <line x1="18" y1="10" x2="18.01" y2="10" />
      <line x1="8" y1="14" x2="16" y2="14" />
    </svg>
  ),
  Pause: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
    </svg>
  ),
  Link: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  Spacing: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
      <polyline points="19 12 12 5 5 12" />
    </svg>
  ),
  AlignLeft: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="17" y1="10" x2="3" y2="10" />
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="14" x2="3" y2="14" />
      <line x1="17" y1="18" x2="3" y2="18" />
    </svg>
  ),
  Saturation: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 0 0 20z" />
    </svg>
  ),
  Image: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  ),
  ZoomOut: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  ZoomIn: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Reset: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
    </svg>
  ),
};

export default function AccessibilityToolbar() {
  const pathname = usePathname();
  const currentLocale: Locale = pathname.startsWith("/it")
    ? "it"
    : pathname.startsWith("/en")
      ? "en"
      : "it";
  const t = getTranslations(currentLocale);

  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    contrast: "normal",
    highlightLinks: false,
    highlightHeaders: false,
    readableFont: false,
    disableAnimations: false,
    keyboardNav: false,
    zoomValue: 1,
    cursor: "normal",
    textSpacing: false,
    textAlign: "default",
    lowSaturation: false,
    highlightImagesNoAlt: false,
  });

  useEffect(() => {
    const body = document.body;
    const classes = [
      "mic-toolbox-contrast-monochrome",
      "mic-toolbox-contrast-soft",
      "mic-toolbox-contrast-hard",
      "mic-toolbox-content-links",
      "mic-toolbox-content-headers",
      "mic-toolbox-fonts-simple",
      "mic-toolbox-disable-buttons-animations",
      "mic-toolbox-disable-buttons-keyboard",
      "mic-toolbox-cursor-big-white",
      "mic-toolbox-cursor-big-black",
      "hide-custom-cursor",
      "mic-toolbox-text-spacing",
      "mic-toolbox-text-align-left",
      "mic-toolbox-low-saturation",
      "mic-toolbox-highlight-images-no-alt",
    ];

    body.classList.remove(...classes);
    body.style.zoom = "";

    if (settings.contrast === "monochrome")
      body.classList.add("mic-toolbox-contrast-monochrome");
    if (settings.contrast === "soft")
      body.classList.add("mic-toolbox-contrast-soft");
    if (settings.contrast === "hard")
      body.classList.add("mic-toolbox-contrast-hard");

    if (settings.highlightLinks)
      body.classList.add("mic-toolbox-content-links");
    if (settings.highlightHeaders)
      body.classList.add("mic-toolbox-content-headers");
    if (settings.readableFont) body.classList.add("mic-toolbox-fonts-simple");
    if (settings.disableAnimations)
      body.classList.add("mic-toolbox-disable-buttons-animations");
    if (settings.keyboardNav)
      body.classList.add("mic-toolbox-disable-buttons-keyboard");

    if (settings.zoomValue > 1) {
      (body.style as any).zoom = settings.zoomValue;
    }

    if (settings.cursor === "white") {
      body.classList.add("mic-toolbox-cursor-big-white");
      body.classList.add("hide-custom-cursor");
    }
    if (settings.cursor === "black") {
      body.classList.add("mic-toolbox-cursor-big-black");
      body.classList.add("hide-custom-cursor");
    }

    if (settings.textSpacing) body.classList.add("mic-toolbox-text-spacing");

    if (settings.textAlign === "left")
      body.classList.add("mic-toolbox-text-align-left");

    if (settings.lowSaturation)
      body.classList.add("mic-toolbox-low-saturation");

    if (settings.highlightImagesNoAlt)
      body.classList.add("mic-toolbox-highlight-images-no-alt");

    localStorage.setItem("accessibility-settings", JSON.stringify(settings));
  }, [settings]);

  // Separate effect for image highlighting (needs DOM manipulation)
  useEffect(() => {
    // Remove all existing badges first
    document
      .querySelectorAll(".alt-warning-badge, .alt-info-badge")
      .forEach((badge) => badge.remove());

    if (settings.highlightImagesNoAlt) {
      const images = document.querySelectorAll("img");
      let missingCount = 0;
      let validCount = 0;

      images.forEach((img) => {
        const altAttr = img.getAttribute("alt");
        const isMissing = altAttr === null || altAttr === "";

        if (isMissing) {
          missingCount++;
        } else {
          validCount++;
        }

        // Create badge
        const badge = document.createElement("div");
        badge.className = isMissing ? "alt-warning-badge" : "alt-info-badge";
        badge.textContent = isMissing ? "⚠ Manca ALT" : `✓ ALT: "${altAttr}"`;

        Object.assign(badge.style, {
          position: "absolute",
          top: "0",
          left: "0",
          background: isMissing ? "#ff0000" : "#22c55e",
          color: "#fff",
          padding: "4px 8px",
          fontSize: "11px",
          fontWeight: "bold",
          zIndex: "99999",
          pointerEvents: "none",
          borderRadius: "0 0 4px 0",
          maxWidth: "90%",
          wordBreak: "break-word",
          lineHeight: "1.3",
        });

        // Ensure parent has position context
        const parent = img.parentElement;
        if (parent) {
          const originalPosition = window.getComputedStyle(parent).position;
          if (originalPosition === "static") {
            parent.style.position = "relative";
            parent.setAttribute("data-alt-check-positioned", "true");
          }
          parent.appendChild(badge);
        }
      });

      console.log(
        `[Accessibility] Images: ${validCount} with ALT, ${missingCount} without ALT`,
      );
    }
  }, [settings.highlightImagesNoAlt]);

  useEffect(() => {
    const saved = localStorage.getItem("accessibility-settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse accessibility settings", e);
      }
    }
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  const resetAll = () => {
    setSettings({
      contrast: "normal",
      highlightLinks: false,
      highlightHeaders: false,
      readableFont: false,
      disableAnimations: false,
      keyboardNav: false,
      zoomValue: 1,
      cursor: "normal",
      textSpacing: false,
      textAlign: "default",
      lowSaturation: false,
      highlightImagesNoAlt: false,
    });
  };

  const handleZoom = (direction: "in" | "out") => {
    setSettings((prev) => {
      let newVal = prev.zoomValue;
      if (direction === "in") newVal = Math.min(1.6, prev.zoomValue + 0.1);
      if (direction === "out") newVal = Math.max(1.0, prev.zoomValue - 0.1);
      return { ...prev, zoomValue: Number(newVal.toFixed(1)) };
    });
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 z-[9999]" id="mic-init-access-tool">
        <button
          onClick={toggleOpen}
          className="bg-white/90 backdrop-blur-sm hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
          aria-label={t.accessibility.options}
          title={t.accessibility.options}
        >
          <div className="w-6 h-6 relative">
            <Image
              src="/images/usefull-icons/ax.svg"
              alt={t.accessibility.alt}
              width={24}
              height={24}
              className="w-full h-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTEyIDJhMTAgMTAgMCAxIDAgMTAgMTBBMTAgMTAgMCAwIDAgMTIgMmIybTAtMmEyIDEgMCAxIDAgMiAyIDIgMiAwIDAgMC0yLTJ6Ii8+PHBhdGggZD0iTTEyIDd2NCIvPjxwYXRoIGQ9Ik0xMCAxNWgyIi8+PC9zdmc+";
              }}
            />
          </div>
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen w-[350px] bg-[#f5f5f5] shadow-2xl z-[99999] transition-transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        id="mic-access-tool-box"
      >
        <div className="bg-[#C34069] text-white p-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-sm font-bold uppercase tracking-wider">
            {t.accessibility.settings}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/10 transition-colors p-2 rounded"
            title="Chiudi"
            aria-label="Chiudi"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <ToolButton
              active={settings.keyboardNav}
              onClick={() =>
                setSettings((s) => ({ ...s, keyboardNav: !s.keyboardNav }))
              }
              label="Navigazione tastiera"
              icon={<Icons.Keyboard />}
            />
            <ToolButton
              active={settings.disableAnimations}
              onClick={() =>
                setSettings((s) => ({
                  ...s,
                  disableAnimations: !s.disableAnimations,
                }))
              }
              label="Blocca animazioni"
              icon={<Icons.Pause />}
            />
          </div>

          <Section title="Contrasto Cromatico">
            <div className="grid grid-cols-3 gap-2">
              <ToolCard
                active={settings.contrast === "monochrome"}
                onClick={() =>
                  setSettings((s) => ({
                    ...s,
                    contrast:
                      s.contrast === "monochrome" ? "normal" : "monochrome",
                  }))
                }
                label="Bianco e Nero"
                icon="Bk"
              />
              <ToolCard
                active={settings.contrast === "soft"}
                onClick={() =>
                  setSettings((s) => ({
                    ...s,
                    contrast: s.contrast === "soft" ? "normal" : "soft",
                  }))
                }
                label="Contrasto Luminoso"
                icon="Lc"
              />
              <ToolCard
                active={settings.contrast === "hard"}
                onClick={() =>
                  setSettings((s) => ({
                    ...s,
                    contrast: s.contrast === "hard" ? "normal" : "hard",
                  }))
                }
                label="Contrasto Negativo"
                icon="Nc"
              />
            </div>
          </Section>

          <Section title="Testo e Zoom">
            <div className="grid grid-cols-2 gap-2">
              <div className="grid grid-cols-2 gap-1 bg-white border border-gray-300 rounded-md p-1">
                <button
                  onClick={() => handleZoom("out")}
                  disabled={settings.zoomValue <= 1}
                  className="flex items-center justify-center hover:bg-gray-100 rounded disabled:opacity-30"
                  title="Diminuisci Zoom"
                >
                  <Icons.ZoomOut />
                </button>
                <button
                  onClick={() => handleZoom("in")}
                  disabled={settings.zoomValue >= 1.6}
                  className="flex items-center justify-center hover:bg-gray-100 rounded disabled:opacity-30"
                  title="Aumenta Zoom"
                >
                  <Icons.ZoomIn />
                </button>
                <div className="col-span-2 text-center text-[10px] text-gray-500 font-mono">
                  zoom: {Math.round(settings.zoomValue * 100)}%
                </div>
              </div>
              <ToolCard
                active={settings.readableFont}
                onClick={() =>
                  setSettings((s) => ({ ...s, readableFont: !s.readableFont }))
                }
                label="Font Leggibile"
                icon="Aa"
              />
            </div>
          </Section>

          <Section title="Evidenzia Contenuto">
            <div className="grid grid-cols-2 gap-2">
              <ToolCard
                active={settings.highlightLinks}
                onClick={() =>
                  setSettings((s) => ({
                    ...s,
                    highlightLinks: !s.highlightLinks,
                  }))
                }
                label="Links"
                icon={<Icons.Link />}
              />
              <ToolCard
                active={settings.highlightHeaders}
                onClick={() =>
                  setSettings((s) => ({
                    ...s,
                    highlightHeaders: !s.highlightHeaders,
                  }))
                }
                label="Titoli"
                icon="H"
              />
            </div>
          </Section>

          <Section title="Leggibilità">
            <div className="grid grid-cols-2 gap-2">
              <ToolCard
                active={settings.textSpacing}
                onClick={() =>
                  setSettings((s) => ({ ...s, textSpacing: !s.textSpacing }))
                }
                label="Spaziatura Testo"
                icon={<Icons.Spacing />}
              />
              <ToolCard
                active={settings.textAlign === "left"}
                onClick={() =>
                  setSettings((s) => ({
                    ...s,
                    textAlign: s.textAlign === "left" ? "default" : "left",
                  }))
                }
                label="Allinea Sinistra"
                icon={<Icons.AlignLeft />}
              />
            </div>
          </Section>

          <Section title="Colori">
            <div className="grid grid-cols-1 gap-2">
              <ToolCard
                active={settings.lowSaturation}
                onClick={() =>
                  setSettings((s) => ({
                    ...s,
                    lowSaturation: !s.lowSaturation,
                  }))
                }
                label="Riduzione Saturazione"
                icon={<Icons.Saturation />}
              />
            </div>
          </Section>

          <Section title="Immagini">
            <div className="grid grid-cols-1 gap-2">
              <ToolCard
                active={settings.highlightImagesNoAlt}
                onClick={() =>
                  setSettings((s) => ({
                    ...s,
                    highlightImagesNoAlt: !s.highlightImagesNoAlt,
                  }))
                }
                label="Mostra testo ALT"
                icon={<Icons.Image />}
              />
            </div>
          </Section>

          <Section title="Cursore">
            <div className="grid grid-cols-2 gap-2">
              <ToolCard
                active={settings.cursor === "white"}
                onClick={() =>
                  setSettings((s) => ({
                    ...s,
                    cursor: s.cursor === "white" ? "normal" : "white",
                  }))
                }
                label="Cursore Bianco"
                icon="Cw"
              />
              <ToolCard
                active={settings.cursor === "black"}
                onClick={() =>
                  setSettings((s) => ({
                    ...s,
                    cursor: s.cursor === "black" ? "normal" : "black",
                  }))
                }
                label="Cursore Nero"
                icon="Cb"
              />
            </div>
          </Section>

          <button
            onClick={resetAll}
            className="w-full py-2.5 bg-white text-gray-600 rounded-lg hover:bg-gray-50 border border-gray-300 transition-colors text-xs flex items-center justify-center gap-2"
          >
            <Icons.Reset />
            Ripristina impostazioni
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[99990]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 text-center border-b pb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function ToolButton({ active, onClick, label, icon }: any) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-all relative ${
        active
          ? "bg-[#fffff3] border-2 border-[#1d2a30] text-[#1d2a30] font-bold"
          : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
      }`}
    >
      <span className="flex items-center justify-center">{icon}</span>
      <span className="text-[11px] leading-tight text-center">{label}</span>
      {active && (
        <span className="absolute top-1 right-1 text-[10px] text-green-500">
          ●
        </span>
      )}
    </button>
  );
}

function ToolCard({ active, onClick, label, icon }: any) {
  return (
    <button
      onClick={onClick}
      className={`relative h-20 p-2 rounded-md flex flex-col items-center justify-center transition-all ${
        active
          ? "bg-[#fffff3] border-2 border-dashed border-[#1d2a30]"
          : "bg-white border border-gray-300 hover:bg-gray-50"
      }`}
    >
      <span className="flex items-center justify-center mb-1">
        {typeof icon === "string" ? (
          <span className="text-lg font-bold">{icon}</span>
        ) : (
          icon
        )}
      </span>
      <span className="text-[10px] text-center leading-tight">{label}</span>
      {active && (
        <span className="absolute top-2 right-2 text-[8px] text-green-500">
          ●
        </span>
      )}
    </button>
  );
}
