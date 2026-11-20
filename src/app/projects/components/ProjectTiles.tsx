import makeClass from "clsx";

import { featuredProjects, homeProjects, otherProjects, paletteStyle, type Project } from "../projects";
import { ProjectIcon } from "./ProjectIcon";
import { TileArt } from "./TileArt";

function ProjectLink({
  project,
  className,
  style,
  children,
}: {
  project: Project;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const external = project.href.startsWith("http");
  return (
    <a
      href={project.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}

const tileBase = `
  palette relative overflow-hidden rounded-tile
  bg-[var(--p-bg)] text-[var(--p-ink)]
  transition-[transform,box-shadow] duration-300 [transition-timing-function:cubic-bezier(.2,.8,.2,1)]
  hover:-translate-y-0.5 hover:shadow-tile
`;

/** The home page bento: the first two featured projects full width, the rest two-up. */
export function FeaturedBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {homeProjects.map((project, i, all) => {
        // Wide tiles are chosen in the data; a small tile left alone on the last row runs wide too.
        const smallCount = all.filter((p) => !p.wide).length;
        const wide = project.wide || (i === all.length - 1 && smallCount % 2 === 1);
        return (
          <ProjectLink
            key={project.slug}
            project={project}
            style={paletteStyle(project)}
            className={makeClass(
              tileBase,
              "grid grid-rows-[auto_1fr]",
              wide
                ? "md:col-span-2 md:min-h-[520px] md:grid-rows-none md:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] md:items-center"
                : "min-h-[420px]"
            )}
          >
            <div className={makeClass("px-9 pt-9", wide && "md:p-12")}>
              <ProjectIcon
                project={project}
                size={wide ? 84 : 44}
                className={makeClass("mb-5", wide && "md:mb-6", project.iconAspect === "tv" && "shadow-[0_10px_28px_rgba(0,0,0,.35)]")}
              />
              <h3
                className={makeClass(
                  "font-bold tracking-[-0.03em] leading-[1.08]",
                  wide ? "text-[clamp(32px,3.6vw,48px)]" : "text-[clamp(26px,2.6vw,34px)]"
                )}
              >
                {project.name}
              </h3>
              <p className="mt-2.5 text-[17px] text-[var(--p-ink2)] max-w-[34ch]">{project.description}</p>
              <div className="mt-[18px] flex flex-wrap gap-2 text-[13px] text-[var(--p-ink2)]">
                <b className="font-semibold text-[var(--p-accent)]">{project.platforms}</b>
                <span>·</span>
                <span>{project.years}</span>
                {project.price && (
                  <>
                    <span>·</span>
                    <span>{project.price}</span>
                  </>
                )}
              </div>
            </div>
            <div className={makeClass("relative min-h-[260px]", wide && "md:self-stretch md:min-h-0")}>
              <TileArt slug={project.slug} />
            </div>
          </ProjectLink>
        );
      })}
    </div>
  );
}

/** The projects index: every featured project the same size. */
export function FeaturedCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {featuredProjects.map((project) => (
        <ProjectLink
          key={project.slug}
          project={project}
          style={paletteStyle(project)}
          className={makeClass(tileBase, "flex flex-col gap-1.5 p-7 min-h-[300px]")}
        >
          <ProjectIcon project={project} size={44} className="mb-3.5" />
          <h3 className="text-[26px] font-bold tracking-[-0.03em]">{project.name}</h3>
          <p className="text-[15px] text-[var(--p-ink2)]">{project.tagline}</p>
          <span className="mt-auto pt-[22px] text-[13px] text-[var(--p-ink2)]">
            <b className="font-semibold text-[var(--p-accent)]">{project.platforms}</b> · {project.years}
          </span>
        </ProjectLink>
      ))}
    </div>
  );
}

/** The long tail: name, kind, year, one line. */
export function ProjectRows({ projects = otherProjects }: { projects?: Project[] }) {
  return (
    <ol className="rows">
      {projects.map((project) => (
        <li key={project.slug}>
          <a
            href={project.href}
            target={project.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="row"
          >
            <span className="row-title">
              {project.name}
              <span className="ml-2.5 align-middle inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-tile text-ink-2">
                {project.kind}
              </span>
            </span>
            <span className="row-meta">{project.years}</span>
            <span className="row-sub">{project.tagline}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
