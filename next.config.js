/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "bobziomeczek",
        mongodb_password: "zLIOli51OO2uSKFf",
        mongodb_clustername: "cluster0",
        mongodb_database: "next-blog-dev",
      },
    };
  }

  return {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      mongodb_username: "bobziomeczek",
      mongodb_password: "zLIOli51OO2uSKFf",
      mongodb_clustername: "cluster0",
      mongodb_database: "next-blog",
    },
  };
};

module.exports = nextConfig;
