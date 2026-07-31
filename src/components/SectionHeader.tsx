export function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      {eyebrow && <p className="text-sm font-black uppercase tracking-[0.24em] text-[#1f5fa6]">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-black tracking-tight text-[#1c2b47] sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-8 text-[#4b5b74]">{text}</p>}
    </div>
  );
}
