"use client"

import { Shield, Heart, Users } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

export function MissionSection() {
  const pillars = [
    {
      icon: Shield,
      title: "Combate aos Maus-Tratos",
      description: "Fortalecer a fiscalização e criar mecanismos efetivos de punição para quem maltrata animais."
    },
    {
      icon: Heart,
      title: "Adoção Responsável",
      description: "Incentivar a adoção responsável através de campanhas educativas e parcerias com abrigos."
    },
    {
      icon: Users,
      title: "Políticas Públicas",
      description: "Desenvolver e implementar políticas públicas voltadas para a proteção e bem-estar animal."
    }
  ]

  return (
    <section id="missao" className="py-24 bg-card/50 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-primary font-medium tracking-wider uppercase text-sm">
                Missão
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Voz para quem não pode falar
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Na Câmara de Fortaleza, meu compromisso é claro: lutar incansavelmente
                pela proteção animal, criar políticas públicas efetivas e garantir que
                os animais tenham seus direitos respeitados.
              </p>
            </motion.div>

            {/* Pillars */}
            <div className="space-y-6">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <motion.div
                    key={index}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{pillar.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Photo grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl bg-secondary border border-border overflow-hidden">
                <Image src="/images/foto-em-acao.png" alt="Apollo em ação na Câmara" fill className="object-cover" />
              </div>
              <div className="relative aspect-[4/3] rounded-2xl bg-secondary border border-border overflow-hidden">
                <Image src="/images/abrigo.png" alt="Apollo com animais resgatados" fill className="object-cover" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative aspect-[4/3] rounded-2xl bg-secondary border border-border overflow-hidden">
                <Image src="/images/abrigo-2.png" alt="Apollo em evento" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-2xl bg-secondary border border-border overflow-hidden">
                <Image src="/images/crianca.png" alt="Apollo com a comunidade" fill className="object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
