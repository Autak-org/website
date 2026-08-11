/**
 * Full-page screenshots of every route, for reviewing the layout without a
 * browser open. Usage: node scripts/screenshots.mjs [baseUrl] [outDir]
 */
import { mkdir } from "node:fs/promises";
import puppeteer from "puppeteer-core";

const base = process.argv[2] ?? "http://localhost:3000";
const out = process.argv[3] ?? "/tmp/shots";
const locale = process.env.LOCALE ?? "de";

const paths = [
  "",
  "/about",
  "/projects",
  "/projects/wheelchair",
  "/news",
  "/positions",
  "/shop",
  "/contact",
  "/for-partners",
  "/for-users",
  "/for-members",
  "/legal/imprint",
];

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844, isMobile: true },
];

await mkdir(out, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

for (const viewport of viewports) {
  const page = await browser.newPage();
  await page.setViewport(viewport);

  for (const path of paths) {
    const url = `${base}/${locale}${path}`;
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60_000 });
    // Scroll through once so lazy images and scroll reveals settle. Smooth
    // scrolling has to go, because headless Chrome never animates it.
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 90));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((resolve) => setTimeout(resolve, 400));

    const name = (path.slice(1) || "home").replaceAll("/", "-");
    await page.screenshot({
      path: `${out}/${viewport.name}-${name}.png`,
      fullPage: true,
    });
    console.log(`${viewport.name} ${url}`);
  }

  await page.close();
}

await browser.close();
