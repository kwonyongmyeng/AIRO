import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { testimonials } from "@/data/site";

export default function Reviews() {
  return (
    <section id="reviews" className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="수강 후기"
          title="수강생이 직접 증명하는 AIRO 교육의 가치"
          description="AIRO와 함께 성장한 분들의 생생한 목소리입니다."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item, i) => (
            <Reveal as="li" key={item.name + item.role} delay={(i % 4) * 70}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-slate-50 p-6">
                <div
                  className="text-sm text-amber-500"
                  role="img"
                  aria-label="별점 5점 만점에 5점"
                >
                  ★★★★★
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/85">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4 text-sm">
                  <span className="font-bold">{item.name}</span>
                  <span className="text-muted"> · {item.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
