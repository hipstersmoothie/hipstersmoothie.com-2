import { promises as fs } from "fs";
import path from "path";
import { spawn } from "child_process";
import PQueue from "p-queue";
import Fuse from "fuse.js";

const queue = new PQueue({ concurrency: 1 });

let baseUrl = "http://localhost:3000";

async function generateSearchIndex() {
  const url = `${baseUrl}/components/CommandPallette`;
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

  let started = false;

  // listen for "Ready" message from child stdout
  child.stdout.on("data", async (data) => {
    const output = data.toString();

    // Capture the actual port next dev bound to (it falls back to another
    // port when 3000 is already in use), so we fetch from the right server.
    const localMatch = output.match(/https?:\/\/localhost:(\d+)/);
    if (localMatch) {
      baseUrl = `http://localhost:${localMatch[1]}`;
    }

    if (started || !output.includes("Ready")) {
      return;
    }
    started = true;

    await generateSearchIndex();
    await queue.onIdle();

    child.kill("SIGINT");
    process.exit(0);
  });

  child.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });
}

main();
