/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Serve the static homepage at "/" so the canonical URL is the bare domain
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/index.html" }]
    };
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/blog", destination: "/blog-grid.html", permanent: true }
    ];
  },
  // Static assets keep their filenames when edited, so cache them for days, not forever
  async headers() {
    return [
      {
        source: "/:dir(images|icons|fonts.gstatic.com)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }]
      },
      {
        source: "/:dir(css|js|vendor|fonts.googleapis.com)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }]
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
