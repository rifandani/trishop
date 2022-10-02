import { DefaultSeoProps } from 'next-seo'

const defaultSeoProps = {
  titleTemplate: 'Trishop - %s',
  defaultTitle: 'Trishop - Cake Shop',
  description:
    'Tell us your custom cake design. We make your dream cake becomes reality',
  canonical: 'https://trishop.vercel.app/',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    site_name: 'Trishop',
    url: 'https://trishop.vercel.app/',
    title: 'Trishop - Cake Shop',
    description:
      'Tell us your custom cake design. We make your dream cake becomes reality',
    images: [
      {
        url: 'https://trishop.vercel.app/images/trishop.png',
        width: 800,
        height: 600,
        alt: 'Trishop Logo Image',
      },
    ],
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'minimum-scale=1, initial-scale=1, width=device-width',
    },
  ],
} as DefaultSeoProps

export default defaultSeoProps
