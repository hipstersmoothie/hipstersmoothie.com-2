import { promises as fs } from "fs";
import path from "path";
import { spawn, exec } from "child_process";
import PQueue from "p-queue";
import sharp from "sharp";

const queue = new PQueue({ concurrency: 10 });

async function main() {
  const imagesListFilepath = path.join(
    __dirname,
    "../public/optimized/list.txt"
  );
  const imageListFile = await fs.readFile(imagesListFilepath, "utf-8");
  const imageList = Array.from(
    new Set(imageListFile.split("\n").filter(Boolean))
  );

  // spawn a child process to run next start
  const child = spawn("npx", ["next", "start"]);

  // listen for "Ready" message from child stdout
  child.stdout.on("data", async (data) => {
    if (!data.toString().includes("Ready")) {
      return;
    }

    await Promise.all(
      imageList.map((item) =>
        queue.add(async () => {
          const url = `http://localhost:3000/experiments/preview?id=${item}`;
          const response = await fetch(url);
          const blob = await response.blob();
          const buffer = Buffer.from(await blob.arrayBuffer());
          const filename = path.join(
            __dirname,
            "../public/optimized",
            `${item}.png`
          );

          await fs.writeFile(filename, buffer);
          console.log(`Saved ${filename}`);

          const lqipFilename = path.join(
            __dirname,
            "../public/optimized",
            `${item}-lqip.png`
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
