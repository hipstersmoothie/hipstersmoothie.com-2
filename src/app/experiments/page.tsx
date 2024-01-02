import path from "path";
import glob from "fast-glob";
import { capitalCase } from "change-case";
import Link from "next/link";

import { NavigationHeader } from "../components/NavigationHeader";
import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from "./preview/constants";
import { ExperimentPreviewImage } from "./ExperimentPreviewImage.server";

const dir = path.dirname(import.meta.url).replace("file://", "");

const experiments = glob
  .sync(`${dir}/**/page.tsx`, {
    deep: 2,
  })
  .map((filepath) => {
    const fileDir = filepath.replace("/page.tsx", "");
    const experimentName = path.basename(fileDir);
    const experimentPath = fileDir.replace(`${dir}/`, "");

    return {
      name: capitalCase(experimentName),
      path: experimentPath,
    };
  })
  .filter((experiment) => experiment.name !== "Experiments");

type Experiment = (typeof experiments)[0];

async function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <Link
      href={`/experiments/${experiment.path}`}
      className="flex flex-col border border-gray-200"
    >
      <div className="bg-gray-200 aspect-video">
        <ExperimentPreviewImage
          src={experiment.path}
          width={PREVIEW_WIDTH}
          height={PREVIEW_HEIGHT}
          alt="Preview of the experiment"
        />
      </div>
      <div className="px-4 py-2 ">
        <h2 className="text-2xl font-semibold">{experiment.name}</h2>
      </div>
    </Link>
  );
}

export default function ExperimentsList() {
  return (
    <>
      <NavigationHeader />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ol className="grid grid-cols-3 gap-4 w-full max-w-screen-lg">
          {[
            ...experiments,
            ...experiments,
            ...experiments,
            ...experiments,
            ...experiments,
            ...experiments,
            ...experiments,
            ...experiments,
            ...experiments,
            ...experiments,
            ...experiments,
            ...experiments,
            ...experiments,
            ...experiments,
            ...experiments,
            ...experiments,
            ...experiments,
            ...experiments,
          ].map((experiment) => (
            <li key={experiment.path}>
              <ExperimentCard experiment={experiment} />
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
