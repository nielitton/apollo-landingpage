"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as any },
})

export function HeroSection() {
  return (
    <section className="poster-surface relative min-h-screen overflow-hidden bg-primary flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[#D82D04]" />
      <div className="absolute -left-28 top-[18%] h-64 w-[58%] -rotate-3 bg-[#F8EAD3] opacity-95" />
      <div className="absolute -bottom-40 -right-24 h-96 w-[65%] -rotate-12 bg-[#4B2B25]" />
      <div className="absolute right-[38%] top-24 h-24 w-7 rotate-[58deg] bg-[#561F12]" />

      <div className="relative z-10 container mx-auto px-6 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="relative space-y-7">
            <motion.div
              className="inline-flex max-w-full -rotate-1 flex-wrap items-stretch border-4 border-[#F8EAD3] bg-[#561F12] font-serif font-black uppercase leading-none text-[#F8EAD3] shadow-[9px_9px_0_#9C320B]"
              {...fadeUp(0.1)}
            >
              <span className="flex items-center px-4 py-3 text-xl sm:px-6 sm:text-2xl lg:text-3xl">
                Candidato a Deputado Estadual
              </span>
            </motion.div>

            <motion.h1
              className="poster-heading text-6xl text-[#561F12] sm:text-7xl md:text-8xl lg:text-9xl"
              {...fadeUp(0.2)}
            >
              Apollo Vicz
            </motion.h1>

            <motion.div
              className="inline-block -rotate-1 bg-[#561F12] px-5 py-2 font-serif text-5xl font-black tracking-tight text-[#F8EAD3] shadow-[8px_8px_0_#9C320B] md:text-7xl"
              {...fadeUp(0.25)}
            >
              55011
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-[#561F12] font-black uppercase tracking-wide"
              {...fadeUp(0.3)}
            >
              Protetor Animal & Ativista
            </motion.p>

            <motion.p
              className="max-w-xl text-lg font-medium leading-relaxed text-[#4B2B25]"
              {...fadeUp(0.4)}
            >
              20 anos dedicados à luta pela proteção animal. De São Miguel Paulista
              para a vida pública no Ceará, uma trajetória de resiliência, amor e
              compromisso com os que não têm voz.
            </motion.p>

            <motion.div className="flex items-center gap-4 pt-4" {...fadeUp(0.5)}>
              <Link
                href="https://www.instagram.com/apollovicz/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-sm bg-[#561F12] hover:bg-[#4B2B25] transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-[#F8EAD3] transition-colors" />
              </Link>
              <Link
                href="#"
                className="p-3 rounded-sm bg-[#561F12] hover:bg-[#4B2B25] transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-[#F8EAD3] transition-colors" />
              </Link>
              <Link
                href="mailto:contato@apollovicz.com.br"
                className="p-3 rounded-sm bg-[#561F12] hover:bg-[#4B2B25] transition-colors group"
                aria-label="Enviar e-mail para a campanha"
              >
                <Mail className="w-5 h-5 text-[#F8EAD3] transition-colors" />
              </Link>
            </motion.div>

            {/* Call to action buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4 pt-8" {...fadeUp(0.55)}>
              <Link
                href="/peca-meu-material"
                className="group inline-flex items-center px-7 py-3 rounded-sm bg-[#561F12] text-[#F8EAD3] font-black uppercase tracking-wide text-base shadow-[7px_7px_0_#9C320B] hover:-translate-y-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative overflow-hidden cursor-pointer select-none"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Peça seu material de campanha
                </span>
              </Link>
              <Link
                href="/coleiras"
                className="group inline-flex items-center px-7 py-3 rounded-sm border-4 border-[#561F12] bg-[#F8EAD3] text-[#561F12] font-black uppercase tracking-wide text-base shadow-[7px_7px_0_#561F12] hover:-translate-y-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative overflow-hidden cursor-pointer select-none"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Peça suas coleiras
                </span>
              </Link>
            </motion.div>

            <motion.div className="pt-8" {...fadeUp(0.6)}>
              <Link
                href="#trajetoria"
                className="inline-flex items-center gap-2 font-bold text-[#561F12] hover:text-[#4B2B25] transition-colors"
              >
                <span className="text-sm font-medium">Conheça minha história</span>
                <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as any }}
          >
            <div className="poster-frame relative aspect-square overflow-hidden bg-secondary">
              <Image
                src="/images/principal-nova.png"
                alt="Apollo Vicz"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rotate-[-4deg] overflow-hidden border-4 border-[#F8EAD3] bg-card shadow-[8px_8px_0_#561F12]">
              <Image
                src="/images/acao-com-animal.jpg"
                alt="Apollo Vicz com animal"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
