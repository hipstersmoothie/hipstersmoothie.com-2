import path from "path";
import { chromium, type Browser } from "playwright-core";
import serverlessChromium from "@sparticuz/chromium";
import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from "./constants";

// Vercel's build/runtime containers don't ship Chromium's system libraries, so
// Playwright's bundled browser fails to launch ("libnspr4.so: cannot open
// shared object file"). On Vercel we launch the serverless-friendly Chromium
// from @sparticuz/chromium (pinned to match Playwright's Chromium version),
// which bundles those libs. Locally we use the regular installed browser.
const isServerless =
  !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;

async function launchBrowser() {
  if (!isServerless) {
    return chromium.launch();
  }

  const executablePath = await serverlessChromium.executablePath();

  // Make the bundled shared libraries discoverable to the launched binary.
  process.env.LD_LIBRARY_PATH = [
    path.dirname(executablePath),
    process.env.LD_LIBRARY_PATH,
  ]
    .filter(Boolean)
    .join(":");

  return chromium.launch({
    args: serverlessChromium.args,
    executablePath,
    headless: true,
  });
}

// Launching a fresh browser per request is flaky: consecutive launches in the
// same server process intermittently fail with "Target page, context or
// browser has been closed". Reuse a single browser instance instead.
let browserPromise: Promise<Browser> | null = null;

async function getBrowser() {
  if (!browserPromise) {
    browserPromise = launchBrowser();
  }

  let browser = await browserPromise;

  if (!browser.isConnected()) {
    browserPromise = launchBrowser();
    browser = await browserPromise;
  }

  return browser;
}

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams;
  const id = query.get("id");

  if (!id) {
    return new Response("Missing ID", { status: 400 });
  }

  const browser = await getBrowser();
  const context = await browser.newContext({
    viewport: { width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT },
  });

  try {
    const page = await context.newPage();

    const experimentUrl = new URL(request.url.replace("/preview", ""));
    experimentUrl.searchParams.delete("id");
    experimentUrl.pathname = `/experiments/${id}`;

    // Dev-mode compilation can be slow on first hit, and some experiment pages
    // keep resources/connections open so the "load" event never settles. Wait
    // for DOM content (which compiles the page), then give a generous window
    // for the full load, but fall back to screenshotting what rendered.
    await page.goto(experimentUrl.toString(), {
      waitUntil: "domcontentloaded",
      timeout: 120_000,
    });

    await page
      .waitForLoadState("load", { timeout: 5_000 })
      .catch(() => undefined);

    const screenshot = await page.screenshot();

    return new Response(screenshot, {
      headers: {
        "content-type": "image/png",
      },
    });
  } finally {
    await context.close();
  }
}
