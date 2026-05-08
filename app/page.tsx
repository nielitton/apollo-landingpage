import { Header } from "@/components/header"
import { PawTrail } from "@/components/paw-trail"
import { HeroSection } from "@/components/hero-section"
import { TimelineSection } from "@/components/timeline-section"
import { StatsSection } from "@/components/stats-section"
import { MissionSection } from "@/components/mission-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <PawTrail />
      <Header />
      <HeroSection />
      <StatsSection />
      <TimelineSection />
      <MissionSection />
      <Footer />
    </main>
  )
}
