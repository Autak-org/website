import { NextResponse } from "next/server";
import { resolveLegacyHtml } from "@/lib/legacy-html";

type RouteContext = {
  params: Promise<{
    slug?: string[];
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug = [] } = await context.params;
  const html = await resolveLegacyHtml(slug);

  if (!html) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
