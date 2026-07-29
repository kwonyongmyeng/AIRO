"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
};

/** 화면에 들어오면 0에서 목표값까지 올라가는 카운터. */
export default function CountUp({
  value,
  suffix = "",
  decimals = 0,
  duration = 1400,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = () => {
      if (started.current) return;
      started.current = true;

      if (reduceMotion) {
        setDisplay(value);
        return;
      }

      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(value * eased);
        if (t < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  const format = (n: number) =>
    decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString("ko-KR");

  /**
   * 숫자가 커지면서 폭이 변하면 주변 레이아웃이 밀린다(CLS).
   * 최종값을 투명하게 겹쳐 렌더링해 폭을 미리 확보한다.
   */
  return (
    <span ref={ref} className="inline-grid justify-items-center tabular-nums">
      <span aria-hidden="true" className="invisible [grid-area:1/1]">
        {format(value)}
        {suffix}
      </span>
      <span className="[grid-area:1/1]">
        {format(display)}
        {suffix}
      </span>
    </span>
  );
}
