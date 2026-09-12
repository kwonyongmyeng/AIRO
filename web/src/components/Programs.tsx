"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { programs } from "@/data/site";

export default function Programs() {
  const [activeId, setActiveId] = useState(programs[0].id);
  const active = programs.find((p) => p.id === activeId) ?? programs[0];

  return (
    <section id="programs" className="bg-slate-50 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="강의 프로그램"
          title="기초부터 전문가 과정까지, 체계적인 AI 커리큘럼"
          description="실무에 바로 적용 가능한 AIRO만의 핵심 커리큘럼입니다. 단계별 학습 로드맵으로 구성되어 있습니다."
        />

        {/* 프로그램 탭 */}
        <Reveal className="mt-12">
          <div
            role="tablist"
            aria-label="강의 프로그램 선택"
            className="flex flex-wrap justify-center gap-2"
          >
            {programs.map((program) => {
              const selected = program.id === active.id;
              return (
                <button
                  key={program.id}
                  type="button"
                  role="tab"
                  id={`tab-${program.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${program.id}`}
                  onClick={() => setActiveId(program.id)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition-colors sm:text-base ${
                    selected
                      ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20"
                      : "border border-line bg-white text-ink/75 hover:border-brand-300 hover:text-brand-600"
                  }`}
                >
                  {program.title}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="mt-10"
        >
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl bg-white p-7 shadow-sm">
              <div>
                <h3 className="text-2xl font-bold">{active.title}</h3>
                <p className="mt-2 text-muted">{active.summary}</p>
              </div>
              <span className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-600">
                총 {active.hours}
              </span>
            </div>
          </Reveal>

          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {active.levels.map((level, i) => (
              <Reveal as="li" key={`${active.id}-${level.level}`} delay={i * 80}>
                <div className="h-full rounded-2xl border border-line bg-white p-7 transition-shadow hover:shadow-xl">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-brand-600">
                      {level.level}
                    </span>
                  </div>
                  <h4 className="mt-4 text-lg font-bold leading-snug">
                    {level.title}
                  </h4>
                  <p className="mt-5 text-xs font-bold tracking-wide text-muted">
                    주요 학습 내용
                  </p>
                  <ul className="mt-3 space-y-2">
                    {level.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-start gap-2 text-sm text-ink/80"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"
                        />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="mt-12">
          <div className="rounded-3xl bg-brand-600 px-8 py-10 text-center text-white sm:px-12">
            <h3 className="text-2xl font-bold">
              어떤 강의를 들어야 할지 고민되시나요?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-brand-100">
              현재 역량과 목표에 맞는 최적의 강의를 추천해 드립니다. 무료 상담을 통해
              당신만의 AI 학습 로드맵을 그려보세요.
            </p>
            <a
              href="#contact"
              className="mt-7 inline-flex rounded-full bg-white px-7 py-3.5 font-semibold text-brand-700 transition-transform hover:-translate-y-0.5"
            >
              상담 신청하기
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
