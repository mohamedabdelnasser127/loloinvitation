import { cn } from "@/lib/utils";

/** Small centred rule with a diamond in the middle, used between sections. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden>
      <span className="h-px w-14 bg-current opacity-30" />
      <span className="size-1.5 rotate-45 bg-current opacity-60" />
      <span className="h-px w-14 bg-current opacity-30" />
    </div>
  );
}

/** Uppercase letterspaced label used above section headings. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("eyebrow text-ember", className)}>{children}</p>;
}

/** Section heading with optional italic subtitle underneath. */
export function SectionHeading({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-2 font-[family-name:var(--font-display)] text-lg text-ember-soft italic">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
