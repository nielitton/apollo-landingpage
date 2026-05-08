import { Heart, Home, Award, Vote, Building2, ArrowRight } from "lucide-react"
import Image from "next/image"

export function TimelineSection() {
  const timeline = [
    {
      year: "Infância",
      title: "Nascimento e Primeiros Vínculos",
      description: "Nasceu em São Miguel Paulista, interior de São Paulo. Desde cedo, desenvolveu fortes vínculos com animais, sempre os tratando com carinho e respeito.",
      icon: Heart,
      hasPhoto: false,
    },
    {
      year: "13 anos",
      title: "Superação e Resiliência",
      description: "Vítima de homofobia, foi expulso de casa e viveu em situação de rua por um curto período. Uma fase difícil que forjou sua força e determinação.",
      icon: Home,
      hasPhoto: false
    },
    {
      year: "Acolhimento",
      title: "Abrigo São Lázaro",
      description: "Acolhido por Rosane Dantas, fundadora do Abrigo São Lázaro em Fortaleza. Ali, Apollo se dedicou ao resgate e reabilitação de animais, dando início à sua luta pela proteção animal.",
      icon: Heart,
      hasPhoto: true,
      photoSrc: "/images/apollo-em-abrigo.png",
      photoLabel: "Apollo no abrigo"
    },
    {
      year: "Consolidação",
      title: "Ativista Reconhecido",
      description: "Consolidou-se como um ativista reconhecido em todo o Ceará, dedicando sua vida ao resgate, reabilitação e proteção de animais em situação de vulnerabilidade.",
      icon: Award,
      hasPhoto: false,
    },
    {
      year: "2020",
      title: "Primeira Candidatura",
      description: "Candidatou-se a vereador de Fortaleza pela primeira vez, obtendo 4.348 votos. O início de uma trajetória política.",
      icon: Vote,
      hasPhoto: false
    },
    {
      year: "2022",
      title: "Deputado Estadual",
      description: "Concorreu ao cargo de deputado estadual, conquistando expressivos 30.119 votos e ficando com a segunda suplência.",
      icon: Building2,
      hasPhoto: true,
      photoSrc: "/images/apollo-de-terno.png",
      photoLabel: "Apollo de terno",
      photoPosition: "object-top"
    },
    {
      year: "2024",
      title: "Eleito Vereador",
      description: "Eleito vereador da capital com 12.772 votos, consolidando sua representatividade junto ao povo de Fortaleza.",
      icon: Award,
      hasPhoto: false,
    },
    {
      year: "2025",
      title: "Secretaria de Proteção Animal",
      description: "Assumiu a Secretaria Municipal de Proteção Animal, onde desenvolveu ações voltadas para a saúde e bem-estar dos animais.",
      icon: Building2,
      hasPhoto: false,
    },
    {
      year: "Abril 2026",
      title: "Retorno à Câmara",
      description: "Retornou à Câmara de Fortaleza, onde pretende fortalecer políticas públicas, combater os maus-tratos e incentivar a adoção responsável.",
      icon: ArrowRight,
      hasPhoto: false
    },
  ]

  return (
    <section id="trajetoria" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-medium tracking-wider uppercase text-sm">
            Trajetória
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Uma História de Luta
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Da infância em São Paulo à Câmara de Fortaleza, uma jornada marcada 
            por superação, amor aos animais e compromisso com a causa.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {timeline.map((item, index) => {
              const Icon = item.icon
              const isEven = index % 2 === 0

              return (
                <div 
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className={`space-y-3 ${isEven ? 'md:ml-auto' : ''} max-w-md`}>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {item.year}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-4 md:left-1/2 top-0 md:-translate-x-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                      <Icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Photo placeholder */}
                  <div className={`flex-1 pl-12 md:pl-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    {item.hasPhoto && item.photoSrc && (
                      <div className={`${isEven ? '' : 'md:ml-auto'} max-w-sm`}>
                        <div className="relative aspect-video rounded-xl bg-card border border-border overflow-hidden">
                          <Image
                            src={item.photoSrc}
                            alt={item.photoLabel ?? item.title}
                            fill
                            className={`object-cover ${item.photoPosition ?? ''}`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
