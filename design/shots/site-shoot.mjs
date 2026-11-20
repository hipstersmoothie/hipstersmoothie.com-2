import { chromium } from "playwright";
const base = "http://localhost:3111";
const pages = { home: "/", projects: "/projects", sesh: "/projects/sesh", "channel-surf": "/projects/channel-surf", blog: "/blog", post: "/blog/posts/eight-projects-2026", experiments: "/experiments" };
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
for (const [name, path] of Object.entries(pages)) {
  await page.goto(base + path, { waitUntil: "networkidle", timeout: 180000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `/tmp/site-shots/${name}.png`, fullPage: true });
}
// dark: toggle via the button on the home page
await page.goto(base + "/", { waitUntil: "networkidle", timeout: 180000 });
await page.click("button[aria-label*='dark appearance']");
await page.waitForTimeout(500);
await page.screenshot({ path: `/tmp/site-shots/home-dark.png`, fullPage: true });
await page.goto(base + "/projects/sesh", { waitUntil: "networkidle", timeout: 180000 });
await page.waitForTimeout(500);
await page.screenshot({ path: `/tmp/site-shots/sesh-dark.png`, fullPage: true });
await ctx.close();
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
const mp = await m.newPage();
await mp.goto(base + "/", { waitUntil: "networkidle", timeout: 180000 });
await mp.screenshot({ path: "/tmp/site-shots/home-mobile.png", fullPage: true });
await mp.goto(base + "/projects/sesh", { waitUntil: "networkidle", timeout: 180000 });
await mp.screenshot({ path: "/tmp/site-shots/sesh-mobile.png", fullPage: true });
await browser.close();
console.log("done");
