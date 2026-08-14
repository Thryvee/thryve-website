interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalContentProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export default function LegalContent({ title, updated, intro, sections }: LegalContentProps) {
  return (
    <section className="w-full bg-white px-6 pt-40 pb-24 md:px-16 md:pt-48">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl leading-tight text-black md:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-black/40">Last updated {updated}</p>
        <p className="mt-8 text-base leading-relaxed text-black/70">{intro}</p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-xl text-black md:text-2xl">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-sm leading-relaxed text-black/60 md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
