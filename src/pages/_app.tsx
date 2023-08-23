import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import { Lexend } from 'next/font/google'
import Head from 'next/head'

import components from '@/components/mantinemdxcomponents'
import { MantineProvider } from '@mantine/core'
import { MDXProvider } from '@mdx-js/react'

import Layout from '../components/layout'

const headingsFont = Lexend({ subsets: ['latin'] })

export default function CustomApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Advent of Code Solver</title>
        <meta name='description' content='A website to solve Advent of Code' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          //Put your mantine theme override here
          colorScheme: 'light',
          headings: {
            fontFamily: headingsFont.style.fontFamily
          },
          globalStyles: theme => ({
            '.mantine-Title-root.mdx': {
              marginBottom: '0.75em'
            },
            '.mantine-Text-root.mdx': {
              marginBottom: '0.75em'
            },
            '.mantine-List-root.mdx': {
              marginBottom: '0.75em'
            }
          })
        }}
      >
        <MDXProvider components={components}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MDXProvider>
      </MantineProvider>
    </>
  )
}

CustomApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}
