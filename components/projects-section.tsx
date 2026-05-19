"use client"

import Image from "next/image"
import { useState } from "react"
import { PawPrint, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const projects = [
  {
    name: "Parada Pet",
    slug: "parada-pet",
    tagline: "Bem-estar animal levado até a comunidade",
    description:
      "A Parada Pet é uma iniciativa itinerante de bem-estar animal que promove ações fundamentais de saúde e proteção em diferentes comunidades. O evento funciona como uma central de serviços gratuitos, com o objetivo de conscientizar a população e facilitar o acesso a cuidados veterinários básicos.",
    stats: [
      { value: "9", label: "edições realizadas" },
      { value: "+4.600", label: "animais atendidos" },
      { value: "56", label: "animais adotados" },
    ],
    detail:
      "Dionísio Torres, Conjunto Ceará, Messejana, Papicu, Centro, Cuca da Barra, Conjunto Esperança, José Walter e Canindezinho estão entre os bairros contemplados pelos serviços.",
    photos: [] as { src: string; alt: string }[],
  },
  {
    name: "Circuito Pet",
    slug: "circuito-pet",
    tagline: "Saúde animal dentro dos shoppings da cidade",
    description:
      "O Circuito Pet tem se consolidado como uma iniciativa fundamental em Fortaleza, apresentando serviços essenciais de saúde animal de cuidados das famílias fortalezenses. Ao levar o atendimento para dentro dos shoppings da cidade, o evento remove barreiras de acesso e torna o cuidado com os animais de estimação mais prático e acessível.",
    stats: [
      { value: "3", label: "edições realizadas" },
      { value: "+2.000", label: "animais atendidos" },
    ],
    detail:
      "Shopping Rio Mar Kennedy, Jóquei e Via Sul estão entre os shoppings contemplados pelo serviço.",
    photos: [] as { src: string; alt: string }[],
  },
  {
    name: "Educa Animal",
    slug: "educa-animal",
    tagline: "Informação e conscientização contra os maus-tratos",
    description:
      "Educa Animal é um programa que leva informações sobre bem-estar animal e prevenção aos maus-tratos para órgãos públicos e privados, promovendo a conscientização da população. O programa realiza entrega de panfletos e visitas em escolas.",
    stats: [
      { value: "32", label: "palestras realizadas" },
    ],
    detail:
      "ETUFOR, FormaCE, IMPARH, Hospital Distrital Gonzaga Mota, AMC, Secretaria Regional V, Escola de Gestão Pública do Estado do Ceará, Shopping RioMar Fortaleza e North Shopping Jóquei estão entre os órgãos contemplados.",
    photos: [] as { src: string; alt: string }[],
  },
  {
    name: "Carona Pet",
    slug: "carona-pet",
    tagline: "Transporte solidário para animais em situação de vulnerabilidade",
    description:
      "O Carona Pet é um serviço de transporte de animais destinado a garantir o deslocamento de cães e gatos para atendimento veterinário de urgência, apoio logístico para cães e gatos doadores e animais assistidos pelo PVS (Programa Veterinário Solidário).",
    stats: [
      { value: "+2.500", label: "animais assistidos" },
    ],
    detail:
      "O serviço atende animais em situação de urgência veterinária, cães e gatos doadores e animais acompanhados pelo Programa Veterinário Solidário.",
    photos: [] as { src: string; alt: string }[],
  },
  {
    name: "Grupo Terapêutico",
    slug: "grupo-terapeutico",
    tagline: "Apoio psicossocial para quem cuida dos animais",
    description:
      "O Grupo Terapêutico para Protetores de Animais é uma atividade coletiva de apoio psicossocial e educativo destinada a protetores independentes e responsáveis por abrigos, com o objetivo de oferecer suporte emocional, orientação técnica, fortalecimento de vínculos, prevenção da sobrecarga emocional e promoção do bem-estar de quem cuida dos animais sob sua responsabilidade.",
    stats: [
      { value: "8", label: "encontros realizados" },
    ],
    detail:
      "Uma iniciativa voltada ao cuidado de quem cuida — protetores independentes e responsáveis por abrigos que dedicam suas vidas aos animais.",
    photos: [] as { src: string; alt: string }[],
  },
  {
    name: "Abrigo Legal",
    slug: "abrigo-legal",
    tagline: "Capacitação e regularização de abrigos independentes",
    description:
      "O projeto Abrigo Legal é uma parceria entre a SMPA e SEUMA que ajuda na capacitação e a regularização de abrigos e protetores independentes, permitindo que recebam verbas, convênios e emendas federais e estaduais, além do apoio necessário para dar continuidade ao trabalho com dignidade e transparência.",
    stats: [] as { value: string; label: string }[],
    detail:
      "Uma parceria entre a Secretaria Municipal de Proteção Animal e a SEUMA para fortalecer e formalizar a rede de proteção animal independente de Fortaleza.",
    photos: [] as { src: string; alt: string }[],
  },
]

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export function ProjectsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const prev = () => {
    setDirection(-1)
    setCurrent((i) => (i - 1 + projects.length) % projects.length)
  }

  const next = () => {
    setDirection(1)
    setCurrent((i) => (i + 1) % projects.length)
  }

  const project = projects[current]

  return (
    <section id="projetos" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-primary font-medium tracking-wider uppercase text-sm">
            Projetos
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Ações que Transformam
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Iniciativas concretas que levam saúde, proteção e dignidade aos
            animais e às comunidades de Fortaleza.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col lg:flex-row gap-12 items-center min-h-[420px]"
            >
              {/* Text content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <PawPrint className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-foreground">
                    {project.name}
                  </h3>
                </div>

                <p className="text-primary font-medium">{project.tagline}</p>

                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Stats */}
                {project.stats.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {project.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="text-center p-4 rounded-xl bg-background border border-border"
                      >
                        <p className="font-serif text-2xl font-bold text-primary">
                          {stat.value}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-sm text-muted-foreground italic border-l-2 border-primary/40 pl-4">
                  {project.detail}
                </p>
              </div>

              {/* Photos */}
              <div className="flex-1 w-full">
                {project.photos.length > 0 ? (
                  <div
                    className={`grid gap-4 ${
                      project.photos.length === 1 ? "grid-cols-1" : "grid-cols-2"
                    }`}
                  >
                    {project.photos.map((photo, i) => (
                      <div
                        key={i}
                        className={`relative rounded-xl overflow-hidden border border-border ${
                          project.photos.length === 1
                            ? "aspect-video"
                            : i === 0 && project.photos.length >= 3
                            ? "aspect-square col-span-2"
                            : "aspect-square"
                        }`}
                      >
                        <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="aspect-video rounded-xl bg-card border-2 border-dashed border-border flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <PawPrint className="w-10 h-10 text-muted-foreground/40 mx-auto" />
                      <p className="text-sm text-muted-foreground/60">
                        Fotos do {project.name} em breve
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors flex items-center justify-center"
            aria-label="Projeto anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1)
                  setCurrent(i)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/40"
                }`}
                aria-label={`Ir para projeto ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors flex items-center justify-center"
            aria-label="Próximo projeto"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
