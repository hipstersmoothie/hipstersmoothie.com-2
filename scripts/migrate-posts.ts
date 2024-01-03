import { promises as fs } from "fs";
import path from "path";
import endent from "endent";
import PQueue from "p-queue";
import glob from "fast-glob";
import { $ } from "execa";

const queue = new PQueue({ concurrency: 10 });
const dest_dir = path.join(__dirname, "../src/app/blog/posts");

async function main() {
  const dir = path.join(__dirname, "../../hipstersmoothie.com/pages/garden");
  const files = await glob(`${dir}/**/*.md`);

  await Promise.all(
    files.map((filepath) =>
      queue.add(async () => {
        const content = await fs.readFile(filepath, "utf-8");
        const filename = path.basename(filepath).replace(".md", "");
        const pageDir = path.join(dest_dir, filename);
        const creationDate =
          await $`git log --diff-filter=A --format=%aI ${filepath}`;

        await fs.mkdir(pageDir);
        await fs.writeFile(
          path.join(pageDir, "page.mdx"),
          endent`
            ---
            creationDate: ${creationDate.stdout}
            ---
            ${content}
          `
        );
      })
    )
  );
}

main();
