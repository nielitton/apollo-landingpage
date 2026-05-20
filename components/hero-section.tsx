"use client"

import { Instagram, Facebook, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
})

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <motion.p
              className="text-primary font-medium tracking-wider uppercase text-sm"
              {...fadeUp(0.1)}
            >
              Vereador de Fortaleza
            </motion.p>

            <motion.h1
              className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-tight"
              {...fadeUp(0.2)}
            >
              Apollo Vicz
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground font-light"
              {...fadeUp(0.3)}
            >
              Protetor Animal & Ativista
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
              {...fadeUp(0.4)}
            >
              19 anos dedicados à luta pela proteção animal. De São Miguel Paulista
              para a Câmara de Fortaleza, uma trajetória de resiliência, amor e
              compromisso com os que não têm voz.
            </motion.p>

            <motion.div className="flex items-center gap-4 pt-4" {...fadeUp(0.5)}>
              <Link
                href="https://www.instagram.com/apollovicz/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link
                href="#"
                className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link
                href="#"
                className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition-colors group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </motion.div>

            <motion.div className="pt-8" {...fadeUp(0.6)}>
              <Link
                href="#trajetoria"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
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
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary border border-border">
              <Image
                src="/images/principal-nova.png"
                alt="Apollo Vicz"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/30 rounded-2xl -z-10" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-xl overflow-hidden bg-card border border-border shadow-xl">
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
