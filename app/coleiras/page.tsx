"use client"

import { motion } from "framer-motion";
import { useState } from "react";

// Telefone do WhatsApp para onde será enviado o pedido
const WHATSAPP_NUMBER = "5585986109152";

// URL público do Google Sheets Script
const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbyvW3l3mcVJIDtDSJkuMlm5FbDXnrzDZOyw0HLjgWwwbdSw5SBrU5hTUOveWnEKHs_ywg/exec";

// Função para aplicar máscara de telefone
function maskTelefone(value: string) {
    let numbers = value.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 7)
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11)
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(
            3,
            7
        )}-${numbers.slice(7)}`;
    return value;
}

// ---- MODO IGUAL AO ABAIXO-ASSINADO (PETITION) PARA O ENVIO DO FORM ---- //
async function sendToSheetColeira(data: any) {
    try {
        await fetch(SHEETS_ENDPOINT, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: data.nome ?? "",
                email: data.email ?? "",
                celular: data.telefone ?? "",
                endereco: data.endereco ?? "",
                bairro: data.bairro ?? "",
                cidade: data.cidade ?? "",
                estado: data.estado ?? "",
                quantidadeColeiras: data.quantidadeColeiras ?? "",
                lgpd: data.lgpd ? "Sim" : "Não",
                origem: "coleiras-pagina"
            })
        });
        return true;
    } catch (err) {
        return false;
    }
}

export default function ColeirasPage() {
    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
        endereco: "",
        cidade: "",
        estado: "",
        bairro: "",
        quantidadeColeiras: "",
        lgpd: false,
    });

    const [triedSubmit, setTriedSubmit] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value, type, checked } = e.target as HTMLInputElement & {
            checked?: boolean;
        };

        if (name === "telefone") {
            setForm((prev) => ({
                ...prev,
                telefone: maskTelefone(value),
            }));
            return;
        }

        if (name === "quantidadeColeiras") {
            let numericValue = value.replace(/\D/g, "");
            let intValue = parseInt(numericValue, 10);
            if (numericValue === "") {
                setForm((prev) => ({
                    ...prev,
                    quantidadeColeiras: "",
                }));
            } else if (intValue > 30) {
                setForm((prev) => ({
                    ...prev,
                    quantidadeColeiras: "30",
                }));
            } else if (intValue < 1) {
                setForm((prev) => ({
                    ...prev,
                    quantidadeColeiras: "1",
                }));
            } else {
                setForm((prev) => ({
                    ...prev,
                    quantidadeColeiras: String(intValue),
                }));
            }
            return;
        }

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    function isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function allRequiredFilled() {
        const q = Number(form.quantidadeColeiras);
        return (
            form.nome.trim() &&
            isValidEmail(form.email) &&
            form.telefone.replace(/\D/g, "").length === 11 &&
            form.endereco.trim() &&
            form.bairro.trim() &&
            form.cidade.trim() &&
            form.estado.trim() &&
            form.quantidadeColeiras.trim() &&
            form.lgpd &&
            !isNaN(q) && q >= 1 && q <= 30
        );
    }

    function getMissingFields() {
        const missing: string[] = [];
        if (!form.nome.trim()) missing.push("Nome e sobrenome");
        if (!isValidEmail(form.email)) missing.push("Email");
        if (form.telefone.replace(/\D/g, "").length !== 11)
            missing.push("Telefone");
        if (!form.endereco.trim()) missing.push("Endereço");
        if (!form.bairro.trim()) missing.push("Bairro");
        if (!form.cidade.trim()) missing.push("Cidade");
        if (!form.estado.trim()) missing.push("Estado");
        if (!form.quantidadeColeiras.trim())
            missing.push("Quantidade de coleiras");
        else {
            const q = Number(form.quantidadeColeiras);
            if (isNaN(q) || q < 1 || q > 30)
                missing.push("Quantidade de coleiras (entre 1 e 30)");
        }
        if (!form.lgpd) missing.push("Concordância LGPD");
        return missing;
    }

    async function handleWhatsAppAndSheet(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();
        setTriedSubmit(true);

        if (!allRequiredFilled()) return;

        setSubmitting(true);

        // ENVIA OS DADOS PRA TAB DO SHEETS E AGUARDA CONFIRMAÇÃO ANTES DE REDIRECIONAR
        const success = await sendToSheetColeira({
            ...form
        });

        setSubmitting(false);

        if (success) {
            // Gera mensagem e redireciona para WhatsApp SOMENTE após enviar ao Sheets
            const mensagem = `Olá! Quero solicitar coleiras luminosas gratuitas.
Nome: ${form.nome}
Cidade/Estado: ${form.cidade}/${form.estado}
Bairro: ${form.bairro}
Endereço: ${form.endereco}
Telefone: ${form.telefone}
E-mail: ${form.email}
Quantidade desejada: ${form.quantidadeColeiras}`;

            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                mensagem
            )}`;
            window.open(url, "_blank");
        } else {
            // (Opcional) feedback de erro
            alert('Ocorreu um erro ao registrar sua solicitação no sistema. Por favor, tente novamente em alguns instantes.');
        }
    }

    return (
        <section
            id="coleiras"
            className="py-24 bg-card/50 border-t border-border"
        >
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Conteúdo informativo */}
                    <motion.div
                        className="space-y-7"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="space-y-3">
                            <p className="text-primary font-medium tracking-wider uppercase text-sm text-center lg:text-left">
                                Coleiras luminosas de identificação
                            </p>
                            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight text-center lg:text-left">
                                PEÇA SUA COLEIRA LUMINOSA GRATUITA PARA IDENTIFICAÇÃO DE ANIMAIS!
                            </h2>
                        </div>
                        <div className="space-y-3 prose prose-slate max-w-none">
                            <p>
                                Animais identificados têm muito mais chances de retornar para casa em caso de fuga ou desaparecimento.
                                Agora, distribuímos <b>coleiras luminosas</b> para a comunidade, colaborando ainda mais para a proteção e o cuidado de cães e gatos, principalmente no período noturno.
                            </p>
                            <p>
                                As coleiras luminosas ajudam a evitar atropelamentos e facilitam a visualização dos animais à noite ou em locais com pouca iluminação.
                                <br />
                                Preencha o formulário ao lado para solicitar sua coleira luminosa gratuita. Entraremos em contato para entrega assim que possível!
                            </p>
                            <ul>
                                <li>As coleiras luminosas são gratuitas;</li>
                                <li>Preencha todos os seus dados corretamente para facilitar a entrega;</li>
                                <li>
                                    A quantidade de coleiras pode ser limitada, conforme disponibilidade e análise dos dados fornecidos.
                                </li>
                            </ul>
                            <blockquote>
                                Cuidado, proteção, identificação <b>e visibilidade</b> salvam vidas!
                                <br />
                                Solicite já sua coleira luminosa e ajude a evitar acidentes.
                            </blockquote>
                        </div>
                    </motion.div>
                    {/* Formulário para solicitar coleiras luminosas */}
                    <motion.div
                        className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-5 border border-slate-200 dark:border-slate-700"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <form
                            className="space-y-3"
                            onSubmit={handleWhatsAppAndSheet}
                            autoComplete="off"
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <label
                                        className="font-medium dark:text-slate-100"
                                        htmlFor="nome"
                                    >
                                        Nome e sobrenome <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                <input
                                    required
                                    type="text"
                                    name="nome"
                                    id="nome"
                                    className="w-full px-3 py-1.5 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                                    value={form.nome}
                                    onChange={handleChange}
                                    placeholder="Seu nome completo"
                                    disabled={submitting}
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <label
                                        className="font-medium dark:text-slate-100"
                                        htmlFor="email"
                                    >
                                        Email <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full px-3 py-1.5 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Seu melhor email"
                                    inputMode="email"
                                    autoComplete="off"
                                    disabled={submitting}
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <label
                                        className="font-medium dark:text-slate-100"
                                        htmlFor="telefone"
                                    >
                                        Telefone <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                <input
                                    required
                                    type="text"
                                    name="telefone"
                                    id="telefone"
                                    className="w-full px-3 py-1.5 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                                    value={form.telefone}
                                    onChange={handleChange}
                                    placeholder="Ex: (85) 9 9999-9999"
                                    inputMode="tel"
                                    maxLength={17}
                                    pattern="\(\d{2}\) \d \d{4}-\d{4}"
                                    autoComplete="off"
                                    disabled={submitting}
                                />
                            </div>
                            {/* CPF REMOVIDO */}
                            <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <label
                                        className="font-medium dark:text-slate-100"
                                        htmlFor="endereco"
                                    >
                                        Endereço <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                <input
                                    required
                                    type="text"
                                    name="endereco"
                                    id="endereco"
                                    className="w-full px-3 py-1.5 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                                    value={form.endereco}
                                    onChange={handleChange}
                                    placeholder="Rua, nº e complemento"
                                    disabled={submitting}
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <label
                                        className="font-medium dark:text-slate-100"
                                        htmlFor="bairro"
                                    >
                                        Bairro <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                <input
                                    required
                                    type="text"
                                    name="bairro"
                                    id="bairro"
                                    className="w-full px-3 py-1.5 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                                    value={form.bairro}
                                    onChange={handleChange}
                                    placeholder="Bairro"
                                    disabled={submitting}
                                />
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <label
                                            className="font-medium dark:text-slate-100"
                                            htmlFor="cidade"
                                        >
                                            Cidade <span className="text-red-600">*</span>
                                        </label>
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        name="cidade"
                                        id="cidade"
                                        className="w-full px-3 py-1.5 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                                        value={form.cidade}
                                        onChange={handleChange}
                                        placeholder="Cidade"
                                        disabled={submitting}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <label
                                            className="font-medium dark:text-slate-100"
                                            htmlFor="estado"
                                        >
                                            Estado <span className="text-red-600">*</span>
                                        </label>
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        name="estado"
                                        id="estado"
                                        className="w-full px-3 py-1.5 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                                        value={form.estado}
                                        onChange={handleChange}
                                        placeholder="Estado"
                                        maxLength={2}
                                        disabled={submitting}
                                    />
                                </div>
                            </div>
                            {/* Quantidade de coleiras (campo aberto) */}
                            <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <label
                                        className="font-medium dark:text-slate-100"
                                        htmlFor="quantidadeColeiras"
                                    >
                                        Quantidade de coleiras <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                <input
                                    required
                                    type="number"
                                    name="quantidadeColeiras"
                                    id="quantidadeColeiras"
                                    className="w-full px-3 py-1.5 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                                    value={form.quantidadeColeiras}
                                    onChange={handleChange}
                                    placeholder="Digite o número de coleiras"
                                    min={1}
                                    max={30}
                                    step={1}
                                    disabled={submitting}
                                />
                                <div className="text-xs text-gray-500 dark:text-slate-300 mt-0.5">
                                    <span className="text-red-600">*</span> O máximo permitido são 30 coleiras por pedido.
                                </div>
                            </div>
                            <div className="flex items-center mt-1.5">
                                <input
                                    required
                                    type="checkbox"
                                    name="lgpd"
                                    id="lgpd"
                                    className="mr-2 dark:bg-slate-800 dark:border-slate-700"
                                    checked={form.lgpd}
                                    onChange={handleChange}
                                    disabled={submitting}
                                />
                                <label htmlFor="lgpd" className="select-none dark:text-slate-100">
                                    Concordo com o uso dos meus dados para contato, conforme a LGPD.{" "}
                                    <span className="text-red-600">*</span>
                                </label>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-slate-300 mt-0.5">
                                <span className="text-red-600">*</span> Todos os campos são obrigatórios
                            </div>
                            {triedSubmit && !allRequiredFilled() && (
                                <div className="bg-red-100 dark:bg-red-900 dark:text-red-200 text-red-700 rounded py-1.5 px-3 text-sm mt-0.5 ring-1 ring-red-200 dark:ring-red-800">
                                    Preencha todos os campos obrigatórios:{" "}
                                    {getMissingFields().join(", ")}
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full py-2 px-3 mt-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                disabled={!allRequiredFilled() || submitting}
                            >
                                {submitting
                                    ? "Enviando..."
                                    : "Pedir Coleira Luminosa via WhatsApp"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
