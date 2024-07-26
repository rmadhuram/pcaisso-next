/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async function () {
    return [
      {
        source: '/',
        // `source` type `String` - is the incoming request path pattern
        destination: '/home',
        // `destination` type `String` - is the path you want to route to
        permanent: true,
        // `permanent` type `Boolean` Only for Redirects
        // `true` will use 308 to cache the redirect
        // `false` will use 307 as temporary
      },
    ]
  }
};

export default nextConfig;
