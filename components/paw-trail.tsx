"use client"

import { useEffect, useRef, useCallback } from "react"

interface Paw {
  id: number
  x: number
  y: number
  angle: number
  createdAt: number
}

const PAW_LIFETIME = 1200   // ms até desaparecer
const PAW_INTERVAL = 48     // px entre cada pata
const PAW_SIZE = 22         // tamanho da pata
const SIDE_OFFSET = 12      // distância perpendicular ao caminho

const PAW_SVG = (flip: boolean) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${PAW_SIZE}" height="${PAW_SIZE}" viewBox="0 0 128 128" style="${flip ? "transform:scaleX(-1)" : ""}">
  <ellipse cx="28" cy="28" rx="13" ry="18" fill="currentColor" transform="rotate(-20 28 28)" />
  <ellipse cx="54" cy="18" rx="13" ry="18" fill="currentColor" />
  <ellipse cx="80" cy="24" rx="13" ry="18" fill="currentColor" transform="rotate(18 80 24)" />
  <ellipse cx="98" cy="44" rx="11" ry="16" fill="currentColor" transform="rotate(38 98 44)" />
  <ellipse cx="58" cy="87" rx="44" ry="31" fill="currentColor" />
</svg>`

export function PawTrail() {
  const pawsRef = useRef<Paw[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)
  const stepRef = useRef(0)
  const idRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const render = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const now = Date.now()
    pawsRef.current = pawsRef.current.filter(p => now - p.createdAt < PAW_LIFETIME)

    const activeIds = new Set(pawsRef.current.map(p => p.id))

    // Remove patas expiradas do DOM
    container.querySelectorAll<HTMLElement>("[data-paw-id]").forEach(el => {
      const id = Number(el.dataset.pawId)
      if (!activeIds.has(id)) {
        el.remove()
      } else {
        const paw = pawsRef.current.find(p => p.id === id)!
        const age = (now - paw.createdAt) / PAW_LIFETIME
        el.style.opacity = String(0.35 * (1 - age))
      }
    })

    if (pawsRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(render)
    } else {
      rafRef.current = null
    }
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (!container) return

      const mx = e.clientX
      const my = e.clientY
      const last = lastPosRef.current

      if (!last) {
        lastPosRef.current = { x: mx, y: my }
        return
      }

      const dist = Math.hypot(mx - last.x, my - last.y)
      if (dist < PAW_INTERVAL) return

      // Ângulo do movimento
      const moveAngle = Math.atan2(my - last.y, mx - last.x)
      lastPosRef.current = { x: mx, y: my }

      // Offset perpendicular: alterna esquerda/direita
      const side = stepRef.current % 2 === 0 ? 1 : -1
      stepRef.current++

      const perpAngle = moveAngle + Math.PI / 2
      const px = mx + Math.cos(perpAngle) * SIDE_OFFSET * side
      const py = my + Math.sin(perpAngle) * SIDE_OFFSET * side

      const paw: Paw = {
        id: idRef.current++,
        x: px,
        y: py,
        angle: moveAngle * (180 / Math.PI) + 90,
        createdAt: Date.now(),
      }
      pawsRef.current.push(paw)

      // Cria elemento DOM
      const el = document.createElement("div")
      el.dataset.pawId = String(paw.id)
      el.style.cssText = `
        position: fixed;
        left: ${paw.x - PAW_SIZE / 2}px;
        top: ${paw.y - PAW_SIZE / 2}px;
        width: ${PAW_SIZE}px;
        height: ${PAW_SIZE}px;
        transform: rotate(${paw.angle}deg);
        opacity: 0.35;
        pointer-events: none;
        color: var(--primary);
        transition: opacity 0.08s linear;
      `
      el.innerHTML = PAW_SVG(side > 0)
      container.appendChild(el)

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(render)
      }
    }

    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [render])

  return (
    <div
      ref={containerRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}
      aria-hidden
    />
  )
}
