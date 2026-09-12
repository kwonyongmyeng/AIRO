import type { NextConfig } from "next";

/**
 * GitHub Pages(https://<user>.github.io/AIRO)로 정적 배포할 때는
 * NEXT_PUBLIC_BASE_PATH=/AIRO 를 지정한다. 로컬 개발에서는 비워 둔다.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
