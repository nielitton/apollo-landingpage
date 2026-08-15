import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

export const dynamic = 'force-dynamic'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair'
});

const campaignNumberReleased = () =>
  Date.now() >= new Date('2026-08-16T00:00:00-03:00').getTime()

export function generateMetadata(): Metadata {
  const showCampaignNumber = campaignNumberReleased()

  return {
    title: showCampaignNumber
      ? 'Apollo Vicz 55011 | Candidato a Deputado Estadual'
      : 'Apollo Vicz | Candidato a Deputado Estadual',
    description: showCampaignNumber
      ? 'Apollo Vicz, candidato a deputado estadual pelo PSD, número 55011. Proteção animal e políticas públicas para o Ceará.'
      : 'Apollo Vicz, candidato a deputado estadual pelo PSD. Proteção animal e políticas públicas para o Ceará.',
    icons: {
      icon: { url: '/icon.svg', type: 'image/svg+xml' },
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Header />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
