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
        className="m-2 
          flex flex-col rounded overflow-hidden
          border border-sage-6 hover:border-sage-8 
          dark:border-sagedark-6 dark:hover:border-sagedark-8 
          bg-sage-2 hover:bg-sage-3 
          dark:bg-sagedark-2 dark:hover:bg-sagedark-3
          relative
        "
      >
        <div
          className={makeClass(
            "absolute inset-0 z-[-1] shadow-xl opacity-0 transition-opacity",
            "group-hover:opacity-100"
          )}
        />
        <div
          className="
            aspect-video
          bg-sagea-3 dark:bg-sagedarka-3
            border-b border-sage-6 dark:border-sagedark-6
          "
        >
          <ExperimentPreviewImage
            src={experiment.path}
            width={PREVIEW_WIDTH}
            height={PREVIEW_HEIGHT}
            alt="Preview of the experiment"
          />
        </div>
        <div className="px-4 py-2">
          <h2 className="text-xl font-semibold text-sage-12 dark:text-sagedark-12">
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
