import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { solutions } from "@/data/site";

export default function Solutions() {
  return (
    <section id="solutions" className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="대상별 솔루션"
          title="조직의 특성과 목표에 맞춘 최적의 AI 교육"
          description="기업의 생산성 향상, 정부기관의 디지털 전환, 대학의 미래 인재 양성까지. 각 조직에 최적화된 커리큘럼을 제공합니다."
        />

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {solutions.map((solution, i) => (
            <Reveal as="li" key={solution.id} delay={i * 90}>
              <div className="flex h-full flex-col rounded-3xl border border-line p-8 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl">
                <p className="text-sm font-semibold tracking-wide text-brand-500">
                  {solution.titleEn}
                </p>
                <h3 className="mt-2 text-xl font-bold">{solution.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {solution.summary}
                </p>

                <ul className="mt-7 space-y-5 border-t border-line pt-6">
                  {solution.items.map((item) => (
                    <li key={item.name}>
                      <p className="text-sm font-bold text-ink">{item.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline"
                >
                  견적 요청하기
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
