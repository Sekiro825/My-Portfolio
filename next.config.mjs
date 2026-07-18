/** @type {import('next').NextConfig} */

// GitHub Pages repo name - hardcoded to avoid BOM issues with package.json read
const repo = "My-Portfolio";

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // Pure static export so we can ship to GitHub Pages.
  output: "export",

  // next/image optimizer needs a server; static export must use unoptimized images.
  images: { unoptimized: true },

  // GitHub Pages serves at /<repo>/ — make every asset path resolve correctly.
  // Apply only in production to prevent 404s during local development
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",

  // Emit a directive file so GitHub Pages SPA router works for in-page anchors
  // without 404 on refresh. (Our site is single page so this mostly affects
  // error pages.)
  trailingSlash: true,

  // Strict lint/typecheck caught during builds.
  eslint: { dirs: ["src", "data", "tests"] },
  typescript: { ignoreBuildErrors: false },

  // Silence "export" image warnings; we use unoptimized images on purpose.
  reactStrictMode: true,

  // Keep build output deterministic on CI.
  poweredByHeader: false,
};

export default nextConfig;