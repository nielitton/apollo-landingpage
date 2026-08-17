"use client"

import { ImagePlus, Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CampaignNumber } from "@/components/campaign-number"

const navLinks = [
  { label: "Início", href: "#" },
  { label: "Números", href: "#numeros" },
  { label: "Trajetória", href: "#trajetoria" },
  { label: "Projetos", href: "#projetos" },
  { label: "Missão", href: "#missao" },
]

// Função auxiliar para ir para a home+hash, mesmo que não esteja na home
function goToHomeHash(router: ReturnType<typeof useRouter>, hash: string) {
  if (hash === "#" || !hash) router.push("/")
  else router.push(`/${hash}`)
}

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Handler para navegação nos links da navbar (desktop + mobile)
  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith("/")) {
      setMenuOpen(false)
      return
    }
    if (pathname !== "/") {
      e.preventDefault()
      goToHomeHash(router, href.startsWith("#") ? href : "")
      setMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/85 backdrop-blur-[10px] backdrop-saturate-150 border-b border-primary/15 shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="#"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              if (pathname !== "/") {
                e.preventDefault()
                goToHomeHash(router, "#")
              }
            }}
            className="font-serif text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Apollo Vicz<CampaignNumber />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Toggle + menu mobile */}
          <div className="flex items-center gap-2">
            <Link
              href="/meu-story"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-[#D82D04] hover:shadow-lg sm:px-4"
              aria-label="Criar meu Story com o filtro Apollo Vicz"
            >
              <ImagePlus className="size-4" aria-hidden="true" />
              <span className="hidden lg:inline">Crie seu Story</span>
              <span className="lg:hidden">Story</span>
            </Link>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Alternar tema"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-[10px] backdrop-saturate-150 border-b border-primary/15">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
