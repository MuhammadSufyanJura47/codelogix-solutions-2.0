"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 320);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="back-top-button grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-[#1f5fa6] text-white shadow-2xl transition hover:-translate-y-0.5 hover:bg-[#184b83]"
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}