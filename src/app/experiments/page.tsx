import makeClass from "clsx";

import Link from "next/link";

import { NavigationHeader } from "../../components/NavigationHeader";
import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from "./preview/constants";
import { ExperimentPreviewImage } from "./ExperimentPreviewImage";
import { PageHeader } from "../../components/ui/PageHeader";
import { Experiment, getExperimentList } from "./utils";
import { Footer } from "../../components/Footer";

async function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <Link
      href={`/experiments/${experiment.slug}`}
      className={makeClass(
        "flex group",
        "scale-100 transition-transform hover:scale-[1.025]"
      )}
    >
      <div
        className="m-2 
          flex flex-col rounded overflow-hidden
          border border-mauve-7 hover:border-mauve-8 
          dark:border-mauvedark-7 dark:hover:border-mauvedark-8 
          bg-mauve-2 hover:bg-mauve-3 
          dark:bg-mauvedark-2 dark:hover:bg-mauvedark-3
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
          bg-mauvea-3 dark:bg-mauvedarka-3
            border-b border-mauve-6 dark:border-mauvedark-6
            box-border
          "
        >
          <ExperimentPreviewImage
            src={experiment.slug}
            width={PREVIEW_WIDTH}
            height={PREVIEW_HEIGHT}
            alt="Preview of the experiment"
          />
        </div>
        <div className="px-4 py-3 flex flex-col gap-2">
          <h2 className="text-xl font-medium text-mauve-12 dark:text-mauvedark-12">
            {experiment.title}
          </h2>
          <p className="text-sm text-mauve-11 dark:text-mauvedark-11">
            {experiment.description}
          </p>
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
      <PageHeader subtitle="A collection of one-off experiments that explore different ideas and browser APIs.">
        Experiments
      </PageHeader>
      <main className="flex-1 flex flex-col items-center justify-between p-3 md:px-24 md:py-12">
        <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full max-w-screen-md">
          {experiments.map((experiment) => (
            <li key={experiment.slug}>
              <ExperimentCard experiment={experiment} />
            </li>
          ))}
        </ol>
      </main>
      <Footer />
    </>
  );
}
