/** @type {import('next').NextConfig} */
const nextConfig = {
    // If you want dynamic pages, don't use output: 'export'
    // output: 'export', // Remove this line if you want SSR
    
    // For static site without pre-rendering all possible paths:
    // Option 1: Use this if you want static + dynamic paths (recommended)
    output: 'export',
    images: { 
      unoptimized: true 
    },
    trailingSlash: true, // Add trailing slashes for better compatibility with static hosting
  
    // Option 2: If you must have the site fully dynamic:
    // Don't include any "output" property, which defaults to SSR
    
    // Additional configuration
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      // Enable if needed
      // serverActions: true,
    },
  };
  
  export default nextConfig;