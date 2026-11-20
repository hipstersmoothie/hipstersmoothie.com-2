import Image from "next/image";
import Link from "next/link";
import { getYear } from "date-fns/getYear";
import { format } from "date-fns/format";

import { NavigationHeader } from "../components/NavigationHeader";
import { Footer } from "../components/Footer";
import { FeaturedBento } from "./projects/components/ProjectTiles";
import { getBlogPostList } from "./blog/utils";
import resume from "./resume.json";

const wrap = "max-w-[1180px] mx-auto px-6";

function SectionHead({ title, more, href }: { title: string; more: string; href: string }) {
  return (
    <div className="mb-10 flex items-baseline justify-between gap-6">
      <h2 className="headline text-[clamp(28px,3.4vw,40px)] text-ink">{title}</h2>
      <Link href={href} className="text-[15px] text-ink-2 hover:text-ink whitespace-nowrap">
        {more} ›
      </Link>
    </div>
  );
}

const heroLinks = [
  ["GitHub", "https://github.com/hipstersmoothie"],
  ["Bluesky", "https://bsky.app/profile/hipstersmoothie.com"],
  ["devtools.fm", "https://devtools.fm"],
  ["Email", `mailto:${resume.basics.email}`],
  ["RSS", "/rss.xml"],
];

export default async function Home() {
  const posts = (await getBlogPostList()).slice(0, 4);

  return (
    <>
      <NavigationHeader />
      <main>
        {/* Hero: name as the headline, tagline under it, portrait filling the right half. */}
        <header className="pt-12 pb-14 md:pt-[72px] md:pb-16">
          <div className={`${wrap} grid grid-cols-1 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-8 md:gap-12 items-center`}>
            <Image
              src="/profile.jpeg"
              width={400}
              height={400}
              priority
              alt="Andrew smiling"
              className="w-full max-w-[200px] md:max-w-[420px] aspect-square object-cover rounded-tile shadow-tile md:order-2 md:justify-self-end"
            />
            <div>
              <h1 className="headline text-[clamp(44px,6.6vw,84px)] text-ink">{resume.basics.name}</h1>
              <p className="lede mt-[22px] max-w-[560px] !text-[18px]">
                Front-end engineer on the design system at Snowflake; before that Descript and Intuit. Building good
                UI is easy, building great UI is hard, and that&apos;s the part I like. I co-host{" "}
                <a href="https://devtools.fm" className="underline underline-offset-4 decoration-ink-3 hover:decoration-ink">
                  devtools.fm
                </a>{" "}
                and spend nights and nap times building on the AT Protocol.
              </p>
              <ul className="mt-7 flex flex-wrap gap-x-[26px] gap-y-2.5 text-[15px]">
                {heroLinks.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-ink-2 hover:text-ink"
                    >
                      {label} ›
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>

        <section id="projects" className="py-16">
          <div className={wrap}>
            <SectionHead title="Projects" more="All projects" href="/projects" />
            <FeaturedBento />
          </div>
        </section>

        <section className="py-16 bg-ground-alt">
          <div className={wrap}>
            <SectionHead title="Work" more="Resume" href="/resume" />
            <ol className="rows">
              {resume.work.map((work) => (
                <li key={work.name}>
                  <a href={work.website} target="_blank" rel="noopener noreferrer" className="row">
                    <span className="row-title">{work.name}</span>
                    <span className="row-meta">
                      {getYear(work.startDate)} – {work.endDate ? getYear(work.endDate) : "now"}
                    </span>
                    <span className="row-sub">
                      {work.position} · {work.highlight}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-24">
          <div className={wrap}>
            <SectionHead title="Writing" more="All posts" href="/blog" />
            <ol className="rows">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/posts/${post.slug}`} className="row">
                    <span className="row-title">{post.title}</span>
                    <span className="row-meta">{format(post.creationDate, "MMM yyyy")}</span>
                    {post.frontMatter.description && (
                      <span className="row-sub">{post.frontMatter.description}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
