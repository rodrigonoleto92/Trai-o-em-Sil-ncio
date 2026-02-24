/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ShieldAlert, Lock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Question {
  id: number;
  text: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Qual o seu gênero?",
    options: ["Homem", "Mulher"]
  },
  {
    id: 2,
    text: "Há quanto tempo você está em seu relacionamento atual?",
    options: ["Menos de 1 ano", "1 a 3 anos", "3 a 5 anos", "Mais de 5 anos"]
  },
  {
    id: 3,
    text: "Você notou mudanças recentes no comportamento do seu parceiro(a)?",
    options: ["Sim, muitas mudanças", "Algumas mudanças sutis", "Não, mas sinto algo estranho no ar"]
  },
  {
    id: 4,
    text: "O seu parceiro(a) tem escondido o celular ou mudado as senhas recentemente?",
    options: ["Sim, o tempo todo", "Às vezes sinto que esconde", "Não, temos transparência total"]
  },
  {
    id: 5,
    text: "Com que frequência vocês têm momentos de intimidade ultimamente?",
    options: ["Frequentemente", "Raramente", "Quase nunca", "Parou completamente"]
  },
  {
    id: 6,
    text: "Você já confrontou seu parceiro(a) sobre suas suspeitas?",
    options: ["Sim, e ele(a) negou", "Não, tenho medo da reação", "Estou esperando ter provas concretas"]
  },
  {
    id: 7,
    text: "Qual o seu maior medo ao descobrir a verdade?",
    options: ["O fim definitivo do relacionamento", "A decepção e quebra de confiança", "O impacto na família e filhos"]
  }
];

// Static Hero Image URL - Using a high-impact photo representing distrust and betrayal
const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1280&h=720&auto=format&fit=crop&bg=black";

export default function App() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'calculating' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleStart = () => setStep('quiz');

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentQuestionIndex].id]: answer }));

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep('calculating');
    }
  };

  useEffect(() => {
    if (step === 'calculating') {
      const timer = setTimeout(() => setStep('result'), 3500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-900/10 blur-[120px] rounded-full" />
      </div>

      <main className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <ShieldAlert size={14} />
                Acesso Restrito
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-tight">
                TRAIÇÃO EM <br />
                <span className="italic text-red-600">SILÊNCIO</span>
              </h1>

              {/* Hero Image Section - Now Static */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden glass-card border-red-500/20 my-6 shadow-2xl shadow-red-950/20">
                <img
                  src={HERO_IMAGE_URL}
                  alt="Traição em Silêncio"
                  className="w-full h-full object-cover grayscale brightness-50 contrast-125"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm bg-black/20">
                    <Lock className="text-red-500/80" size={24} />
                  </div>
                </div>
              </div>
              
              <p className="text-zinc-400 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
                Descubra a verdade oculta por trás do comportamento do seu parceiro através de uma análise comportamental avançada.
              </p>

              <div className="pt-4">
                <button
                  onClick={handleStart}
                  className="group relative inline-flex items-center gap-3 bg-zinc-100 text-zinc-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all hover:scale-105 active:scale-95"
                >
                  Começar Análise
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 pt-8 opacity-50">
                <div className="flex flex-col items-center gap-1">
                  <Lock size={18} />
                  <span className="text-[10px] uppercase tracking-widest">100% Seguro</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldAlert size={18} />
                  <span className="text-[10px] uppercase tracking-widest">Anônimo</span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Questão {currentQuestionIndex + 1} de {QUESTIONS.length}
                  </span>
                  <span className="text-xs font-mono text-red-500">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-red-600"
                    initial={{ width: `${((currentQuestionIndex) / QUESTIONS.length) * 100}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-serif font-medium leading-snug">
                  {currentQuestion.text}
                </h2>

                <div className="grid gap-3">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group flex justify-between items-center"
                    >
                      <span className="text-zinc-200 group-hover:text-white font-medium">{option}</span>
                      <ChevronRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-red-500" size={20} />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'calculating' && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-8"
            >
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-zinc-800"
                  />
                  <motion.circle
                    cx="48"
                    cy="48"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray="283"
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    className="text-red-600"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldAlert className="text-red-500 animate-pulse" size={32} />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold tracking-tight">Processando Dados...</h2>
                <div className="space-y-2 max-w-xs mx-auto">
                  <LoadingStep text="Cruzando padrões de micro-comportamento" delay={0.5} />
                  <LoadingStep text="Identificando inconsistências na rotina" delay={1.5} />
                  <LoadingStep text="Finalizando diagnóstico de fidelidade" delay={2.5} />
                </div>
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 md:p-12 text-center space-y-8 border-red-500/30"
            >
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="text-red-500" size={32} />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-serif font-bold leading-tight">Sinais de Alerta <br/><span className="text-red-500">Detectados</span></h2>
                <p className="text-zinc-400 leading-relaxed">
                  Sua análise revelou padrões comportamentais que coincidem com indicadores críticos de infidelidade. O que você suspeitava agora tem fundamentos técnicos.
                </p>
              </div>

              <div className="space-y-4 text-left bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-red-500 mb-4 flex items-center gap-2">
                  <Lock size={14} /> O que você vai aprender no Guia:
                </h3>
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span><strong>A Linguagem Corporal da Mentira:</strong> Gestos involuntários que entregam a traição.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span><strong>Rastros Digitais:</strong> Como eles escondem conversas mesmo sem usar senhas óbvias.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span><strong>O Confronto Final:</strong> Como agir para obter a verdade sem ser manipulado(a).</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-200 italic">
                "Você merece a verdade, por mais dolorosa que ela seja."
              </div>

              <div className="flex flex-col items-center gap-1 py-2">
                <span className="text-zinc-500 text-sm line-through">De R$ 47,00</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-zinc-400 text-sm font-medium">Por apenas</span>
                  <span className="text-4xl font-bold text-white">R$ 17,00</span>
                </div>
                <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest animate-pulse">Oferta por tempo limitado</span>
              </div>

              <button
                onClick={() => window.location.href = 'https://checkout.exemplo.com'} // Placeholder for user's checkout
                className="w-full bg-red-600 hover:bg-red-500 text-white py-5 rounded-xl font-bold text-xl shadow-lg shadow-red-900/40 transition-all hover:scale-[1.02] active:scale-95 flex flex-col items-center justify-center gap-1"
              >
                <span className="flex items-center gap-2">
                  Revelar a Verdade Agora
                  <ArrowRight size={20} />
                </span>
                <span className="text-[10px] opacity-70 font-normal uppercase tracking-widest">Acesso Vitalício ao Ebook</span>
              </button>

              <div className="flex items-center justify-center gap-4 opacity-40 grayscale">
                <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-tighter">
                  <ShieldAlert size={10} /> Sigilo Total
                </div>
                <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-tighter">
                  <Lock size={10} /> Compra Segura
                </div>
                <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-tighter">
                  <CheckCircle2 size={10} /> Entrega Imediata
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-auto pt-12 pb-6 text-zinc-600 text-[10px] uppercase tracking-[0.2em] text-center">
        &copy; {new Date().getFullYear()} Traição em Silêncio &bull; Privacidade Garantida
      </footer>
    </div>
  );
}

function LoadingStep({ text, delay }: { text: string; delay: number }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="flex items-center gap-3 text-left text-sm">
      <div className={cn(
        "w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
        done ? "bg-green-500/20 border-green-500" : "border-zinc-700"
      )}>
        {done && <CheckCircle2 size={10} className="text-green-500" />}
      </div>
      <span className={cn("transition-opacity", done ? "opacity-100 text-zinc-300" : "opacity-40 text-zinc-500")}>
        {text}
      </span>
    </div>
  );
}
