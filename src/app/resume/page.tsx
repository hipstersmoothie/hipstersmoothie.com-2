import type { Metadata } from "next";
import { getYear } from "date-fns/getYear";
import { format } from "date-fns/format";

import { NavigationHeader } from "../../components/NavigationHeader";
import { Footer } from "../../components/Footer";
import { PageHeader } from "../../components/ui/PageHeader";
import resume from "../resume.json";

export const metadata: Metadata = {
  title: "Résumé · Andrew Lisowski",
  description: resume.basics.summary,
};

const wrap = "max-w-[1180px] mx-auto px-6";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-12 first:pt-4">
      <div className={`${wrap} grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-12`}>
        <h2 className="eyebrow md:pt-[26px]">{title}</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

/** A dated entry: a heading row (name · range), a subheading, then the summary. */
function Entry({
  title,
  href,
  subtitle,
  range,
  children,
}: {
  title: string;
  href?: string;
  subtitle?: string;
  range: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="py-6 border-b border-hair first:border-t">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-ink">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-ink-3">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <span className="text-[15px] text-ink-3 tabular-nums">{range}</span>
      </div>
      {subtitle && <p className="mt-1 text-[17px] text-ink-2">{subtitle}</p>}
      {children && <p className="mt-3 text-[17px] leading-relaxed text-ink-2 max-w-[640px]">{children}</p>}
    </div>
  );
}

function year(date: string) {
  return getYear(new Date(date));
}

export default function ResumePage() {
  const { basics, work, education, skills } = resume;

  return (
    <>
      <NavigationHeader />
      <PageHeader
        subtitle={basics.summary}
        action={
          <a href={`mailto:${basics.email}`} className="pill pill-quiet flex-shrink-0">
            Email me
          </a>
        }
      >
        Résumé
      </PageHeader>
      <main className="pb-16">
        <Section title="Work">
          {work.map((job) => (
            <Entry
              key={job.name}
              title={job.name}
              href={job.website}
              subtitle={`${job.position} · ${job.location}`}
              range={`${year(job.startDate)} – ${job.endDate ? year(job.endDate) : "now"}`}
            >
              {job.summary}
            </Entry>
          ))}
        </Section>

        <Section title="Education">
          {education.map((school) => (
            <Entry
              key={school.institution}
              title={school.institution}
              href={school.url}
              subtitle={`${school.studyType}, ${school.area}`}
              range={`${year(school.startDate)} – ${year(school.endDate)}`}
            />
          ))}
        </Section>

        <Section title="Skills">
          <ul className="flex flex-wrap gap-2 pt-1">
            {skills[0].keywords.map((skill) => (
              <li key={skill} className="text-[15px] px-3.5 py-1.5 rounded-full bg-ground-alt text-ink">
                {skill}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Elsewhere">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-[17px]">
            {basics.profiles.map((profile) => (
              <li key={profile.network}>
                <a href={profile.url} target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-ink">
                  {profile.label} ›
                </a>
              </li>
            ))}
            <li>
              <a href="https://devtools.fm" target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-ink">
                devtools.fm ›
              </a>
            </li>
            <li>
              <span className="text-ink-2">{basics.location.city}</span>
            </li>
          </ul>
          <p className="mt-6 text-[14px] text-ink-3">
            Last updated {format(new Date(), "MMMM yyyy")} ·{" "}
            <a href="/resume.json" className="underline underline-offset-4 decoration-ink-3 hover:text-ink">
              JSON
            </a>
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
