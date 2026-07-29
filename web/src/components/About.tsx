import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import {
  career,
  certificates,
  education,
  highlights,
  method,
  site,
} from "@/data/site";

export default function About() {
  return (
    <section id="about" className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="강사 소개"
          title={`AI 기술의 대중화를 선도하는 ${site.ownerName} 대표`}
          description="복잡한 AI 기술을 누구나 이해할 수 있는 언어로 번역하여 전달합니다."
        />

        {/* 프로필 */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="rounded-3xl border border-line bg-slate-50 p-8">
              {site.ownerPhoto ? (
                <Image
                  src={site.ownerPhoto}
                  alt={`${site.ownerName} 대표 프로필 사진`}
                  width={112}
                  height={112}
                  className="h-28 w-28 rounded-2xl object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-24 w-24 items-center justify-center rounded-2xl bg-brand-600 text-3xl font-bold text-white"
                >
                  {site.ownerName.slice(0, 1)}
                </div>
              )}
              <h3 className="mt-6 text-2xl font-bold">
                {site.ownerName}{" "}
                <span className="text-base font-medium text-muted">
                  ({site.ownerNameEn})
                </span>
              </h3>
              <p className="mt-1 text-sm font-semibold text-brand-600">
                {site.ownerRole}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                AIRO의 설립자이자 대표 강사인 {site.ownerName} 대표는 복잡한 AI
                기술을 누구나 이해할 수 있는 언어로 번역하여 전달하는{" "}
                <strong className="font-semibold text-ink">{site.tagline}</strong>
                입니다. 수년간의 실무 경험과 수천 시간의 강의 경력을 바탕으로, 단순한
                도구 사용법을 넘어 AI와 협업하는 사고방식을 전파하고 있습니다.
              </p>

              <h4 className="mt-8 text-sm font-bold text-ink">주요 강의 이력</h4>
              <ul className="mt-3 space-y-2.5">
                {highlights.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* 강의 철학 */}
          <div>
            <Reveal>
              <h3 className="text-xl font-bold">강의 철학 — AIRO Method</h3>
              <p className="mt-2 text-sm text-muted">
                AIRO는 네 가지 원칙 위에서 커리큘럼을 설계합니다.
              </p>
            </Reveal>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {method.map((item, i) => (
                <Reveal as="li" key={item.key} delay={i * 70}>
                  <div className="h-full rounded-2xl border border-line p-6 transition-shadow hover:shadow-lg">
                    <span className="text-2xl font-bold text-brand-600">
                      {item.key}
                    </span>
                    <h4 className="mt-3 font-bold">
                      {item.title}{" "}
                      <span className="text-sm font-medium text-muted">
                        {item.korean}
                      </span>
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* 학력 / 경력 */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <h3 className="text-xl font-bold">학력</h3>
            </Reveal>
            <ol className="mt-6 space-y-6 border-l-2 border-line pl-6">
              {education.map((item, i) => (
                <Reveal as="li" key={item.school} delay={i * 70} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-brand-600"
                  />
                  <p className="text-sm font-semibold text-brand-600">
                    {item.period}
                  </p>
                  <p className="mt-1 font-bold">{item.school}</p>
                  <p className="text-sm text-ink/80">{item.degree}</p>
                  <p className="mt-1 text-sm text-muted">{item.note}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <Reveal>
              <h3 className="text-xl font-bold">경력</h3>
            </Reveal>
            <ol className="mt-6 space-y-6 border-l-2 border-line pl-6">
              {career.map((item, i) => (
                <Reveal as="li" key={item.company} delay={i * 70} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-brand-600"
                  />
                  <p className="text-sm font-semibold text-brand-600">
                    {item.period}
                  </p>
                  <p className="mt-1 font-bold">
                    {item.company}{" "}
                    <span className="text-sm font-medium text-muted">
                      · {item.role}
                    </span>
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm text-muted">
                        <span aria-hidden="true">·</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        {/* 인증 및 자격 */}
        <Reveal className="mt-14">
          <h3 className="text-xl font-bold">인증 및 자격</h3>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {certificates.map((cert) => (
              <li
                key={cert}
                className="rounded-full border border-line bg-slate-50 px-4 py-2 text-sm font-medium text-ink/80"
              >
                {cert}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
