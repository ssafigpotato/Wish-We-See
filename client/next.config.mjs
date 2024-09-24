import nextPwa from "next-pwa";
import path from "path";

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(import.meta.url, "styles")],
  },
  productionBrowserSourceMaps: false,
};

export default nextPwa({
  dest: "public",
})(nextConfig);
