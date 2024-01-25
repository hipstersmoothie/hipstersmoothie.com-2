import path from "path";
import { promises as fs } from "fs";
import glob from "fast-glob";
import { $ } from "execa";
import { capitalCase } from "change-case";
import { readFile } from "fs/promises";

const dir = path.dirname(import.meta.url).replace("file://", "");

async function parseExperiment(filepath: string) {
  const fileDir = filepath.replace("/page.tsx", "");
  const experimentName = path.basename(fileDir);
  const experimentPath = fileDir.replace(`${dir}/`, "");
  const description =
    experimentName === "experiments"
      ? ""
      : await readFile(filepath.replace("page.tsx", "description.txt"), "utf8");

  const { birthtime } = await fs.stat(filepath);
  const { stdout } = await $`git log --diff-filter=A --format=%aI ${filepath}`;
  const creationDate = new Date(stdout || birthtime);

  return {
    title: capitalCase(experimentName),
    description,
    slug: experimentName,
    path: experimentPath,
    creationDate,
  };
}

export async function getExperimentList() {
  const experiments = (
    await Promise.all(
      glob
        .sync(`${dir}/**/page.tsx`, {
          deep: 2,
        })
        .map(parseExperiment)
    )
  )
    .filter((experiment) => experiment.slug !== "experiments")
    .sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());

  return experiments;
}

export async function getExperiment(slug: string) {
  const filepath = `${dir}/${slug}/page.tsx`;
  return parseExperiment(filepath);
}

export type Experiment = Awaited<ReturnType<typeof getExperimentList>>[number];
