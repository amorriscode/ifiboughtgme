import { DefaultSeo } from 'next-seo'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://ifiboughtg.me',
          site_name: 'If I bought $GME...',
          title: 'If I bought $GME...',
          description: '$GME go brrrrrrrr!',
          images: [
            {
              url: 'https://ifiboughtg.me/og.png',
              width: 1200,
              height: 630,
              alt: '$GME go brrrrrrrr!',
            },
          ],
        }}
        twitter={{
          handle: '@amorriscode',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
