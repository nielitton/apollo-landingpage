import { Instagram, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { CampaignNumber } from "@/components/campaign-number"

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
              Candidato a deputado estadual, protetor animal e ativista.
              Lutando por políticas públicas em defesa dos animais no Ceará.
            </p>
            <div className="flex flex-col items-start gap-3 pt-2">
              <Link
                href="/coleiras"
                className="inline-flex justify-center whitespace-nowrap px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold shadow hover:from-blue-600 hover:via-blue-700 hover:to-blue-900 transition-all duration-200 cursor-pointer select-none"
              >
                Peça suas coleiras
              </Link>
              <Link
                href="/adesivos"
                className="inline-flex justify-center whitespace-nowrap px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold shadow hover:from-blue-600 hover:via-blue-700 hover:to-blue-900 transition-all duration-200 cursor-pointer select-none"
              >
                Peça seu material de campanha
              </Link>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="https://www.instagram.com/apollovicz/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link
                href="mailto:contato@apollovicz.com.br"
                className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-colors group"
                aria-label="Enviar e-mail para a campanha"
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
                  Rua Nereide, Granja Portugal, Fortaleza - CE
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:contato@apollovicz.com.br" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  contato@apollovicz.com.br
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Links Rápidos</h4>
            <nav className="space-y-2">
              <Link href="/#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">
                Sobre
              </Link>
              <Link href="/#trajetoria" className="block text-muted-foreground text-sm hover:text-primary transition-colors">
                Trajetória
              </Link>
              <Link href="/#projetos" className="block text-muted-foreground text-sm hover:text-primary transition-colors">
                Projetos
              </Link>
              <Link href="mailto:contato@apollovicz.com.br" className="block text-muted-foreground text-sm hover:text-primary transition-colors">
                Contato
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border space-y-4">
          <div className="rounded-xl border border-primary/30 bg-primary/5 px-5 py-4 text-center">
            <p className="font-semibold text-foreground">
              Lucas Nocrato Soares — Apollo Vicz
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Candidato a Deputado Estadual<CampaignNumber /> · PSD — Partido Social Democrático (55)
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              CNPJ da campanha: 68.403.664/0001-35 · Propaganda Eleitoral
            </p>
          </div>
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Apollo Vicz. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
