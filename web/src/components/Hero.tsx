import Image from "next/image";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import { site, stats } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-brand-900 pt-28 pb-20 text-white sm:pt-36 sm:pb-24"
    >
      {/* 배경 장식 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60rem 40rem at 15% 0%, rgba(31,92,187,0.55), transparent 60%), radial-gradient(45rem 35rem at 95% 20%, rgba(74,127,212,0.35), transparent 65%)",
        }}
      />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold text-brand-100">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-200" aria-hidden="true" />
              {site.tagline} · {site.ownerRole}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl font-bold leading-[1.2] sm:text-5xl lg:text-[3.4rem]">
              AI와 함께 여는
              <br />
              <span className="text-brand-200">새로운 미래의 문</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-100 sm:text-lg">
              {site.ownerName} 대표의 AIRO Method를 통해 복잡한 AI 기술을 실전 업무와
              창의적 활동의 강력한 도구로 변화시키세요.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-700 transition-transform hover:-translate-y-0.5"
              >
                강의 신청하기
              </a>
              <a
                href="#programs"
                className="rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                프로그램 보기
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="justify-self-center lg:justify-self-end">
          <div className="relative w-64 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm sm:w-72">
            <div className="flex h-40 items-center justify-center rounded-2xl bg-white px-6">
              <Image
                src="/images/AIRO.png"
                alt="AIRO 로고"
                width={200}
                height={64}
                priority
                className="h-auto w-full"
              />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-brand-100">
              &ldquo;AI는 도구일 뿐입니다. 어떻게 활용하느냐가 당신의 가치를
              결정합니다.&rdquo;
            </p>
            <p className="mt-3 text-sm font-semibold text-white">
              — {site.ownerName} 대표
            </p>
          </div>
        </Reveal>
      </div>

      {/* 핵심 지표 */}
      <div className="container-page relative mt-16">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-brand-900/70 px-5 py-7 text-center">
              <dt className="text-sm text-brand-100">{stat.label}</dt>
              <dd className="mt-2 text-3xl font-bold text-white">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
