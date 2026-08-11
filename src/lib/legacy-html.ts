import { access, readFile } from "fs/promises";
import path from "path";

const CONTENT_ROOT = path.join(process.cwd(), "content");

async function exists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function resolveLegacyHtml(
  slug: string[] = [],
): Promise<string | null> {
  const candidates: string[] = [];

  if (slug.length === 0) {
    candidates.push(path.join(CONTENT_ROOT, "index.html"));
  } else {
    const joined = path.join(CONTENT_ROOT, ...slug);
    candidates.push(`${joined}.html`);
    candidates.push(path.join(joined, "index.html"));
  }

  for (const candidate of candidates) {
    const resolved = path.resolve(candidate);
    if (!resolved.startsWith(CONTENT_ROOT)) {
      continue;
    }
    if (await exists(resolved)) {
      return readFile(resolved, "utf8");
    }
  }

  return null;
}
