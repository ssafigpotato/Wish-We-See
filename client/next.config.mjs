import nextPwa from "next-pwa";
import path from "path";
import { fileURLToPath } from "url";

/** @type {import('next').NextConfig} */

// 파일 URL을 파일 경로로 변환
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // ESLint 오류가 있어도 빌드가 계속되도록 설정
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 타입 오류가 있어도 빌드를 계속 진행하도록 설정
    ignoreBuildErrors: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  productionBrowserSourceMaps: false,

  images: {
    remotePatterns : [
      {
        protocol: 'https',
        hostname: "missingbucket1.s3.amazonaws.com",
        pathname: "/**"
      },
    ]
  },

  output: 'standalone',

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  experimental: {
    optimizeCss: true, // CSS 최적화 설정
    optimizeFonts: true, // 웹폰트 최적화 활성화
  },

  async headers() {
    return [
      {
        // 모든 정적 파일 및 manifest.json에 대해 CORS 헤더를 설정
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, HEAD, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type',
          },
        ],
      },
    ];
  },
};

export default nextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
})(nextConfig);
