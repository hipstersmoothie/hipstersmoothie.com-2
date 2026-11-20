import type { Metadata } from "next";

import { NavigationHeader } from "../../components/NavigationHeader";
import { Footer } from "../../components/Footer";
import { PageHeader } from "../../components/ui/PageHeader";
import { FeaturedCards, ProjectRows } from "./components/ProjectTiles";

export const metadata: Metadata = {
  title: "Projects · Andrew Lisowski",
  description: "Apps, tools and libraries from the last couple of years.",
};

export default function ProjectsPage() {
  return (
    <>
      <NavigationHeader />
      <PageHeader subtitle="Apps, tools and libraries. Each one links to its own site.">
        Projects
      </PageHeader>
      <main>
        <section className="pb-16">
          <div className="max-w-[1180px] mx-auto px-6">
            <FeaturedCards />
          </div>
        </section>
        <section className="py-24 bg-ground-alt">
          <div className="max-w-[1180px] mx-auto px-6">
            <h2 className="headline text-[clamp(28px,3.4vw,40px)] text-ink mb-10">Everything else</h2>
            <ProjectRows />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
