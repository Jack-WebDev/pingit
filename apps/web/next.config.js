import { initConfig, env } from "@pingit/serverkit";
const root = globalThis.process.cwd();

const conf = initConfig(root);

let envConfig = {};

if (conf.env !== "production") {
  envConfig = {
    API_URL: env.get("API_URL").required().asString(),
    CLIENT_ID: env.get("CLIENT_ID").required().asString(),
    CLIENT_SECRET: env.get("CLIENT_SECRET").required().asString(),
  };
}

const nextConfig = {
  env: envConfig,
  reactStrictMode: true,
  transpilePackages: ["ui"],
};

export default nextConfig;
