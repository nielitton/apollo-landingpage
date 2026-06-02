"use client"

import { motion } from "framer-motion";
import { useState } from "react";

const WHATSAPP_NUMBER = "5585986109152";
const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbyvW3l3mcVJIDtDSJkuMlm5FbDXnrzDZOyw0HLjgWwwbdSw5SBrU5hTUOveWnEKHs_ywg/exec";

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

async function sendToSheetAdesivo(data: any) {
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
                lgpd: data.lgpd ? "Sim" : "Não",
                origem: "adesivos-pagina"
            })
        });
        return true;
    } catch (err) {
        return false;
    }
}

export default function AdesivosPage() {
    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
        endereco: "",
        cidade: "",
        estado: "",
        bairro: "",
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

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    function isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function allRequiredFilled() {
        return (
            form.nome.trim() &&
            isValidEmail(form.email) &&
            form.telefone.replace(/\D/g, "").length === 11 &&
            form.endereco.trim() &&
            form.bairro.trim() &&
            form.cidade.trim() &&
            form.estado.trim() &&
            form.lgpd
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

        const success = await sendToSheetAdesivo({
            ...form
        });

        setSubmitting(false);

        if (success) {
            const mensagem = `Olá! Quero pedir meu adesivo do Apollo!
Nome: ${form.nome}
Cidade/Estado: ${form.cidade}/${form.estado}
Bairro: ${form.bairro}
Endereço: ${form.endereco}
Telefone: ${form.telefone}
E-mail: ${form.email}`;

            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                mensagem
            )}`;
            // Redirecionar usando window.location.href para abrir o WhatsApp na própria aba/página (funciona melhor em dispositivos móveis)
            window.location.href = url;
        } else {
            alert('Ocorreu um erro ao registrar sua solicitação no sistema. Por favor, tente novamente em alguns instantes.');
        }
    }

    return (
        <section
            id="adesivos"
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
                                Adesivo do Apollo
                            </p>
                            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight text-center lg:text-left">
                                PEÇA SEU ADESIVO GRATUITO DO APOLLO!
                            </h2>
                        </div>
                        <div className="space-y-3 prose prose-slate max-w-none">
                            <p>
                                Os adesivos do Apollo têm como objetivo promover a conscientização sobre a importância do cuidado e respeito aos pets. Ajude a espalhar essa ideia no seu bairro ou ambiente!
                            </p>
                            <p>
                                Os adesivos servem para lembrar e reforçar o carinho e atenção aos animais. Preencha o formulário ao lado para pedir seu adesivo do Apollo gratuito. Entraremos em contato para entrega assim que possível!
                            </p>
                            <ul>
                                <li>Os adesivos do Apollo são gratuitos e destinados à população em geral, especialmente a famílias com animais e protetores;</li>
                                <li>Preencha todos os seus dados corretamente para facilitar a entrega;</li>
                            </ul>
                            <blockquote>
                                Espalhe a conscientização! Os adesivos reforçam o cuidado e respeito aos animais.
                                <br />
                                Solicite já seu adesivo do Apollo e inspire sua vizinhança!
                            </blockquote>
                        </div>
                    </motion.div>
                    {/* Formulário para solicitar adesivo */}
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
                                    : "Pedir meu adesivo do Apollo"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
