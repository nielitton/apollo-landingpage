"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu, X } from "lucide-react"
import Link from "next/link"

const navLinks = [
  { label: "Início", href: "#" },
  { label: "Números", href: "#numeros" },
  { label: "Trajetória", href: "#trajetoria" },
  { label: "Projetos", href: "#projetos" },
  { label: "Missão", href: "#missao" },
  // Abaixo-assinado removido daqui; será um botão especial
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Botão do abaixo-assinado agora sempre com padrão dark, independente do theme
  const abaixoAssinadoBtnClass =
    `
      hidden
      md:inline-flex
      items-center
      px-4
      py-2
      rounded-full
      bg-[#2563eb]
      text-white
      font-semibold
      text-sm
      shadow-[0_0_16px_2px_rgba(37,99,235,0.6)]
      hover:bg-[#1e40af]
      hover:shadow-[0_0_32px_6px_rgba(37,99,235,0.9)]
      transition-all
      animate-glow
      focus:outline-none
      uppercase
    `
  const abaixoAssinadoBtnStyle = {
    textShadow: "0 0 5px #2563eb, 0 0 10px #3b82f6",
    boxShadow: "0 0 8px 2px #2563eb99"
  }

  // Para o botão mobile, mesma coisa, só tirando o hidden/md:inline-flex
  const abaixoAssinadoBtnMobileClass =
    `
      inline-flex
      items-center
      px-4
      py-2
      rounded-full
      bg-[#2563eb]
      text-white
      font-semibold
      text-sm
      shadow-[0_0_16px_2px_rgba(37,99,235,0.6)]
      hover:bg-[#1e40af]
      hover:shadow-[0_0_32px_6px_rgba(37,99,235,0.9)]
      transition-all
      mt-2
      uppercase
    `
  const abaixoAssinadoBtnMobileStyle = {
    textShadow: "0 0 5px #2563eb, 0 0 10px #3b82f6",
    boxShadow: "0 0 8px 2px #2563eb99"
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/60 backdrop-blur-[7px] backdrop-saturate-150 border-b border-white/20 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="#"
            className="font-serif text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Apollo Vicz
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Botão especial da Petição + Toggle + menu mobile */}
          <div className="flex items-center gap-2">
            <Link
              href="#petition"
              className={abaixoAssinadoBtnClass}
              style={abaixoAssinadoBtnStyle}
            >
              Abaixo-assinado
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
        <div className="md:hidden bg-background/60 backdrop-blur-[7px] backdrop-saturate-150 border-b border-white/20">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
            {/* Botão de petição no mobile menu */}
            <Link
              href="#petition"
              onClick={() => setMenuOpen(false)}
              className={abaixoAssinadoBtnMobileClass}
              style={abaixoAssinadoBtnMobileStyle}
            >
              Abaixo-assinado
            </Link>
          </nav>
        </div>
      )}

      {/* Definição de animação glow sem borda/luz externa piscando */}
      <style jsx global>{`
        @keyframes glow {
          0% { box-shadow: 0 0 8px 2px #2563eb99; }
          50% { box-shadow: 0 0 16px 6px #2563ebcc; }
          100% { box-shadow: 0 0 8px 2px #2563eb99; }
        }
        .animate-glow {
          animation: glow 2s infinite ease-in-out;
        }
      `}</style>
    </header>
  )
}
