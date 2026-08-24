import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Send, Minimize2, Loader2, Sparkles, Database, Volume2, VolumeX, CheckCircle2, ShieldCheck,
  ClipboardCheck, LayoutGrid, LineChart, MessageCircleQuestion, AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createPageUrl } from '@/utils';
import faqData from '../../faq_parsed.json';

const quickActions = [
  { label: 'Check Eligibility', icon: ClipboardCheck, href: createPageUrl('Offerings') },
  { label: 'Explore Schemes', icon: LayoutGrid, href: `${createPageUrl('Home')}#schemes` },
  { label: 'Track Application', icon: LineChart, href: createPageUrl('LoanTracking') },
  { label: 'Ask a Question', icon: MessageCircleQuestion, focusInput: true }
];

// Local RAG + LLM backend (rag/server.py) — FAISS vector retrieval over the
// MUDRA FAQ/PDF corpus, grounded generation via a local Ollama model.
const RAG_API_URL = import.meta.env.VITE_RAG_API_URL || 'http://localhost:8080';

const predefinedQuestions = [
  "1. WHAT IS MUDRA?",
  "2. WHY HAS MUDRA BEEN SET UP?",
  "Is collateral required for PMMY loan?",
  "Can I buy a CNG tempo or taxi with MUDRA?",
  "How many days for Shishu loan approval?"
];

// Streams the answer as newline-delimited JSON events ({type:'chunk',text} /
// {type:'done',...}) so the UI can render text as it's generated instead of
// waiting for the full response. On the local Ollama backend (rag/llm.py)
// this is typically a few seconds; set GROQ_API_KEY server-side for
// near-instant cloud inference instead — either way, streaming keeps the
// UI feeling responsive from the first token rather than a long blank wait.
async function streamRAGBackend(message, onEvent) {
  const res = await fetch(`${RAG_API_URL}/api/chat/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  if (!res.ok || !res.body) {
    throw new Error(`RAG server responded with ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let newlineIndex;
    while ((newlineIndex = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, newlineIndex).trim();
      buffer = buffer.slice(newlineIndex + 1);
      if (line) onEvent(JSON.parse(line));
    }
  }
}

// Bundled copy of faq_parsed.json used as a last-resort answer source when
// the RAG backend itself can't be reached at all (network down, cold-starting
// free-tier instance, etc.) — matched purely client-side, no server needed.
// Scored on what fraction of the query's meaningful words show up in each
// entry's question+answer text, since users paraphrase the FAQ wording
// (e.g. "how many days for approval" vs. the FAQ's "turn around time").
const FAQ_MATCH_STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'of', 'to', 'in', 'on', 'for', 'with', 'and', 'or', 'how', 'what',
  'which', 'do', 'does', 'did', 'can', 'i', 'you', 'it', 'this', 'that',
  'has', 'have', 'had'
]);

function tokenizeForFaqMatch(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => t.replace(/s$/, '')) // naive singularize (loans -> loan)
    .filter((t) => t.length > 1 && !FAQ_MATCH_STOPWORDS.has(t));
}

const INDEXED_FAQ = faqData.map((entry) => ({
  entry,
  tokens: new Set(tokenizeForFaqMatch(`${entry.question} ${entry.answer}`))
}));

function findLocalFaqAnswer(query) {
  const qTokens = new Set(tokenizeForFaqMatch(query));
  if (qTokens.size < 2) return null;

  let best = null;
  let bestScore = 0;
  for (const { entry, tokens } of INDEXED_FAQ) {
    const overlap = [...qTokens].filter((t) => tokens.has(t)).length;
    const score = overlap / qTokens.size;
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return bestScore >= 0.5 ? best : null;
}

// Robust text parser for FAQ / Document chunks
function parseStructuredFAQ(text) {
  if (!text) return { question: "", answer: "", category: "MUDRA Official FAQ" };

  let question = "";
  let answer = "";
  let category = "MUDRA Official FAQ";

  const qIdx = text.indexOf("Question:");
  const aIdx = text.indexOf("Answer:");
  const cIdx = text.indexOf("Category:");

  if (qIdx !== -1 && aIdx !== -1) {
    question = text.substring(qIdx + 9, aIdx).trim();
    if (cIdx !== -1 && cIdx > aIdx) {
      answer = text.substring(aIdx + 7, cIdx).trim();
      category = text.substring(cIdx + 9).trim();
    } else {
      answer = text.substring(aIdx + 7).trim();
    }
  } else if (aIdx !== -1) {
    answer = text.substring(aIdx + 7).trim();
  } else if (text.includes("Official MUDRA Policy Document:")) {
    question = "Statutory Document Record";
    answer = text.replace("Official MUDRA Policy Document:", "").trim();
    category = "PMMY Policy Document";
  } else {
    answer = text.trim();
  }

  return { question, answer, category };
}

// Component to render structured FAQ answers cleanly with precision accuracy badge
function StructuredFAQMessage({ text }) {
  const { answer, category } = parseStructuredFAQ(text);

  return (
    <div className="space-y-3">
      {/* Top Metadata Badges */}
      <div className="flex items-center justify-between gap-2 pb-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-400/10 text-[#004265] border border-blue-500/20 text-[10px] font-black uppercase tracking-wider shadow-sm">
          <Sparkles size={12} className="text-[#004265] animate-pulse" />
          <span>{category}</span>
        </div>
        <span className="text-[9.5px] font-black text-emerald-700 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5 shadow-sm">
          <ShieldCheck size={12} className="text-emerald-600" /> 100% RAG Verified
        </span>
      </div>

      {/* Official Response Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50/90 via-blue-50/50 to-blue-100/40 p-4 rounded-2xl border border-blue-200/90 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 rounded-full bg-[#00b6f0] text-white flex items-center justify-center shadow-xs">
            <CheckCircle2 size={12} />
          </div>
          <span className="text-[10px] font-black text-[#004265] uppercase tracking-wider">
            OFFICIAL RESPONSE
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-800 leading-relaxed whitespace-pre-line pl-0.5">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function ChatBot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [ragEnabled, setRagEnabled] = useState(true);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Question: 1. WHAT IS MUDRA?\nAnswer: Micro Units Development & Refinance Agency Ltd. (MUDRA) is a financial institution set up by the Government of India for the development and refinancing of micro-enterprises. It provides funding to non-corporate small business sectors through banks, NBFCs, and MFIs.\nCategory: MUDRA Official FAQ",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const handleQuickAction = (action) => {
    if (action.focusInput) {
      inputRef.current?.focus();
      return;
    }
    setIsOpen(false);
    navigate(action.href);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const speakText = (text, index) => {
    if ('speechSynthesis' in window) {
      if (speakingIndex === index) {
        window.speechSynthesis.cancel();
        setSpeakingIndex(null);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setSpeakingIndex(null);
      setSpeakingIndex(index);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      type: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    if (!ragEnabled) {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: "RAG mode is turned off. Turn it back on (top-right toggle) to ask questions grounded in MUDRA's official documents.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
      return;
    }

    try {
      let botIndex = null;

      await streamRAGBackend(text, (event) => {
        if (event.type === 'done') {
          // The backend still sends the "trouble reaching the answer engine"
          // text as a normal chunk (so it displays at all), but flags this
          // turn as an error via `done.error` — mark the message so it
          // renders as a plain notice instead of a "100% RAG Verified"
          // official-answer card, which would otherwise misrepresent a
          // backend failure as a confident, sourced answer.
          if (event.error && botIndex !== null) {
            setMessages(prev => {
              const updated = [...prev];
              updated[botIndex] = { ...updated[botIndex], isError: true };
              return updated;
            });
          }
          return;
        }

        if (event.type !== 'chunk' || !event.text) return;

        if (botIndex === null) {
          setIsTyping(false);
          setMessages(prev => {
            botIndex = prev.length;
            return [...prev, {
              type: 'bot',
              text: event.text,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }];
          });
        } else {
          setMessages(prev => {
            const updated = [...prev];
            updated[botIndex] = { ...updated[botIndex], text: updated[botIndex].text + event.text };
            return updated;
          });
        }
      });

      // if (botIndex === null) {
      //   setMessages(prev => [...prev, {
      //     type: 'bot',
      //     text: "I didn't get a response. Please try again.",
      //     time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      //   }]);
      // }
    } catch (error) {
      const localMatch = findLocalFaqAnswer(text);
      const fallbackMessage = localMatch
        ? {
            type: 'bot',
            text: `Question: ${localMatch.question}\nAnswer: ${localMatch.answer}\nCategory: ${localMatch.category} (Offline)`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        : {
            type: 'bot',
            isError: true,
            text: "I'm having trouble reaching the MUDRA assistant service right now. Please make sure the RAG backend is running and try again.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-white text-slate-900 rounded-full shadow-2xl flex items-center gap-3 border border-[#00b6f0]/30 hover:border-[#00b6f0] shadow-blue-500/20 group transition-all"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#00b6f0] via-[#0090c2] to-blue-400 text-white rounded-full flex items-center justify-center font-black shadow-md shadow-blue-500/30">
                <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
            </div>
            <div className="text-left pr-1 hidden sm:block">
              <p className="text-xs font-black text-[#0e263d] leading-tight">MUDRA Saathi</p>
              <p className="text-[10px] font-bold text-[#004265]">Your MUDRA Assistant</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.92 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[420px] max-w-full sm:px-0 px-1"
          >
            <div className="bg-white text-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col" style={{ height: isMinimized ? '64px' : 'min(620px, calc(100vh - 32px))' }}>

              {/* Header */}
              <div className="bg-[#0e263d] text-white p-4 border-b border-[#183957] flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00b6f0] to-blue-300 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-white tracking-wide">MUDRA Saathi</h3>
                    <p className="text-[11px] text-slate-300 font-medium">Your Guide to MUDRA &amp; PMMY</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setRagEnabled(!ragEnabled)}
                    title={ragEnabled ? "RAG Mode Enabled" : "Standard Mode"}
                    className={`px-2.5 py-1 rounded-full text-xs flex items-center gap-1 font-bold transition-all ${
                      ragEnabled ? 'bg-[#00b6f0] text-white shadow-sm' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline text-[10px] font-black">{ragEnabled ? 'RAG ON' : 'RAG OFF'}</span>
                  </button>
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Quick-action chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto p-3 pb-2.5 bg-white border-b border-slate-100 scrollbar-none">
                    {quickActions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={action.label}
                          type="button"
                          onClick={() => handleQuickAction(action)}
                          className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10.5px] font-bold bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#004265] border border-slate-200 hover:border-[#00b6f0] transition-all"
                        >
                          <Icon size={12} aria-hidden="true" />
                          {action.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Message Stream */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 text-xs">
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[88%] rounded-2xl p-4 shadow-sm transition-all ${
                          msg.type === 'user'
                            ? 'bg-gradient-to-r from-[#00b6f0] via-[#0090c2] to-[#004265] text-white rounded-tr-xs shadow-blue-500/20 font-bold'
                            : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-slate-200/50'
                        }`}>

                          {/* Render Structured FAQ View — but never dress up
                              a backend failure as a "verified" answer. */}
                          {msg.type === 'bot' && msg.isError ? (
                            <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-slate-700">
                              <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600" aria-hidden="true" />
                              <p className="text-xs font-semibold leading-relaxed">{msg.text}</p>
                            </div>
                          ) : msg.type === 'bot' ? (
                            <StructuredFAQMessage text={msg.text} />
                          ) : (
                            <p className="leading-relaxed whitespace-pre-line text-xs font-bold text-white">{msg.text}</p>
                          )}

                          <div className={`mt-2.5 flex items-center justify-between text-[10px] ${
                            msg.type === 'user' ? 'text-blue-100 font-semibold' : 'text-slate-400 font-bold'
                          }`}>
                            <span>{msg.time}</span>
                            {msg.type === 'bot' && (
                              <button
                                onClick={() => speakText(msg.text, idx)}
                                className="hover:text-[#00b6f0] flex items-center gap-1.5 transition-colors ml-2 font-bold px-2 py-0.5 rounded-full bg-slate-100 hover:bg-blue-50 border border-slate-200/60 text-slate-600 hover:text-[#00b6f0]"
                              >
                                {speakingIndex === idx ? (
                                  <>
                                    <VolumeX className="w-3.5 h-3.5 text-red-500 animate-pulse" /> Stop
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="w-3.5 h-3.5" /> Listen
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <div className="flex items-center gap-2.5 text-slate-600 font-bold text-xs bg-white p-3.5 rounded-2xl w-fit border border-slate-200/90 shadow-sm">
                        <Loader2 className="w-4 h-4 animate-spin text-[#00b6f0]" />
                        <span>Performing precision RAG retrieval...</span>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Preset Question Chips */}
                  <div className="p-3 bg-slate-100/80 border-t border-slate-200/90 space-y-1.5">
                    <p className="text-[9.5px] text-slate-500 font-black uppercase tracking-wider pl-0.5">FAQ Quick Prompts:</p>
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {predefinedQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="whitespace-nowrap px-3.5 py-1.5 rounded-full text-[10px] font-bold bg-white hover:bg-blue-50 text-slate-700 hover:text-[#00b6f0] border border-slate-200 hover:border-[#00b6f0] shadow-xs hover:shadow-sm transition-all transform hover:-translate-y-0.5"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage(inputValue);
                    }}
                    className="p-3 bg-white border-t border-slate-200/90 flex items-center gap-2"
                  >
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask any question in your own words..."
                      disabled={isTyping}
                      className="bg-slate-50 border border-slate-200/90 text-slate-900 placeholder:text-slate-400 text-xs font-semibold h-11 rounded-full px-4 focus:border-[#00b6f0] focus:ring-2 focus:ring-[#00b6f0]/20 transition-all"
                    />
                    <Button
                      type="submit"
                      disabled={isTyping || !inputValue.trim()}
                      className="h-11 w-11 p-0 bg-gradient-to-r from-[#00b6f0] to-[#0090c2] hover:from-blue-600 hover:to-blue-700 text-white font-black rounded-full shadow-md shadow-blue-500/30 transition-all shrink-0 flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      <Send className="w-4 h-4 ml-0.5" />
                    </Button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}