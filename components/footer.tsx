import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand + Call to Action Buttons */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-foreground">
              Apollo Vicz
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Vereador de Fortaleza, protetor animal e ativista.
              Lutando por políticas públicas em defesa dos animais.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/coleiras"
                className="px-4 py-2 rounded-full bg-primary text-white font-semibold shadow hover:bg-primary/80 transition"
              >
                Peça suas coleiras
              </Link>
              <Link
                href="/adesivos"
                className="px-4 py-2 rounded-full bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
              >
                Peça seu adesivo
              </Link>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="#"
                className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-colors group"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <p className="text-muted-foreground text-sm">
                  Câmara Municipal de Fortaleza<br />
                  Fortaleza, CE
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-muted-foreground text-sm">
                  (85) 99638-3243
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-muted-foreground text-sm">
                  contato@apollovicz.com.br
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Links Rápidos</h4>
            <nav className="space-y-2">
              <Link href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">
                Sobre
              </Link>
              <Link href="#trajetoria" className="block text-muted-foreground text-sm hover:text-primary transition-colors">
                Trajetória
              </Link>
              <Link href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">
                Projetos
              </Link>
              <Link href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">
                Contato
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Apollo Vicz. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
