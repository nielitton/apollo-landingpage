import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { MissionSection } from "@/components/mission-section"
import { PawTrail } from "@/components/paw-trail"
import { PetitionSection } from "@/components/petition"
import { ProjectsSection } from "@/components/projects-section"
import { StatsSection } from "@/components/stats-section"
import { TimelineSection } from "@/components/timeline-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <PawTrail />
      <HeroSection />
      <StatsSection />
      <TimelineSection />
      <ProjectsSection />
      <MissionSection />
      <PetitionSection />
      <Footer />
    </main>
  )
}
