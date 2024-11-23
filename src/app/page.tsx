import {
  Github,
  Twitter,
  Mail,
  ArrowRight,
  ExternalLink,
  Rss,
  Mic,
  MapPin,
} from "lucide-react";
import Image from "next/image";

import { NavigationHeader } from "../components/NavigationHeader";
import { Button } from "../components/ui/button";
import { Tooltip } from "../components/ui/tooltip";
import { Code, H3, Paragraph } from "../components/ui/typography";
import { Footer } from "../components/Footer";
import resume from "./resume.json";
import { getYear } from "date-fns/getYear";
import BlueSkyLogo from "./components/CommandPallette/BlueSkyLogo";

function HeroButton({
  href,
  children,
  tooltip,
}: {
  href: string;
  children: React.ReactNode;
  tooltip: string;
}) {
  return (
    <Tooltip title={tooltip}>
      <Button asChild variant="outline" size="icon">
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Button>
    </Tooltip>
  );
}

function InfoBlock({
  title,
  subtitle,
  range,
  children,
  href,
}: {
  title: string;
  subtitle?: string;
  range: string;
  children?: React.ReactNode;
  href?: string;
}) {
  return (
    <div className="flex flex-col gap-2 px-4 max-w-prose mx-auto">
      <div className="flex items-center">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <h4 className="text-mauve-12 dark:text-mauvedark-12 text-lg font-medium">
            {title}
          </h4>
        </a>
        <div className="text-crimson-12 dark:text-crimsondark-11 font-medium">
          {range}
        </div>
      </div>
      <h5 className="font-mono text-mauve-11 dark:text-mauvedark-11 font-medium">
        {subtitle}
      </h5>
      {children && <p>{children}</p>}
    </div>
  );
}

function Project({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="
        flex group 
      "
    >
      <div
        className="
          py-2 w-full
          flex flex-col gap-2
          relative
        "
      >
        <div
          className="
            rounded overflow-hidden
            absolute inset-0 z-[-1] shadow-xl
            opacity-0 transition-opacity group-hover:opacity-100
            group-active:animate-press
        "
        />
        <div
          className="
            rounded overflow-hidden
            border border-mauve-7 group-hover:border-mauve-8 
            dark:border-mauvedark-7 dark:group-hover:border-mauvedark-8 
            bg-mauve-2 hover:bg-mauve-3 
            dark:bg-mauvedark-2 dark:hover:bg-mauvedark-3
            absolute inset-0 z-[-1]
            scale-100 transition-transform group-hover:scale-[1.025]
            group-active:animate-press
        "
        />

        <div className="px-4">
          <h2 className="text-lg font-medium text-mauve-12 dark:text-mauvedark-12">
            {title}
          </h2>
        </div>
        {children && <p className="px-4 font-light">{children}</p>}
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <NavigationHeader />
      <main className="pb-8 md:pb-20">
        <div className="w-full py-8 bg-mauve-4 dark:bg-mauvedark-3 md:mb-16">
          <div className="flex items-center justify-center gap-8 md:gap-10 max-w-prose mx-auto px-4">
            <div className="@container flex flex-col gap-2 md:gap-4 flex-[2.5]">
              <h1 className="text-[11.8cqw] text-mauve-12 dark:text-mauvedark-12 font-semibold">
                {resume.basics.name}
              </h1>

              <div className="flex items-center gap-2">
                <HeroButton href="https://devtools.fm" tooltip="Podcast">
                  <Mic />
                </HeroButton>

                {resume.basics.profiles.map((profile) => (
                  <HeroButton
                    key={profile.network}
                    href={profile.url}
                    tooltip={profile.label}
                  >
                    {(profile.network === "github" && <Github />) ||
                      (profile.network === "twitter" && <Twitter />) ||
                      (profile.network === "bluesky" && (
                        <BlueSkyLogo color="currentColor" />
                      )) || <ExternalLink />}
                  </HeroButton>
                ))}
                <HeroButton
                  href={`mailto:${resume.basics.email}`}
                  tooltip="Email"
                >
                  <Mail />
                </HeroButton>
                <HeroButton href="/rss.xml" tooltip="RSS Feed">
                  <Rss />
                </HeroButton>
                <div className="flex-1" />
                <div
                  className="
                    text-sm text-mauve-11 dark:text-mauvedark-11
                    hidden md:flex items-center gap-2
                  "
                >
                  {resume.basics.location.city}
                  <MapPin size={20} />
                </div>
              </div>
            </div>
            <div className="px-2 flex-1">
              <Image
                width={400}
                height={400}
                src="/profile.jpeg"
                className="
                  rounded-full aspect-square flex-1 
                  border-2 border-mauve-6 dark:border-mauvedark-6
                "
                alt="Andrew smiling"
              />
            </div>
          </div>
        </div>

        <H3>About</H3>
        <Paragraph>{resume.basics.summary}</Paragraph>

        <H3>Work</H3>

        <div className="flex flex-col gap-6 max-w-prose mx-auto">
          {resume.work.map((work) => (
            <InfoBlock
              key={work.name}
              title={work.name}
              subtitle={work.position}
              range={`${getYear(work.startDate)} - ${
                work.endDate ? getYear(work.endDate) : "Present"
              }`}
              href={work.website}
            >
              {work.summary}
            </InfoBlock>
          ))}
        </div>

        <H3>Education</H3>
        {resume.education.map((education) => (
          <InfoBlock
            key={education.institution}
            title={education.institution}
            subtitle={`${education.studyType} - ${education.area}`}
            range={`${getYear(education.startDate)} - ${getYear(
              education.endDate
            )}`}
            href={education.url}
          />
        ))}

        <H3>Skills</H3>
        <ul className="flex flex-wrap gap-2 px-4 max-w-prose mx-auto">
          {resume.skills[0].keywords.map((skill) => (
            <li key={skill}>
              <Code>{skill}</Code>
            </li>
          ))}
        </ul>

        <H3>Projects</H3>

        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 max-w-prose mx-auto">
          <Project href="https://devtools.fm" title="DevtoolsFM">
            A podcast about developer tools and the people who make them.
          </Project>
          <Project href="https://kikbak.tv" title="kikbak.tv">
            Scans 1000s of music blogs daily to create a top 100 list
          </Project>
          <Project
            href="https://github-activity-viewer.vercel.app/"
            title="GitHub Activity Viewer"
          >
            Organizes your GitHub activity feed to find trending repos among
            your network.
          </Project>
          <Project href="https://www.pitchforkify.com/" title="Pitchforkify">
            Combines Pitchfork&apos;s reviews with Spotify&apos;s API for easy
            listening.
          </Project>
          <Project href="https://github.com/intuit/auto" title="intuit/auto">
            Generate releases based on semantic version labels on pull requests.
          </Project>
          <Project
            href="https://github.com/hipstersmoothie/react-docgen-typescript-plugin"
            title="react-docgen-typescript-plugin"
          >
            A webpack plugin to inject react typescript docgen information
          </Project>
          <Project
            href="https://github.com/hipstersmoothie/storybook-dark-mode"
            title="storybook-dark-mode"
          >
            A storybook addon that lets your users toggle between dark and light
            mode.
          </Project>
          <Project
            href="https://github.com/hipstersmoothie?tab=repositories"
            title="And many more..."
          >
            <span className="flex gap-4">
              <span>300+ repositories on GitHub</span> <ArrowRight />
            </span>
          </Project>
        </div>
      </main>
      <Footer />
    </>
  );
}
