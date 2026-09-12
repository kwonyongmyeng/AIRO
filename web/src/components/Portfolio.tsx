"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { outcomes, portfolio } from "@/data/site";

const ALL = "전체";

export default function Portfolio() {
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(portfolio.map((p) => p.category)))],
    [],
  );
  const [filter, setFilter] = useState(ALL);

  const visible = portfolio.filter(
    (item) => filter === ALL || item.category === filter,
  );

  return (
    <section id="portfolio" className="bg-slate-50 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="포트폴리오"
          title="수많은 기업·기관·대학과 함께 만든 성공 사례"
          description="현장에서 검증된 AI 교육 프로젝트를 확인하세요."
        />

        <Reveal className="mt-12">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === category
                    ? "bg-brand-600 text-white"
                    : "border border-line bg-white text-ink/70 hover:text-brand-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 60}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-xl">
                <span className="w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
                  {item.category}
                </span>
                <h3 className="mt-4 text-lg font-bold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-ink/70"
                    >
                      #{tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* 교육 성과 */}
        <Reveal className="mt-14">
          <div className="rounded-3xl border border-line bg-white p-8 sm:p-10">
            <h3 className="text-xl font-bold">교육 전후 성과 비교</h3>
            <p className="mt-2 text-sm text-muted">
              AI 교육 전후의 변화를 수치로 확인하세요.
            </p>

            <ul className="mt-8 space-y-7">
              {outcomes.map((outcome) => (
                <li key={outcome.label}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold">{outcome.label}</p>
                    <p className="text-sm text-muted">
                      교육 전 {outcome.before} →{" "}
                      <strong className="font-bold text-brand-600">
                        교육 후 {outcome.after}
                      </strong>
                    </p>
                  </div>
                  <div
                    className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100"
                    role="img"
                    aria-label={`${outcome.label}: 교육 전 ${outcome.before}, 교육 후 ${outcome.after}`}
                  >
                    <div
                      className="h-full rounded-full bg-brand-600"
                      style={{ width: `${Math.round(outcome.ratio * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
