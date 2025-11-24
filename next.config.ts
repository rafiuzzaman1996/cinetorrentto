import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [new URL('https://lh3.googleusercontent.com/**'),
            new URL('https://image.tmdb.org/**'),
            new URL('http://localhost:5000/**'),
            new URL('http://192.168.0.106:5000/**'),
            new URL('http://94.250.201.166:5000/**'),
            new URL('https://94.250.201.166:5000/**'),
            new URL('https://unsplash.com/**'),
            new URL('https://placehold.co/**')],
    },
};

export default nextConfig;
