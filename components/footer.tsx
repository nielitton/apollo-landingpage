import { ImagePlus, Instagram, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { CampaignNumber } from "@/components/campaign-number"

export function Footer() {
  return (
    <footer className="poster-surface relative overflow-hidden py-16 bg-background border-t border-border">
      <div className="absolute -right-24 -top-16 h-56 w-80 rotate-12 bg-primary/20" />
      <div className="absolute -bottom-32 -left-20 h-56 w-96 -rotate-12 bg-[#561F12]" />
      <div className="relative container mx-auto px-6">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 border-b-4 border-primary pb-10 md:flex-row md:items-end">
          <div>
            <p className="poster-kicker text-sm">Candidato a Deputado Estadual</p>
            <h2 className="poster-heading mt-5 text-6xl text-foreground sm:text-7xl md:text-8xl">
              Apollo Vicz
            </h2>
          </div>
          <div className="-rotate-2 bg-primary px-6 py-3 font-serif text-5xl font-black text-primary-foreground shadow-[8px_8px_0_#9C320B] md:text-7xl">
            55011
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand + Call to Action Buttons */}
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Candidato a deputado estadual, protetor animal e ativista.
              Lutando por políticas públicas em defesa dos animais no Ceará.
            </p>
            <div className="flex flex-col items-start gap-3 pt-2">
              <Link
                href="/meu-story"
                className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 font-black uppercase tracking-wide text-primary-foreground shadow-[5px_5px_0_#9C320B] transition-all duration-200 hover:-translate-y-1 hover:bg-[#D82D04] cursor-pointer select-none"
              >
                <ImagePlus className="size-5" aria-hidden="true" />
                Crie seu Story ou foto
              </Link>
              <Link
                href="/peca-meu-material"
                className="inline-flex justify-center whitespace-nowrap border-3 border-primary bg-transparent px-5 py-3 font-black uppercase tracking-wide text-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground cursor-pointer select-none"
              >
                Peça seu material de campanha
              </Link>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="https://www.instagram.com/apollovicz/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-primary bg-secondary p-2 transition-colors group hover:bg-primary"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link
                href="mailto:contato@apollovicz.com.br"
                className="border-2 border-primary bg-secondary p-2 transition-colors group hover:bg-primary"
                aria-label="Enviar e-mail para a campanha"
              >
                <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="poster-heading text-3xl text-foreground">Contato</h4>
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
            <h4 className="poster-heading text-3xl text-foreground">Links Rápidos</h4>
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
              <Link href="/meu-story" className="block text-muted-foreground text-sm hover:text-primary transition-colors">
                Crie seu Story ou foto
              </Link>
              <Link href="mailto:contato@apollovicz.com.br" className="block text-muted-foreground text-sm hover:text-primary transition-colors">
                Contato
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border space-y-4">
          <div className="border-4 border-primary bg-[#F8EAD3] px-5 py-5 text-center shadow-[8px_8px_0_#9C320B]">
            <p className="font-black uppercase tracking-wide text-[#561F12]">
              Lucas Nocrato Soares — Apollo Vicz
            </p>
            <p className="mt-1 text-sm text-[#774537]">
              Candidato a Deputado Estadual<CampaignNumber /> · PSD — Partido Social Democrático (55)
            </p>
            <p className="mt-1 text-sm text-[#774537]">
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
