"use client"

import { motion } from "framer-motion";
import { useState } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyvW3l3mcVJIDtDSJkuMlm5FbDXnrzDZOyw0HLjgWwwbdSw5SBrU5hTUOveWnEKHs_ywg/exec";

// Função para aplicar máscara de CPF
function maskCpf(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
    .slice(0, 14)
}

// Função para aplicar máscara de telefone
function maskTelefone(value: string) {
  let numbers = value.replace(/\D/g, "").slice(0, 11)
  if (numbers.length <= 2) return `(${numbers}`
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  if (numbers.length <= 11)
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3, 7)}-${numbers.slice(7)}`
  return value
}

// Função para enviar para o Google Sheets
async function enviarFormulario(data: any) {
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: data.nome,
        email: data.email, // incluído email no envio
        celular: data.celular,
        cpf: data.cpf,
        endereco: data.endereco,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        lgpd: data.lgpd ? "Sim" : "Não",
        origem: "abaixo-assinado-50-gatos"
      })
    });
    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar formulário:", error);
    return { success: false, error };
  }
}

export function PetitionSection() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    endereco: "",
    cidade: "",
    estado: "",
    bairro: "",
    assino: false,
    lgpd: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [triedSubmit, setTriedSubmit] = useState(false)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target

    if (name === "cpf") {
      setForm((prev) => ({
        ...prev,
        cpf: maskCpf(value),
      }))
      return
    }

    if (name === "telefone") {
      setForm((prev) => ({
        ...prev,
        telefone: maskTelefone(value),
      }))
      return
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  function buildWhatsappUrl() {
    const nome = encodeURIComponent(form.nome.trim())
    const cidade = encodeURIComponent(form.cidade.trim())
    const estado = encodeURIComponent(form.estado.trim())
    let msg = "Olá, vim do abaixo-assinado pelos 50 gatos mortos pela Estrutural. Meu nome é " + form.nome.trim()
    if (cidade && estado) {
      msg += `, de ${form.cidade.trim()}/${form.estado.trim()}`
    }
    msg += ". Quero cobrar justiça pelos 50 gatos e participar da mobilização."
    return `https://wa.me/5585992105299?text=${encodeURIComponent(msg)}`
  }

  function allRequiredFilled() {
    return (
      form.nome.trim() &&
      form.email.trim() &&
      /^.+@.+\..+$/.test(form.email) &&
      form.cpf.replace(/\D/g, "").length === 11 &&
      form.telefone.replace(/\D/g, "").length === 11 &&
      form.cidade.trim() &&
      form.estado.trim() &&
      form.assino &&
      form.lgpd
    )
  }

  function getMissingFields() {
    const missing: string[] = []
    if (!form.nome.trim()) missing.push("Nome e sobrenome")
    if (!form.email.trim() || !/^.+@.+\..+$/.test(form.email)) missing.push("E-mail válido")
    if (form.cpf.replace(/\D/g, "").length !== 11) missing.push("CPF")
    if (form.telefone.replace(/\D/g, "").length !== 11) missing.push("Telefone")
    if (!form.cidade.trim()) missing.push("Cidade")
    if (!form.estado.trim()) missing.push("Estado")
    if (!form.assino) missing.push("Assinar embaixo")
    if (!form.lgpd) missing.push("Concordância LGPD")
    return missing
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTriedSubmit(true)
    setFeedback(null)
    setFeedbackType(null)

    if (!allRequiredFilled()) return

    setSaving(true)
    setSubmitted(false)
    setFeedback(null)
    try {
      const resp = await enviarFormulario({
        nome: form.nome,
        email: form.email,
        celular: form.telefone,
        cpf: form.cpf,
        endereco: form.endereco,
        bairro: form.bairro,
        cidade: form.cidade,
        estado: form.estado,
        lgpd: form.lgpd,
      });
      if (resp && resp.success) {
        setSubmitted(true)
        setFeedbackType("success")
        setFeedback(null)
        // Redirecionar direto para o WhatsApp
        window.location.href = buildWhatsappUrl()
      } else {
        setFeedback("Erro ao enviar cadastro. Tente novamente em alguns segundos.")
        setFeedbackType("error")
        setSubmitted(false)
        setSaving(false)
        return
      }
    } catch (err) {
      setFeedback("Erro ao enviar cadastro. Tente novamente em alguns segundos.")
      setFeedbackType("error")
      setSubmitted(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section id="petition" className="py-24 bg-card/50 border-t border-border">
      <div className="container mx-auto px-6">

        {/* HEADER COM IMAGEM */}
        <div className="flex justify-center mb-12">
          <img
            src="https://oyynwzzdwgqhclzwqovb.supabase.co/storage/v1/object/public/images/abaix-assinado-borrado.png"
            alt="Abaixo-assinado pelos 50 gatos mortos"
            className="max-w-full rounded-xl shadow-md object-cover w-full md:max-w-2xl"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Conteúdo da petição */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <p className="text-primary font-medium tracking-wider uppercase text-sm text-center lg:text-left">
                Abaixo-assinado
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight text-center lg:text-left">
                ABAIXO-ASSINADO POR JUSTIÇA AOS 50 GATOS MORTOS PELA ESTRUTURAL!
              </h2>
            </div>
            <div className="space-y-4 prose prose-slate max-w-none">
              <p>
                Nós, cidadãos, protetores de animais e defensores da vida, manifestamos nossa profunda indignação diante das graves denúncias envolvendo a morte de aproximadamente 50 gatos nas dependências da empresa Estrutural, em Fortaleza.
              </p>
              <p>
                Segundo relatos que vieram a público, os animais teriam sido submetidos a extrema crueldade, sofrendo maus-tratos incompatíveis com qualquer valor de humanidade, respeito e civilidade. A repercussão do caso provocou revolta em toda a sociedade, mobilizando protetores independentes, organizações da causa animal e cidadãos que não aceitam a violência contra seres indefesos.
              </p>
              <p>
                Os gatos não tinham voz para se defender. Dependiam da compaixão humana para sobreviver. Em vez disso, a denúncia aponta para um cenário de sofrimento que jamais pode ser ignorado ou tratado com indiferença.
              </p>
              <p>
                <strong>Diante da gravidade dos fatos, exigimos:</strong>
              </p>
              <ul>
                <li>Investigação rigorosa, transparente e célere por parte das autoridades competentes;</li>
                <li>Preservação e análise de todas as provas disponíveis;</li>
                <li>Identificação e responsabilização de todos os envolvidos, sejam pessoas físicas ou jurídicas;</li>
                <li>Aplicação das penalidades previstas na legislação brasileira para crimes de maus-tratos contra animais;</li>
                <li>Acompanhamento público do andamento das investigações, garantindo transparência para toda a sociedade.</li>
              </ul>
              <p>
                Este não é apenas um pedido por justiça para os gatos da Estrutural. É um posicionamento firme contra a crueldade animal e contra a impunidade. Quando a violência contra os mais vulneráveis é tolerada, toda a sociedade perde.
              </p>
              <p>
                Assinamos este documento para afirmar que a vida animal importa, que a crueldade não pode ser normalizada e que os responsáveis devem responder por seus atos.
              </p>
              <blockquote>
                JUSTIÇA PELOS 50 GATOS.
                <br />
                A luta continua até que a verdade seja esclarecida e os responsáveis sejam punidos.
              </blockquote>
            </div>
          </motion.div>
          {/* Formulário da petição */}
          <motion.div
            className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-8 border border-slate-200 dark:border-slate-700"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="font-medium dark:text-slate-100" htmlFor="nome">
                    Nome e sobrenome <span className="text-red-600">*</span>
                  </label>
                </div>
                <input
                  required
                  type="text"
                  name="nome"
                  id="nome"
                  className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  disabled={saving}
                />
              </div>
              {/* Campo de email adicionado */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="font-medium dark:text-slate-100" htmlFor="email">
                    E-mail <span className="text-red-600">*</span>
                  </label>
                </div>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Seu melhor e-mail"
                  autoComplete="off"
                  disabled={saving}
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="font-medium dark:text-slate-100" htmlFor="cpf">
                    CPF <span className="text-red-600">*</span>
                  </label>
                </div>
                <input
                  required
                  type="text"
                  name="cpf"
                  id="cpf"
                  className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                  value={form.cpf}
                  onChange={handleChange}
                  placeholder="Ex: 000.000.000-00"
                  inputMode="numeric"
                  maxLength={14}
                  pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                  autoComplete="off"
                  disabled={saving}
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="font-medium dark:text-slate-100" htmlFor="telefone">
                    Telefone <span className="text-red-600">*</span>
                  </label>
                </div>
                <input
                  required
                  type="text"
                  name="telefone"
                  id="telefone"
                  className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                  value={form.telefone}
                  onChange={handleChange}
                  placeholder="Ex: (85) 9 9999-9999"
                  inputMode="tel"
                  maxLength={17}
                  pattern="\(\d{2}\) \d \d{4}-\d{4}"
                  autoComplete="off"
                  disabled={saving}
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="font-medium dark:text-slate-100" htmlFor="endereco">
                    Endereço{/* Não é obrigatório */}
                  </label>
                </div>
                <input
                  type="text"
                  name="endereco"
                  id="endereco"
                  className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                  value={form.endereco}
                  onChange={handleChange}
                  placeholder="Rua, nº e complemento"
                  disabled={saving}
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="font-medium dark:text-slate-100" htmlFor="bairro">
                    Bairro{/* Não é obrigatório */}
                  </label>
                </div>
                <input
                  type="text"
                  name="bairro"
                  id="bairro"
                  className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                  value={form.bairro}
                  onChange={handleChange}
                  placeholder="Bairro"
                  disabled={saving}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <label className="font-medium dark:text-slate-100" htmlFor="cidade">
                      Cidade <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <input
                    required
                    type="text"
                    name="cidade"
                    id="cidade"
                    className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    value={form.cidade}
                    onChange={handleChange}
                    placeholder="Cidade"
                    disabled={saving}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <label className="font-medium dark:text-slate-100" htmlFor="estado">
                      Estado <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <input
                    required
                    type="text"
                    name="estado"
                    id="estado"
                    className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    value={form.estado}
                    onChange={handleChange}
                    placeholder="Estado"
                    maxLength={2}
                    disabled={saving}
                  />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <input
                  required
                  type="checkbox"
                  name="assino"
                  id="assino"
                  className="mr-2 dark:bg-slate-800 dark:border-slate-700"
                  checked={form.assino}
                  onChange={handleChange}
                  disabled={saving}
                />
                <label htmlFor="assino" className="select-none dark:text-slate-100">
                  Assino embaixo <span className="text-red-600">*</span>
                </label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  required
                  type="checkbox"
                  name="lgpd"
                  id="lgpd"
                  className="mr-2 dark:bg-slate-800 dark:border-slate-700"
                  checked={form.lgpd}
                  onChange={handleChange}
                  disabled={saving}
                />
                <label htmlFor="lgpd" className="select-none dark:text-slate-100">
                  Concordo com o uso dos meus dados para contato, conforme a LGPD. <span className="text-red-600">*</span>
                </label>
              </div>
              <div className="text-xs text-gray-500 dark:text-slate-300 mt-1">
                <span className="text-red-600">*</span> Campos obrigatórios
              </div>
              {/* Aviso de campos obrigatórios faltando */}
              {
                triedSubmit && !allRequiredFilled() && (
                  <div className="bg-red-100 dark:bg-red-900 dark:text-red-200 text-red-700 rounded py-2 px-3 text-sm mt-1 ring-1 ring-red-200 dark:ring-red-800">
                    Preencha todos os campos obrigatórios: {getMissingFields().join(", ")}
                  </div>
                )
              }
              <button
                type="submit"
                className="w-full py-2 px-3 mt-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={saving || !allRequiredFilled()}
              >
                {saving && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {saving ? "Enviando..." : "Assinar"}
              </button>
              {feedback && (
                <div
                  className={
                    `mt-3 text-center ` +
                    (feedbackType === "success"
                      ? "text-green-700 dark:text-green-400"
                      : feedbackType === "error"
                        ? "text-red-700 dark:text-red-400"
                        : "")
                  }
                >
                  {feedback}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}