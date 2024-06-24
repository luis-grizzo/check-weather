import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Check Weather',
    short_name: 'Check Weather',
    description: 'Consult your local weather info!',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafafa',
    theme_color: '#fafafa',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon'
      }
    ]
  }
}
