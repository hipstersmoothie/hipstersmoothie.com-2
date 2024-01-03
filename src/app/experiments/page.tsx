import makeClass from "clsx";
import path from "path";
import glob from "fast-glob";
import { capitalCase } from "change-case";
import Link from "next/link";

import { NavigationHeader } from "../../components/NavigationHeader";
import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from "./preview/constants";
import { ExperimentPreviewImage } from "./ExperimentPreviewImage.server";
import { PageHeader } from "../../components/ui/PageHeader";

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
      className={makeClass(
        "flex group",
        "scale-100 transition-transform hover:scale-[1.025]"
      )}
    >
      <div
        className={makeClass(
          "m-2",
          "flex flex-col",
          "border border-gray-200 rounded",
          "relative" // for the before shadow element
        )}
      >
        <div
          className={makeClass(
            "absolute inset-0 z-[-1] shadow-xl opacity-0 transition-opacity",
            "group-hover:opacity-100"
          )}
        />
        <div className="bg-gray-200 aspect-video border-b border-gray-200">
          <ExperimentPreviewImage
            src={experiment.path}
            width={PREVIEW_WIDTH}
            height={PREVIEW_HEIGHT}
            alt="Preview of the experiment"
          />
        </div>
        <div className="px-4 py-2">
          <h2 className="text-xl font-semibold">{experiment.name}</h2>
        </div>
      </div>
    </Link>
  );
}

export default function ExperimentsList() {
  return (
    <>
      <NavigationHeader />
      <PageHeader>Experiments</PageHeader>
      <main className="flex min-h-screen flex-col items-center justify-between p-5 md:px-24 md:py-12">
        <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full max-w-screen-md">
          {experiments.map((experiment) => (
            <li key={experiment.path}>
              <ExperimentCard experiment={experiment} />
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}