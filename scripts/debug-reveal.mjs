/** One-off check: are any scroll-reveal elements still invisible after a pass? */
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: "new",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto("http://localhost:3000/de", { waitUntil: "networkidle2" });

await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
await new Promise((r) => setTimeout(r, 500));

console.log(
  JSON.stringify(
    await page.evaluate(() => {
      const all = [...document.querySelectorAll(".reveal")];
      const hidden = all.filter((n) => getComputedStyle(n).opacity === "0");
      return {
        total: all.length,
        hidden: hidden.length,
        sample: hidden
          .slice(0, 3)
          .map((n) => `${n.className} ready=${n.dataset.ready} vis=${n.dataset.visible}`),
        text: document.body.innerText.slice(0, 300),
      };
    }),
    null,
    2,
  ),
);

console.log(
  await page.evaluate(async () => {
    const node = [...document.querySelectorAll(".reveal")].find(
      (n) => getComputedStyle(n).opacity === "0",
    );
    if (!node) return "nothing hidden";

    node.scrollIntoView({ block: "center" });
    const fired = await new Promise((resolve) => {
      const observer = new IntersectionObserver((entries) => {
        resolve(entries.map((e) => e.isIntersecting).join(","));
      });
      observer.observe(node);
      setTimeout(() => resolve("timeout"), 2000);
    });

    return `probe=${fired} vis=${node.dataset.visible} rect=${JSON.stringify(
      node.getBoundingClientRect().top,
    )}`;
  }),
);

await browser.close();
