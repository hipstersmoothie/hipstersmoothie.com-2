import path from "path";
import { promises as fs } from "fs";
import glob from "fast-glob";
import { $ } from "execa";

const dir = path.dirname(import.meta.url).replace("file://", "");

export async function getExperimentList() {
  const experiments = (
    await Promise.all(
      glob
        .sync(`${dir}/**/page.tsx`, {
          deep: 2,
        })
        .map(async (filepath) => {
          const fileDir = filepath.replace("/page.tsx", "");
          const experimentName = path.basename(fileDir);
          const experimentPath = fileDir.replace(`${dir}/`, "");

          const { birthtime } = await fs.stat(filepath);
          const { stdout } =
            await $`git log --diff-filter=A --format=%aI ${filepath}`;
          const creationDate = new Date(stdout || birthtime);

          return {
            slug: experimentName,
            path: experimentPath,
            creationDate,
          };
        })
    )
  )
    .filter((experiment) => experiment.slug !== "experiments")
    .sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());

  return experiments;
}

export type Experiment = Awaited<ReturnType<typeof getExperimentList>>[number];
