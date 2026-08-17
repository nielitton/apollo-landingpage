"use client"

import { Download, ImagePlus, RefreshCw, ShieldCheck } from "lucide-react"
import NextImage from "next/image"
import { ChangeEvent, DragEvent, useRef, useState } from "react"
import storyFilter from "@/assets/Filtro_Apollo_Vicz_55011_Transparente.png"

const STORY_WIDTH = 1080
const STORY_HEIGHT = 1920
const MAX_FILE_SIZE = 20 * 1024 * 1024
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const storyExamples = [
  {
    src: "/images/principal-nova.png",
    alt: "Exemplo do filtro Apollo aplicado em uma foto vertical",
    position: "center 28%",
  },
  {
    src: "/images/acao-com-animal.jpg",
    alt: "Exemplo do filtro Apollo aplicado em uma foto com animal",
    position: "center",
  },
  {
    src: "/images/crianca.png",
    alt: "Exemplo do filtro Apollo aplicado em uma foto de apoiador",
    position: "center",
  },
]

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("Não foi possível abrir a imagem."))
    image.src = src
  })
}

export default function MeuStoryPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState("")
  const [error, setError] = useState("")
  const [ready, setReady] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [dragging, setDragging] = useState(false)

  async function processFile(file?: File) {
    setError("")
    setReady(false)

    if (!file) return
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Formato não aceito. Envie uma imagem PNG, JPG ou WebP.")
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("A imagem ultrapassa 20 MB. Escolha um arquivo menor.")
      return
    }

    setProcessing(true)
    const photoUrl = URL.createObjectURL(file)

    try {
      const photo = await loadImage(photoUrl)
      const overlay = await loadImage(storyFilter.src)
      const canvas = canvasRef.current
      if (!canvas) throw new Error("Não foi possível preparar a montagem.")

      const context = canvas.getContext("2d")
      if (!context) throw new Error("Seu navegador não permite gerar a imagem.")

      context.clearRect(0, 0, STORY_WIDTH, STORY_HEIGHT)
      const scale = Math.max(
        STORY_WIDTH / photo.naturalWidth,
        STORY_HEIGHT / photo.naturalHeight
      )
      const renderedWidth = photo.naturalWidth * scale
      const renderedHeight = photo.naturalHeight * scale
      const offsetX = (STORY_WIDTH - renderedWidth) / 2
      const offsetY = (STORY_HEIGHT - renderedHeight) / 2

      context.drawImage(photo, offsetX, offsetY, renderedWidth, renderedHeight)
      context.drawImage(overlay, 0, 0, STORY_WIDTH, STORY_HEIGHT)
      setFileName(file.name)
      setReady(true)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Não foi possível processar a imagem.")
    } finally {
      URL.revokeObjectURL(photoUrl)
      setProcessing(false)
    }
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    void processFile(event.target.files?.[0])
    event.target.value = ""
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setDragging(false)
    void processFile(event.dataTransfer.files?.[0])
  }

  function downloadStory() {
    const canvas = canvasRef.current
    if (!canvas || !ready) return

    const link = document.createElement("a")
    link.download = "meu-story-apollo-vicz-55011.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  return (
    <main className="min-h-screen bg-background px-6 pb-20 pt-28">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Seu apoio com a nossa identidade
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-foreground md:text-6xl">
            Crie seu Story com Apollo
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Envie sua foto no formato Stories, aplique automaticamente o filtro oficial e baixe a imagem pronta para publicar.
          </p>
        </div>

        <section className="mb-16" aria-labelledby="story-examples-title">
          <div className="mb-7 text-center">
            <h2 id="story-examples-title" className="font-serif text-3xl font-bold text-foreground">
              Veja como seu Story pode ficar
            </h2>
            <p className="mt-2 text-muted-foreground">
              O filtro oficial é aplicado sobre a foto e o resultado já fica pronto para publicar.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
            {storyExamples.map((example, index) => (
              <div
                key={example.src}
                className="group relative mx-auto aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-2xl border border-border bg-muted shadow-lg shadow-primary/10"
              >
                <NextImage
                  src={example.src}
                  alt={example.alt}
                  fill
                  sizes="(max-width: 640px) 260px, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ objectPosition: example.position }}
                />
                <NextImage
                  src={storyFilter}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 260px, 30vw"
                  className="pointer-events-none object-fill"
                  aria-hidden="true"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </section>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_420px]">
          <section className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 md:p-9">
            <h2 className="font-serif text-2xl font-bold text-foreground">Envie sua foto</h2>
            <p className="mt-2 text-muted-foreground">
              Envie uma imagem de qualquer tamanho. Ela será enquadrada automaticamente no formato vertical do Story.
            </p>

            <div
              className={`mt-7 flex min-h-72 flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
                dragging ? "border-primary bg-primary/10" : "border-primary/35 bg-primary/5 hover:border-primary/70"
              }`}
              onDragEnter={(event) => {
                event.preventDefault()
                setDragging(true)
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                <ImagePlus className="size-8" aria-hidden="true" />
              </span>
              <p className="mt-5 font-semibold text-foreground">Arraste sua foto para cá</p>
              <p className="mt-1 text-sm text-muted-foreground">ou selecione um arquivo do dispositivo</p>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={processing}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-[#D82D04] disabled:cursor-wait disabled:opacity-60"
              >
                {processing ? <RefreshCw className="size-5 animate-spin" /> : <ImagePlus className="size-5" />}
                {processing ? "Processando..." : ready ? "Escolher outra foto" : "Escolher foto"}
              </button>
              <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={handleInput}
              />
              <p className="mt-4 text-xs text-muted-foreground">PNG, JPG ou WebP · qualquer dimensão · máximo de 20 MB</p>
            </div>

            {error && (
              <div role="alert" className="mt-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                {error}
              </div>
            )}

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Sua foto é processada somente no seu navegador. Ela não é enviada nem armazenada em nossos servidores.
              </p>
            </div>
          </section>

          <section className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-xl shadow-primary/10">
              <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-muted">
                <canvas
                  ref={canvasRef}
                  width={STORY_WIDTH}
                  height={STORY_HEIGHT}
                  aria-label="Prévia do Story com o filtro Apollo Vicz"
                  className={`h-full w-full object-contain transition-opacity ${ready ? "opacity-100" : "opacity-0"}`}
                />
                {!ready && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <ImagePlus className="size-10 text-primary/60" />
                    <p className="mt-4 font-serif text-xl font-bold text-foreground">Sua prévia aparecerá aqui</p>
                    <p className="mt-2 text-sm text-muted-foreground">Formato final: 1080 × 1920 px</p>
                  </div>
                )}
              </div>
            </div>

            {ready && (
              <div className="mt-5">
                <p className="mb-3 truncate text-center text-sm text-muted-foreground">Foto: {fileName}</p>
                <button
                  type="button"
                  onClick={downloadStory}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-[#D82D04] to-[#9C320B] px-6 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110"
                >
                  <Download className="size-5" />
                  Baixar Story em PNG
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
