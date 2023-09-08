/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: {
      sizeLimit: "1mb", // Adjust the size limit as needed
    },
  },
};

module.exports = nextConfig;
