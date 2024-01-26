import path from "path";
import { capitalCase } from "change-case";

interface GitLoaderOutput {
  source: string;
  creationDate: string;
  lastUpdated: string;
  description?: string;
}

async function parseExperiment(
  filepath: string,
  { creationDate, description }: GitLoaderOutput
) {
  const fileDir = filepath.replace("/page.tsx", "");
  const experimentName = path.basename(fileDir);

  return {
    title: capitalCase(experimentName),
    description,
    slug: experimentName,
    creationDate: new Date(creationDate),
  };
}

const postContext = require.context(
  "!!../../lib/webpack-git-loader.js!./",
  true,
  /page\.tsx$/
);

export async function getExperimentList() {
  const experiments = await Promise.all(
    postContext
      .keys()
      .filter((key) => key !== "./page.tsx")
      .map((key): [string, GitLoaderOutput] => [key, postContext(key).default])
      .map(([filepath, contents]) => parseExperiment(filepath, contents))
  );

  return experiments.sort(
    (a, b) => b.creationDate.getTime() - a.creationDate.getTime()
  );
}

export async function getExperiment(slug: string) {
  const filepath = postContext.keys().find((key) => key.includes(slug));

  if (!filepath) {
    throw new Error(`No experiment found with slug "${slug}"`);
  }

  const post: GitLoaderOutput = postContext(filepath).default;
  return parseExperiment(filepath, post);
}

export type Experiment = Awaited<ReturnType<typeof getExperimentList>>[number];
