import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair'
});

export function generateMetadata(): Metadata {
  return {
    title: 'Apollo Vicz 55011 | Candidato a Deputado Estadual',
    description: 'Apollo Vicz, candidato a deputado estadual pelo PSD, número 55011. Proteção animal e políticas públicas para o Ceará.',
    icons: {
      icon: { url: '/favicon.ico', type: 'image/x-icon' },
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Header />
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
