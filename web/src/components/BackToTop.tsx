"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="맨 위로 이동"
      className="fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-transform hover:-translate-y-0.5"
    >
      <span aria-hidden="true" className="text-lg">
        ↑
      </span>
    </button>
  );
}
