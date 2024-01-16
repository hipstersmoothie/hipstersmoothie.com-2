import { Github, Twitter, Mail } from "lucide-react";

import { NavigationHeader } from "../components/NavigationHeader";
import { Button } from "../components/ui/button";
import { Code, H3, H4, Paragraph } from "../components/ui/typography";

const skills = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node",
  "Accessibility",
  "Design Systems",
  "CSS",
  "HTML",
  "Playwright",
  "Build Tooling",
  "Release Automation",
];

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
          <h4 className="text-mauve-12 dark:text-mauvedark-12 text-lg font-semibold">
            {title}
          </h4>
        </a>
        <div className="text-crimson-12 dark:text-crimsondark-11 font-medium">
          {range}
        </div>
      </div>
      <h5 className="font-mono text-mauve-11 dark:text-mauvedark-11">
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
        scale-100 transition-transform hover:scale-[1.025]
      "
    >
      <div
        className="
          py-2
          flex flex-col gap-2 rounded overflow-hidden
          border border-mauve-6 hover:border-mauve-8 
          dark:border-mauvedark-6 dark:hover:border-mauvedark-8 
          bg-mauve-2 hover:bg-mauve-3 
          dark:bg-mauvedark-2 dark:hover:bg-mauvedark-3
          relative
        "
      >
        <div
          className="
            absolute inset-0 z-[-1] shadow-xl opacity-0 transition-opacity
            group-hover:opacity-100
          "
        />
        <div className="px-4">
          <h2 className="text-lg font-semibold text-mauve-12 dark:text-mauvedark-12">
            {title}
          </h2>
        </div>
        {children && <p className="px-4">{children}</p>}
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <NavigationHeader />
      <main className="pb-8 md:pb-20">
        <div className="w-full py-8 bg-mauve-3 dark:bg-mauvedark-3 md:mb-16">
          <div className="flex items-center justify-center gap-2 md:gap-10 max-w-prose mx-auto px-4">
            <div className="flex flex-col gap-2 md:gap-4 flex-1">
              <h1 className="text-2xl md:text-5xl text-mauve-12 dark:text-mauvedark-12">
                Andrew Lisowski
              </h1>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="icon">
                  <a href="mailto:lisowski54@gmail.com">
                    <Mail />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon">
                  <a
                    href="https://github.com/hipstersmoothie"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon">
                  <a
                    href="https://twitter.com/hipstersmoothie"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter />
                  </a>
                </Button>
              </div>
            </div>
            <div className="px-2 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://pbs.twimg.com/profile_images/1685360377754947584/PhKnYmq-_400x400.jpg"
                className="rounded-full h-24 w-24 md:h-40 md:w-40 border-2 border-mauve-6 dark:border-mauvedark-6"
                alt="Andrew smiling"
              />
            </div>
          </div>
        </div>

        <H3>About</H3>
        <Paragraph>
          I&apos;m a Front End Engineer with a passion for sweating the details.
          Building good UI is easy, building great UI is hard. I love the
          challenge of creating interfaces that are both beautiful and
          functional for a wide range of users.
        </Paragraph>

        <H3>Work</H3>

        <div className="flex flex-col gap-6 max-w-prose mx-auto">
          <InfoBlock
            title="Descript"
            subtitle="Senior Full Stack Developer"
            range="2021 - Present"
            href="https://descript.com/"
          >
            Implemented a new design system and component library to completely
            redesign the app, modernized the codebase into a proper monorepo,
            helped bring the electron app to the web, and implemented an E2E
            testing framework on top of playwright.
          </InfoBlock>

          <InfoBlock
            title="Intuit - TurboTax"
            subtitle="Intern => Senior Front End Developer"
            range="2013 - 2021"
            href="https://intuit.com/"
          >
            Interned on 3 different product teams, getting hired on full time in
            2016 to work on a client rendering library and a design system. That
            eventually led to my team being leaders in the design systems and
            front end tooling space at the company, eventually leading to me
            becoming the &ldquo;Open Source Leader&rdquo; for the San Diego
            office.
          </InfoBlock>
        </div>

        <H3>Education</H3>
        <InfoBlock
          title="Cal Poly, San Luis Obispo"
          subtitle="Bachelor's Degree in Computer Science"
          range="2011 - 2016"
          href="https://calpoly.edu/"
        />

        <H3>Skills</H3>
        <ul className="flex flex-wrap gap-2 px-4 max-w-prose mx-auto">
          {skills.map((skill) => (
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
        </div>
      </main>
    </>
  );
}
