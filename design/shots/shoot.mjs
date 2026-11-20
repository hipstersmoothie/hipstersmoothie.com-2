import { chromium } from "playwright";
const base = "file://" + process.cwd() + "/design/";
const pages = ["home", "project-channel-surf", "project-sesh", "projects", "blog"];
const browser = await chromium.launch();
for (const scheme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p + ".html", { waitUntil: "load" });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `design/shots/${p}-${scheme}.png`, fullPage: true });
  }
  await ctx.close();
}
// Close-ups at 2x: the Sesh tile and the Sesh hero.
const hi = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 });
const hp = await hi.newPage();
await hp.goto(base + "home.html", { waitUntil: "load" }); await hp.waitForTimeout(300);
await hp.locator(".feat.wide").first().screenshot({ path: "design/shots/closeup-sesh-tile.png" });
await hp.goto(base + "project-sesh.html", { waitUntil: "load" }); await hp.waitForTimeout(300);
await hp.locator(".phero").screenshot({ path: "design/shots/closeup-sesh-hero.png" });
await hi.close();
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "light", deviceScaleFactor: 1 });
const mp = await m.newPage();
await mp.goto(base + "home.html", { waitUntil: "load" }); await mp.screenshot({ path: "design/shots/home-mobile.png", fullPage: true });
await mp.goto(base + "project-channel-surf.html", { waitUntil: "load" }); await mp.screenshot({ path: "design/shots/project-channel-surf-mobile.png", fullPage: true });
await browser.close();
console.log("done");
