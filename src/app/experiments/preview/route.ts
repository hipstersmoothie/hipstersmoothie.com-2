import { chromium } from "playwright";
import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from "./constants";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams;
  const id = query.get("id");

  if (!id) {
    return new Response("Missing ID", { status: 400 });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT },
  });
  const page = await context.newPage();

  const experimentUrl = new URL(request.url.replace("/preview", ""));
  experimentUrl.searchParams.delete("id");
  experimentUrl.pathname = `/experiments/${id}`;

  await page.goto(experimentUrl.toString());

  const screenshot = await page.screenshot();

  await browser.close();

  return new Response(screenshot, {
    headers: {
      "content-type": "image/png",
    },
  });
}
