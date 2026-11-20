import Image from "next/image";
import makeClass from "clsx";
import type { Project } from "../projects";

/** A project's icon at a given size. TV-shaped icons (Channel Surf) get a 5:3 box. */
export function ProjectIcon({
  project,
  size,
  className,
}: {
  project: Project;
  size: number;
  className?: string;
}) {
  if (!project.icon) {
    return (
      <div
        className={makeClass("bg-[var(--p-accent)] squircle", className)}
        style={{ width: size, height: size, borderRadius: size * 0.2237 }}
      />
    );
  }

  const tv = project.iconAspect === "tv";
  const width = tv ? Math.round(size * 1.6) : size;
  const height = tv ? Math.round(size * 0.96) : size;
  const style = { width, height, borderRadius: tv ? size * 0.2 : size * 0.2237 };
  const padded = "squircle shadow-[0_1px_0_rgba(255,255,255,.06)_inset,0_0_0_1px_var(--hair)]";

  if (project.icon.endsWith(".svg")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={project.icon} alt="" style={style} className={makeClass(padded, className)} />
    );
  }

  return (
    <Image
      src={project.icon}
      alt=""
      width={width * 2}
      height={height * 2}
      style={style}
      className={makeClass(padded, className)}
    />
  );
}
