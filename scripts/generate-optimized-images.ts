import { promises as fs } from "fs";
import path from "path";
import { spawn, exec } from "child_process";
import PQueue from "p-queue";
import sharp from "sharp";
import Fuse from "fuse.js";
import glob from "fast-glob";

const queue = new PQueue({ concurrency: 1 });

async function generateThumbs() {
  const experiments = await glob("**/page.tsx", {
    cwd: path.join(__dirname, "../src/app/experiments"),
  })
    .then((paths) => paths.filter((p) => p !== "page.tsx"))
    .then((paths) => paths.map((p) => p.replace("/page.tsx", "")));

  await Promise.all(
    experiments.map((slug) =>
      queue.add(async () => {
        const url = `http://localhost:3000/experiments/preview?id=${slug}`;
        const response = await fetch(url);
        const blob = await response.blob();
        const buffer = Buffer.from(await blob.arrayBuffer());
        const filename = path.join(
          __dirname,
          "../public/optimized",
          `${slug}.png`
        );

        await fs.mkdir(path.dirname(filename), { recursive: true });
        await fs.writeFile(filename, buffer);
        console.log(`Saved ${filename}`);

        const lqipFilename = path.join(
          __dirname,
          "../public/optimized",
          `${slug}-lqip.png`
        );

        await sharp(buffer)
          .resize({ width: 16, fit: "inside" })
          .toFile(lqipFilename);

        console.log(`Saved ${lqipFilename}`);
      })
    )
  );
}

async function generateSearchIndex() {
  const url = `http://localhost:3000/components/CommandPallette`;
  const response = await fetch(url);
  const json = await response.json();
  const filename = path.join(
    __dirname,
    "../src/app/components/CommandPallette/production-search-data.json"
  );

  await fs.writeFile(filename, JSON.stringify(json, null, 2));
  console.log(`Saved ${filename}`);

  const index = Fuse.createIndex(["title", "description", "source"], json);
  const indexFilename = path.join(
    __dirname,
    "../src/app/components/CommandPallette/production-search-index.json"
  );

  await fs.writeFile(indexFilename, JSON.stringify(index.toJSON()));
  console.log(`Saved ${indexFilename}`);
}

async function main() {
  // spawn a child process to run next start
  const child = spawn("npx", ["next", "dev"], {
    env: {
      ...process.env,
      NODE_ENV: "development",
    },
  });

  // listen for "Ready" message from child stdout
  child.stdout.on("data", async (data) => {
    if (!data.toString().includes("Ready")) {
      return;
    }

    await generateThumbs();
    await generateSearchIndex();
    await queue.onIdle();

    child.kill("SIGINT");
    exec("lsof -t -i:3000 | xargs kill -9");
    process.exit(0);
  });

  child.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });
}

main();
