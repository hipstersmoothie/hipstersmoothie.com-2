import { chromium, type Browser } from "playwright";
import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from "./constants";

// Launching a fresh browser per request is flaky: consecutive launches in the
// same server process intermittently fail with "Target page, context or
// browser has been closed". Reuse a single browser instance instead.
let browserPromise: Promise<Browser> | null = null;

async function getBrowser() {
  if (!browserPromise) {
    browserPromise = chromium.launch();
  }

  let browser = await browserPromise;

  if (!browser.isConnected()) {
    browserPromise = chromium.launch();
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
