"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { inquiryTypes, programs, scheduleOptions, site } from "@/data/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: inquiryTypes[1],
    program: programs[0].title,
    schedule: scheduleOptions[0],
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof typeof form) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "성함 또는 담당자명을 입력해 주세요.";
    if (!form.email.trim()) next.email = "이메일 주소를 입력해 주세요.";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "올바른 이메일 형식이 아닙니다.";
    if (form.message.trim().length < 10)
      next.message = "문의 내용을 10자 이상 입력해 주세요.";
    return next;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    // MVP 범위: 서버 전송 없이 접수 확인 화면만 노출한다.
    setSubmitted(true);
  };

  /** 접수 내용을 그대로 담은 메일 링크 (백엔드 없이 실제 발송 가능한 경로) */
  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `[AIRO ${form.type}] ${form.name || "문의"}`,
  )}&body=${encodeURIComponent(
    [
      `이름/기업명: ${form.name}`,
      `회신 이메일: ${form.email}`,
      `문의 유형: ${form.type}`,
      `관심 강의: ${form.program}`,
      `희망 일정: ${form.schedule}`,
      "",
      form.message,
    ].join("\n"),
  )}`;

  const fieldClass =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500";

  return (
    <section id="contact" className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="문의하기"
          title="지금 바로 상담을 시작하세요"
          description="귀하의 조직에 가장 적합한 AI 교육 커리큘럼을 제안해 드립니다."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          {/* 신청 폼 */}
          <Reveal>
            <div className="rounded-3xl border border-line p-7 sm:p-9">
              {submitted ? (
                <div className="py-10 text-center">
                  <div
                    aria-hidden="true"
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-2xl text-brand-600"
                  >
                    ✓
                  </div>
                  <h3 className="mt-5 text-xl font-bold">신청이 접수되었습니다</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    입력하신 내용을 확인한 뒤 영업일 기준 1일 이내에 회신드립니다.
                    <br />
                    바로 메일로 보내시려면 아래 버튼을 눌러 주세요.
                  </p>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <a
                      href={mailtoHref}
                      className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white"
                    >
                      메일로 전송하기
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink/75"
                    >
                      다시 작성하기
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="text-sm font-semibold">
                        이름 / 기업명 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={(e) => update("name")(e.target.value)}
                        placeholder="성함을 입력해 주세요"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`mt-2 ${fieldClass} ${
                          errors.name ? "border-red-400" : ""
                        }`}
                      />
                      {errors.name ? (
                        <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-500">
                          {errors.name}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="email" className="text-sm font-semibold">
                        이메일 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        value={form.email}
                        onChange={(e) => update("email")(e.target.value)}
                        placeholder="example@company.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`mt-2 ${fieldClass} ${
                          errors.email ? "border-red-400" : ""
                        }`}
                      />
                      {errors.email ? (
                        <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-500">
                          {errors.email}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-3">
                    <div>
                      <label htmlFor="type" className="text-sm font-semibold">
                        문의 유형
                      </label>
                      <select
                        id="type"
                        value={form.type}
                        onChange={(e) => update("type")(e.target.value)}
                        className={`mt-2 ${fieldClass}`}
                      >
                        {inquiryTypes.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="program" className="text-sm font-semibold">
                        강의 선택
                      </label>
                      <select
                        id="program"
                        value={form.program}
                        onChange={(e) => update("program")(e.target.value)}
                        className={`mt-2 ${fieldClass}`}
                      >
                        {programs.map((program) => (
                          <option key={program.id}>{program.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="schedule" className="text-sm font-semibold">
                        희망 일정
                      </label>
                      <select
                        id="schedule"
                        value={form.schedule}
                        onChange={(e) => update("schedule")(e.target.value)}
                        className={`mt-2 ${fieldClass}`}
                      >
                        {scheduleOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-semibold">
                      문의 및 요청사항 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message")(e.target.value)}
                      placeholder="강의 인원, 장소, 특별히 배우고 싶은 내용 등을 입력해 주세요."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`mt-2 resize-y ${fieldClass} ${
                        errors.message ? "border-red-400" : ""
                      }`}
                    />
                    {errors.message ? (
                      <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-500">
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="mt-1 w-full rounded-full bg-brand-600 px-6 py-4 font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    신청 완료하기
                  </button>
                  <p className="text-center text-xs text-muted">
                    제출 시 개인정보처리방침에 동의하시는 것으로 간주됩니다.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* 빠른 상담 채널 */}
          <Reveal delay={120}>
            <div className="rounded-3xl bg-brand-900 p-8 text-white">
              <h3 className="text-lg font-bold">빠른 상담 채널</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-100">
                강의 문의, 협업 제안 등 궁금한 점이 있다면 언제든 연락해 주세요.
              </p>

              <dl className="mt-7 space-y-5 text-sm">
                <div>
                  <dt className="text-brand-200">이메일 문의</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${site.email}`} className="font-semibold hover:underline">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-brand-200">전화 상담</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${site.phone.replace(/-/g, "")}`}
                      className="font-semibold hover:underline"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-brand-200">상담 가능 시간</dt>
                  <dd className="mt-1 font-semibold leading-relaxed">
                    {site.officeHours}
                  </dd>
                </div>
              </dl>

              <a
                href={`mailto:${site.email}`}
                className="mt-8 flex w-full items-center justify-center rounded-xl bg-kakao px-5 py-3.5 text-sm font-bold text-[#3c1e1e] transition-transform hover:-translate-y-0.5"
              >
                카카오톡 상담 시작
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
