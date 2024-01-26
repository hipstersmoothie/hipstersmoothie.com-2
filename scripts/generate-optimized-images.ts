import { promises as fs } from "fs";
import path from "path";
import { spawn, exec } from "child_process";
import PQueue from "p-queue";
import sharp from "sharp";
import glob from "fast-glob";

const queue = new PQueue({ concurrency: 10 });

async function main() {
  const experiments = await glob("**/page.tsx", {
    cwd: path.join(__dirname, "../src/app/experiments"),
  })
    .then((paths) => paths.filter((p) => p !== "page.tsx"))
    .then((paths) => paths.map((p) => p.replace("/page.tsx", "")));

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

    await queue.onIdle();
    child.kill();
    exec("lsof -t -i:3000 | xargs kill -9");
    console.log("Generated optimized images.");
    process.exit(0);
  });

  child.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });
}

main();
