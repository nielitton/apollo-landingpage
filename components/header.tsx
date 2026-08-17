"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

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
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

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
    <header className="site-header sticky top-0 z-50 w-full border-b border-primary/15 bg-background shadow-sm md:bg-background/90 md:backdrop-blur-[10px] md:backdrop-saturate-150">
      <div className="container mx-auto px-3 sm:px-6">
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
            className="font-serif text-xl font-black uppercase tracking-tight text-foreground hover:text-primary transition-colors sm:text-2xl"
          >
            Apollo Vicz
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
