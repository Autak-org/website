import { createHash } from "crypto";
import { access, mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const CACHE_DIR = path.join(
  process.cwd(),
  "public",
  "onewebstatic",
  ".fonts-cache",
);

function isAllowedFontUrl(url: string): boolean {
  return (
    url.startsWith("https://fonts.googleapis.com/css?") ||
    url.startsWith("https://fonts.gstatic.com/")
  );
}

function extensionForUrl(url: string): "css" | "woff2" | null {
  if (url.startsWith("https://fonts.googleapis.com/css?")) {
    return "css";
  }

  if (url.startsWith("https://fonts.gstatic.com/l/font?kit=")) {
    return "woff2";
  }

  const pathname = new URL(url).pathname;
  const ext = path.extname(pathname).replace(".", "").toLowerCase();
  if (ext === "css" || ext === "woff2") {
    return ext;
  }

  return null;
}

function cacheFileName(url: string, extension: "css" | "woff2"): string {
  const hash = createHash("md5").update(Buffer.from(url).toString("base64")).digest("hex");
  return `${hash}.cache.${extension}`;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function rewriteCssUrls(css: string): string {
  const proxyPath = "/onewebstatic/google-fonts.php";

  return css.replace(/url\(([^)]+)\)/g, (_match, rawUrl: string) => {
    const cleaned = rawUrl.trim().replace(/^['"]|['"]$/g, "");
    if (!cleaned.startsWith("https://")) {
      return `url(${rawUrl})`;
    }
    return `url(${proxyPath}?url=${encodeURIComponent(cleaned)})`;
  });
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return new NextResponse('Error: Missing "url" parameter', { status: 400 });
  }

  if (!isAllowedFontUrl(url)) {
    return new NextResponse('Error: Invalid "url" parameter', { status: 400 });
  }

  const extension = extensionForUrl(url);
  if (!extension) {
    return new NextResponse(`Error: Invalid "url" parameter ${url}`, {
      status: 400,
    });
  }

  const filename = cacheFileName(url, extension);
  const filepath = path.join(CACHE_DIR, filename);

  if (!(await fileExists(filepath))) {
    try {
      const upstream = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
        },
      });

      if (!upstream.ok) {
        return NextResponse.redirect(url, 302);
      }

      await mkdir(CACHE_DIR, { recursive: true });

      if (extension === "css") {
        const css = rewriteCssUrls(await upstream.text());
        await writeFile(filepath, css, "utf8");
      } else {
        const buffer = Buffer.from(await upstream.arrayBuffer());
        await writeFile(filepath, buffer);
      }
    } catch {
      // Offline / blocked network: fall back to Google directly.
      return NextResponse.redirect(url, 302);
    }
  }

  const body = await readFile(filepath);
  return new NextResponse(body, {
    headers: {
      "Content-Type": extension === "css" ? "text/css" : "font/woff2",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
