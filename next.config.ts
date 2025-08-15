import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images : {
      formats: ['image/avif', 'image/webp'],
    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xcgbqxvuqpbfmzfumxbl.supabase.co',
        port: '',
        pathname : '/storage/v1/object/public/assets/logos/**'
      },
    ],
 }
};

export default nextConfig;
