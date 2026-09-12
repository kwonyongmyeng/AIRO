import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { insights, resources } from "@/data/site";

export default function Insights() {
  return (
    <section id="insights" className="bg-slate-50 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="인사이트"
          title="최신 AI 트렌드와 실전 활용법"
          description="AIRO가 전하는 깊이 있는 지식과 무료 자료를 만나보세요."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((post, i) => (
            <Reveal as="li" key={post.title} delay={(i % 3) * 80}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-xl">
                <span className="w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
                  {post.category}
                </span>
                <h3 className="mt-4 text-lg font-bold leading-snug">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {post.desc}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  자세히 읽기 <span aria-hidden="true">→</span>
                </span>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* 무료 자료실 */}
        <div className="mt-16">
          <Reveal>
            <h3 className="text-xl font-bold">무료 자료실</h3>
            <p className="mt-2 text-sm text-muted">
              성장을 돕는 AI 실전 가이드와 템플릿을 지금 바로 활용해 보세요.
            </p>
          </Reveal>

          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {resources.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-dashed border-brand-200 bg-white p-6">
                  <span className="text-xs font-semibold text-brand-500">
                    {item.category}
                  </span>
                  <h4 className="mt-2 font-bold leading-snug">{item.title}</h4>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {item.desc}
                  </p>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex w-fit rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-50"
                  >
                    다운로드 신청
                  </a>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
