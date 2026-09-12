"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navItems, site } from "@/data/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(navItems[0].id);
  const [progress, setProgress] = useState(0);

  // 스크롤 상태 + 읽기 진행률
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, y / total) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 현재 보고 있는 섹션 추적(스크롤 스파이)
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // 모바일 메뉴가 열려 있는 동안 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /**
   * 모바일 메뉴에서의 이동.
   * 메뉴가 열려 있는 동안 body에 걸린 스크롤 잠금이 풀리기 전에 앵커 이동이
   * 시작되면 목적지가 어긋난다. 잠금 해제가 반영된 다음 프레임에 이동시킨다.
   */
  const goToSection = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
        history.replaceState(null, "", `#${id}`);
      });
    });
  };

  // ESC로 모바일 메뉴 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        본문으로 건너뛰기
      </a>

      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <a href="#home" className="flex items-center gap-2" aria-label={`${site.brand} 홈`}>
          <Image
            src="/images/AIRO.png"
            alt={site.brand}
            width={112}
            height={36}
            priority
            className="h-7 w-auto sm:h-8"
          />
          <span className="sr-only">{site.brand}</span>
        </a>

        <nav aria-label="주요 메뉴" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                    active === item.id
                      ? "bg-brand-50 text-brand-600"
                      : "text-ink/75 hover:bg-slate-100 hover:text-brand-600"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:inline-flex"
          >
            강의 신청하기
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 bg-current transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${
                  open ? "top-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* 읽기 진행률 바 */}
      <div className="h-0.5 w-full bg-transparent">
        <div
          className="h-full bg-brand-600 transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* 모바일 메뉴 */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="모바일 메뉴" className="container-page py-4">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => goToSection(e, item.id)}
                  className={`block rounded-lg px-3 py-3 text-base font-semibold ${
                    active === item.id ? "bg-brand-50 text-brand-600" : "text-ink"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={(e) => goToSection(e, "contact")}
            className="mt-3 block rounded-full bg-brand-600 px-5 py-3 text-center text-base font-semibold text-white"
          >
            강의 신청하기
          </a>
        </nav>
      </div>
    </header>
  );
}
