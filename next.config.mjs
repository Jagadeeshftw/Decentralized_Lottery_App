/** @type {import('next').NextConfig} */

import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add a resolve.alias configuration to the existing Webpack config
    config.resolve.alias["~bootstrap"] = path.resolve(
      __dirname,
      "node_modules/bootstrap"
    );

    // Important: return the modified config
    return config;
  },
};

export default nextConfig;
