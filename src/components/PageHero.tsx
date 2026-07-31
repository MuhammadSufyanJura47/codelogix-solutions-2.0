import Link from "next/link";

type PageHeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
  actions?: PageHeroAction[];
  badge?: string;
};

export function PageHero({ eyebrow, title, text, actions = [], badge }: PageHeroProps) {
  return (
    <section className="page-hero section-shell min-h-[100svh] py-10 sm:py-12 lg:py-16">
      <div className="relative flex min-h-[calc(100svh-5rem)] items-center overflow-hidden rounded-[2rem] px-0">
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <div className="hero-grid-overlay" aria-hidden="true" />
        <div className="relative max-w-4xl">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#1f5fa6]">{eyebrow}</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-[#14213d] sm:text-5xl lg:text-6xl">{title}</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#4b5b74] sm:text-lg">{text}</p>
            {(actions.length > 0 || badge) && (
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                {actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={action.variant === "secondary" ? "btn-secondary justify-center" : "btn-primary justify-center"}
                  >
                    {action.label}
                  </Link>
                ))}
                {badge && <p className="text-sm font-semibold text-[#4b5b74] sm:max-w-xs">{badge}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}