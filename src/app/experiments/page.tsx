import makeClass from "clsx";

import Link from "next/link";

import { NavigationHeader } from "../../components/NavigationHeader";
import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from "./preview/constants";
import { ExperimentPreviewImage } from "./ExperimentPreviewImage";
import { PageHeader } from "../../components/ui/PageHeader";
import { Experiment, getExperimentList } from "./utils";
import { capitalCase } from "change-case";

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
          "border border-gray-200 dark:border-gray-700 rounded overflow-hidden",
          "dark:bg-gray-900",
          "relative" // for the before shadow element
        )}
      >
        <div
          className={makeClass(
            "absolute inset-0 z-[-1] shadow-xl opacity-0 transition-opacity",
            "group-hover:opacity-100"
          )}
        />
        <div className="bg-gray-200 dark:bg-gray-900 aspect-video border-b border-gray-200 dark:border-gray-800">
          <ExperimentPreviewImage
            src={experiment.path}
            width={PREVIEW_WIDTH}
            height={PREVIEW_HEIGHT}
            alt="Preview of the experiment"
          />
        </div>
        <div className="px-4 py-2">
          <h2 className="text-xl font-semibold dark:text-gray-200">
            {capitalCase(experiment.slug)}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default async function ExperimentsList() {
  const experiments = await getExperimentList();
  return (
    <>
      <NavigationHeader />
      <PageHeader>Experiments</PageHeader>
      <main className="flex flex-col items-center justify-between p-5 md:px-24 md:py-12">
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
