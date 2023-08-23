import createMdx from '@next/mdx'

// Configure for MDX
const withMDX = createMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react' // Needed for the `MDXProvider`
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Include Markdown extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/pjd199/**'
      }
    ]
  }
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
