"use client"

import { motion } from "framer-motion"

export function StatsSection() {
  const stats = [
    { number: "12.772", label: "Votos em 2024", highlight: true },
    { number: "30.119", label: "Votos para Deputado (2022)" },
    { number: "4.348", label: "Votos em 2020" },
    { number: "32", label: "Anos de Vida" },
  ]

  return (
    <section id="numeros" className="py-20 bg-card/50 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center space-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              <p className={`font-serif text-4xl md:text-5xl font-bold ${stat.highlight ? "text-primary" : "text-foreground"}`}>
                {stat.number}
              </p>
              <p className="text-muted-foreground text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
