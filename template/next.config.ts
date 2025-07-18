import type { NextConfig } from 'next';
import './scripts/env-validation';

const nextConfig: NextConfig = {
  /* config options here */
  distDir: process.env.NODE_ENV === 'production' ? '.next' : '.next-dev',
};

export default nextConfig;

