/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

module.exports = {
  env: {
    API_KEY: 'https://api-cookoff-prod.codechefvit.com/',
    JUDGE0_URI: 'https://judge0.codechefvit.com/',
  },
}
