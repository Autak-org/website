/**
 * Machine-translates the English dictionary into every locale listed in
 * `translatedLocales` and writes `src/i18n/dictionaries/generated/<locale>.ts`.
 *
 *   npm run translate            # all translated locales
 *   npm run translate -- fr nl   # only the given ones
 *
 * Provider: DeepL when DEEPL_API_KEY is set, otherwise Google's public
 * translate endpoint, which needs no key but is rate limited — the script
 * batches strings and backs off on failure.
 */

import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { en } from "../src/i18n/dictionaries/en";
import { translatedLocales, type Locale } from "../src/i18n/config";

/** Terms that must survive translation untouched. */
const GLOSSARY = [
  "Autak",
  "Autak e.V.",
  "BusBuddy",
  "Connie",
  "Aachen",
  "RWTH",
  "FH Aachen",
  "PayPal",
  "ESP32",
  "CAN",
  "Fusion 360",
  "FreeCAD",
  "CYBATHLON",
  "MDR",
  "ARD",
  "UpdateDeutschland",
  "StädteRegion",
  "Kinova",
  "Jaco",
  "Einfach genial",
  "Inklusiv & divers",
];

type Json = string | Json[] | { [key: string]: Json };

/** Walks the dictionary and returns every string with its path. */
function collect(value: Json, trail: string[] = []): { trail: string[]; text: string }[] {
  if (typeof value === "string") return [{ trail, text: value }];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collect(item, [...trail, String(index)]));
  }
  return Object.entries(value).flatMap(([key, item]) => collect(item, [...trail, key]));
}

function rebuild(value: Json, translations: Map<string, string>, trail: string[] = []): Json {
  if (typeof value === "string") {
    return translations.get(trail.join(".")) ?? value;
  }
  if (Array.isArray(value)) {
    return value.map((item, index) => rebuild(item, translations, [...trail, String(index)]));
  }
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      rebuild(item, translations, [...trail, key]),
    ]),
  );
}

async function translateWithDeepl(texts: string[], target: Locale, key: string) {
  const host = key.endsWith(":fx") ? "api-free.deepl.com" : "api.deepl.com";
  const response = await fetch(`https://${host}/v2/translate`, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: texts,
      source_lang: "EN",
      target_lang: target.toUpperCase(),
    }),
  });

  if (!response.ok) {
    throw new Error(`DeepL ${response.status}: ${await response.text()}`);
  }

  const data = (await response.json()) as { translations: { text: string }[] };
  return data.translations.map((item) => item.text);
}

/** The public endpoint takes one string per request, so run a few at a time. */
async function translateWithGoogle(texts: string[], target: Locale) {
  return Promise.all(
    texts.map(async (text) => {
      const url =
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en" +
        `&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;

      for (let attempt = 0; attempt < 4; attempt += 1) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = (await response.json()) as [[string, string][]];
            return data[0].map(([piece]) => piece).join("");
          }
        } catch {
          // retried below
        }
        await new Promise((resolve) => setTimeout(resolve, 700 * (attempt + 1)));
      }

      console.warn(`\n  kept English for: ${text.slice(0, 60)}…`);
      return text;
    }),
  );
}

/** Machine translation likes to "fix" brand names; put them back. */
function restoreGlossary(source: string, translated: string) {
  let result = translated;

  for (const term of GLOSSARY) {
    if (!source.includes(term)) continue;
    const pattern = new RegExp(
      term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"),
      "gi",
    );
    result = result.replace(pattern, term);
  }

  return result;
}

async function build(target: Locale) {
  const entries = collect(en as unknown as Json);
  const texts = entries.map((entry) => entry.text);
  const key = process.env.DEEPL_API_KEY;

  console.log(`${target}: translating ${texts.length} strings…`);

  const translated: string[] = [];
  const chunkSize = key ? 45 : 8;

  for (let index = 0; index < texts.length; index += chunkSize) {
    const chunk = texts.slice(index, index + chunkSize);
    const result = key
      ? await translateWithDeepl(chunk, target, key)
      : await translateWithGoogle(chunk, target);
    translated.push(...result);
    process.stdout.write(`\r  ${Math.min(index + chunkSize, texts.length)}/${texts.length}`);
  }
  process.stdout.write("\n");

  const map = new Map<string, string>();
  entries.forEach((entry, index) => {
    map.set(entry.trail.join("."), restoreGlossary(entry.text, translated[index]));
  });

  const dictionary = rebuild(en as unknown as Json, map);
  const outDir = path.join(process.cwd(), "src", "i18n", "dictionaries", "generated");
  await mkdir(outDir, { recursive: true });

  await writeFile(
    path.join(outDir, `${target}.ts`),
    [
      "// Generated by scripts/translate-dictionaries.ts — do not edit by hand.",
      "// Re-run with: npm run translate",
      "",
      'import type { Dictionary } from "../de";',
      "",
      `export const ${target}: Dictionary = ${JSON.stringify(dictionary, null, 2)};`,
      "",
    ].join("\n"),
    "utf8",
  );

  console.log(`  written to src/i18n/dictionaries/generated/${target}.ts`);
  await writeBarrel(outDir);
}

/** Rewrites the barrel so `getDictionary` picks up whatever exists on disk. */
async function writeBarrel(outDir: string) {
  const files = await readdir(outDir);
  const found = files
    .filter((file) => file.endsWith(".ts") && file !== "index.ts")
    .map((file) => file.replace(/\.ts$/, ""))
    .sort();

  await writeFile(
    path.join(outDir, "index.ts"),
    [
      "// Generated by scripts/translate-dictionaries.ts — do not edit by hand.",
      "",
      'import type { Dictionary } from "../de";',
      'import type { Locale } from "../../config";',
      ...found.map((locale) => `import { ${locale} } from "./${locale}";`),
      "",
      "/**",
      " * Barrel for the machine-translated dictionaries. Each entry is added by",
      " * `npm run translate`; locales missing here fall back to English.",
      " */",
      "export const generated: Partial<Record<Locale, Dictionary>> = {",
      ...found.map((locale) => `  ${locale},`),
      "};",
      "",
    ].join("\n"),
    "utf8",
  );
}

async function main() {
  const requested = process.argv.slice(2);
  const targets = (
    requested.length > 0 ? requested : [...translatedLocales]
  ) as Locale[];

  for (const target of targets) {
    if (!(translatedLocales as readonly string[]).includes(target)) {
      console.warn(`skipping ${target}: not in translatedLocales`);
      continue;
    }
    await build(target);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
