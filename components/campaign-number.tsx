"use client"

import { useEffect, useState } from "react"

// 16 de agosto de 2026, à meia-noite, no horário de Fortaleza (UTC-3).
const CAMPAIGN_NUMBER_RELEASE = new Date("2026-08-16T00:00:00-03:00").getTime()

type CampaignNumberProps = {
  prefix?: string
}

export function CampaignNumber({ prefix = " · " }: CampaignNumberProps) {
  const [isReleased, setIsReleased] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setIsReleased(Date.now() >= CAMPAIGN_NUMBER_RELEASE)

    updateVisibility()

    const remainingTime = CAMPAIGN_NUMBER_RELEASE - Date.now()
    if (remainingTime <= 0) return

    const timeout = window.setTimeout(updateVisibility, remainingTime)
    return () => window.clearTimeout(timeout)
  }, [])

  if (!isReleased) return null

  return <>{prefix}Nº 55011</>
}
