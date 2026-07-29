import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: Props) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <Reveal className={`flex flex-col gap-4 ${alignment}`}>
      <span
        className={`inline-flex rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide ${
          tone === "dark"
            ? "bg-white/10 text-brand-100"
            : "bg-brand-50 text-brand-600"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`text-3xl font-bold leading-tight sm:text-4xl ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`max-w-2xl text-base leading-relaxed sm:text-lg ${
            tone === "dark" ? "text-brand-100" : "text-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
