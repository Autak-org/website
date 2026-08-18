import fs from "node:fs";
import path from "node:path";

export type MarkdownFile = {
  slug: string;
  file: string;
  data: Record<string, string>;
  body: string;
};

function stripQuotes(value: string) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

/**
 * Tiny YAML-like frontmatter reader. Enough for `key: value` and
 * `key: |` blocks — no extra dependency, and errors name the file.
 */
export function parseFrontmatter(raw: string, file: string): {
  data: Record<string, string>;
  body: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(
      `${file}: Markdown files must start with a --- frontmatter block.`,
    );
  }

  const data: Record<string, string> = {};
  let currentKey: string | null = null;
  const multiline: string[] = [];

  const flush = () => {
    if (currentKey) {
      data[currentKey] = multiline.join("\n").trimEnd();
      currentKey = null;
      multiline.length = 0;
    }
  };

  for (const line of match[1].split("\n")) {
    if (currentKey) {
      if (line.startsWith("  ") || line === "") {
        multiline.push(line.replace(/^  /, ""));
        continue;
      }
      flush();
    }

    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;

    const [, key, value] = kv;
    if (value === "|" || value === ">" || value === "|-" || value === ">-") {
      currentKey = key;
      continue;
    }
    data[key] = stripQuotes(value.trim());
  }
  flush();

  return { data, body: match[2].trim() };
}

export function required(
  data: Record<string, string>,
  key: string,
  file: string,
): string {
  const value = data[key]?.trim();
  if (!value) {
    throw new Error(`${file}: missing required field "${key}".`);
  }
  return value;
}

export function localized(
  data: Record<string, string>,
  key: string,
  file: string,
): { de: string; en: string } {
  return {
    de: required(data, `${key}_de`, file),
    en: required(data, `${key}_en`, file),
  };
}

/** Reads every `*.md` file in a folder, skipping names that start with `_`. */
export function loadMarkdownDir(relativeDir: string): MarkdownFile[] {
  const dir = path.join(process.cwd(), relativeDir);
  if (!fs.existsSync(dir)) {
    throw new Error(`Content folder not found: ${relativeDir}`);
  }

  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md") && !name.startsWith("_"))
    .sort()
    .map((name) => {
      const file = path.join(relativeDir, name);
      const raw = fs.readFileSync(path.join(dir, name), "utf8");
      const { data, body } = parseFrontmatter(raw, file);
      return {
        slug: name.replace(/\.md$/, ""),
        file,
        data,
        body,
      };
    });
}

export function byOrder(files: MarkdownFile[]): MarkdownFile[] {
  return [...files].sort((a, b) => {
    const ao = Number(a.data.order ?? Number.MAX_SAFE_INTEGER);
    const bo = Number(b.data.order ?? Number.MAX_SAFE_INTEGER);
    if (ao !== bo) return ao - bo;
    return a.slug.localeCompare(b.slug);
  });
}
