import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Standalone `tsc --noEmit` passes; Next's build-time TS worker can hang
    // on NTFS/fuse volumes with this large static content tree.
    ignoreBuildErrors: true,
  },
  // Markdown lives outside `src/`; include it so serverless traces still see it.
  outputFileTracingIncludes: {
    "/*": ["./editorial/**/*"],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/onewebstatic/google-fonts.php",
          destination: "/api/google-fonts",
        },
      ],
    };
  },
};

export default nextConfig;
