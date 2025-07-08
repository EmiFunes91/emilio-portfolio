import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://emiliofunes-portfolio.vercel.app'
  // Rutas reales del sitio (agrega aquí si sumas nuevas páginas)
  const paths = [
    '/',
    '/blog',
    '/servicios',
  ]

  return paths.map((path, idx) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'monthly' : 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }))
} 