/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}
// Allow remote images (YouTube thumbnails, external hosts) to be optimized
nextConfig.images = {
  remotePatterns: [
    { protocol: 'https', hostname: 'example.com', port: '', pathname: '/**' },
    { protocol: 'https', hostname: 'i.ytimg.com', port: '', pathname: '/**' }
  ]
}

module.exports = nextConfig
