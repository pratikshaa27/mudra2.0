import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Minimize2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';

const predefinedQuestions = [
  "What is MUDRA?",
  "How to apply for a loan?",
  "What are the loan categories?",
  "Eligibility criteria?",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hello! I'm MUDRA Assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    try {
      // Use LLM integration with context about MUDRA
      const prompt = `You are an expert MUDRA (Micro Units Development & Refinance Agency Ltd.) advisor, representing a Government of India initiative under the Ministry of Finance.

COMPREHENSIVE MUDRA CONTEXT:

ABOUT MUDRA:
- Established in 2015 to fund micro enterprises and support entrepreneurship
- Provides collateral-free, hassle-free loans to non-corporate, non-farm small/micro enterprises
- Mission: Financial inclusion and economic empowerment of micro-entrepreneurs
- Vision: Create a vibrant MSME sector contributing to GDP and employment

LOAN PRODUCTS & ELIGIBILITY:
- Shishu: Up to ₹50,000 (for starting or stabilizing business)
- Kishore: ₹50,001 to ₹5 lakh (for business expansion)
- Tarun: ₹5 lakh to ₹10 lakh (for established businesses)
- TarunPlus: ₹10 lakh to ₹20 lakh (for mature enterprises)
- Interest rates: Typically 8-12% depending on lender and credit profile
- Repayment tenure: Up to 5-7 years depending on loan category
- No processing fees or hidden charges in most banks
- No collateral or third-party guarantee required

ELIGIBILITY CRITERIA:
- Age: 18 years and above
- Business: Income-generating activities in manufacturing, trading, or services
- New entrepreneurs, women entrepreneurs, SC/ST/OBC/Minority communities encouraged
- Both individual and group enterprises eligible
- Business must not exceed ₹10 crore in annual turnover

APPLICATION PROCESS:
1. Visit www.udyamimitra.in or nearest bank branch/NBFC/MFI
2. Submit Aadhar, PAN, business proof, income documents
3. AI-powered credit assessment (featured in MUDRA 2.0 POC)
4. Loan sanction within 7-15 working days
5. Funds disbursed to bank account directly

LENDING INSTITUTIONS:
- All Public Sector Banks (SBI, PNB, BOB, Canara, Union, etc.)
- Private Banks (ICICI, HDFC, Axis, etc.)
- Regional Rural Banks (RRBs)
- Cooperative Banks
- Non-Banking Financial Companies (NBFCs)
- Microfinance Institutions (MFIs)

KEY FEATURES:
- ₹33+ lakh crore disbursed since inception (2015-2025)
- 45+ crore loan accounts sanctioned
- 70% beneficiaries are women entrepreneurs
- Focus on financial inclusion, skill development, and digital empowerment
- Linked with Skill India for entrepreneur capacity building
- Digital tracking via Loan Passbook (in MUDRA 2.0)

PRIORITY SECTORS:
- Street vendors, artisans, weavers
- Food processing units, beauty parlors, tailoring shops
- Small manufacturing units
- Service sector (repair shops, salons, catering)
- Transport operators (autos, taxis, e-rickshaws)
- Agriculture-allied activities (dairy, poultry, fishery)

SUPPORT & HELPLINES:
- Toll-free helpline: 1800-XXX-XXXX
- Email: contact@mudra.org.in
- Website: www.mudra.org.in and www.udyamimitra.in
- Regional offices across all states

User's Question: "${text}"

INSTRUCTIONS:
- Provide a comprehensive, detailed, and helpful response (4-6 sentences)
- Use specific numbers, facts, and actionable guidance
- Be warm, professional, and encouraging
- If the question relates to loan application, mention the AI credit scoring feature
- If discussing eligibility, be inclusive and encouraging
- Always provide next steps or contact information where relevant
- Use simple language suitable for entrepreneurs from all backgrounds`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        add_context_from_internet: false
      });

      const botMessage = {
        type: 'bot',
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'bot',
        text: "I apologize, but I'm having trouble connecting right now. Please try again or contact us directly at contact@mudra.org.in",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center group hover:shadow-red-500/50 transition-all border-2 border-red-700"
          >
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/282d5f6a9_image.png"
              alt="MUDRA Bot"
              className="w-12 h-12 object-contain"
            />
            
            {/* Pulse animation */}
            <span className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20"></span>
            
            {/* Notification badge */}
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-xs font-bold text-red-800"
            >
              1
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-md"
          >
          {/* Outer decorative layer */}
          <div className="bg-gradient-to-br from-red-900 via-red-800 to-amber-700 rounded-2xl p-1 shadow-2xl" style={{ boxShadow: '0 25px 60px rgba(185,28,28,0.4)' }}>
          {/* Inner layer */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-0.5">
          <div
            className={`bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-300`}
            style={{ maxHeight: isMinimized ? '52px' : '560px', height: isMinimized ? '52px' : '560px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-700 to-red-900 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg p-1">
                    <img 
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/282d5f6a9_image.png"
                      alt="MUDRA"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-white font-bold">MUDRA Assistant</h3>
                  <p className="text-white text-xs">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Minimize2 size={20} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        {message.type === 'bot' && (
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 p-1 border border-gray-200">
                            <img 
                              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/282d5f6a9_image.png"
                              alt="MUDRA"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        <div>
                          <div
                            className={`rounded-2xl px-4 py-2 ${
                              message.type === 'user'
                                ? 'bg-gradient-to-r from-red-700 to-red-800 text-white'
                                : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.text}</p>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 px-2">{message.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-2"
                    >
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1 border border-gray-200">
                        <img 
                          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/282d5f6a9_image.png"
                          alt="MUDRA"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length === 1 && (
                  <div className="px-4 pb-4 space-y-2">
                    <p className="text-xs text-gray-500 font-medium">Quick questions:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {predefinedQuestions.map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickQuestion(question)}
                          className="text-xs bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 text-black font-semibold px-3 py-2 rounded-lg border-2 border-gray-800 transition-all text-left"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="border-t p-4 bg-white">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage(inputValue);
                    }}
                    className="flex gap-2"
                  >
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your question..."
                      disabled={isTyping}
                      className="flex-1 h-12 bg-gray-50 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    />
                    <Button
                      type="submit"
                      disabled={isTyping || !inputValue.trim()}
                      className="h-12 w-12 bg-gray-900 hover:bg-gray-800 flex-shrink-0 text-white"
                    >
                      {isTyping ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <Send size={20} />
                      )}
                    </Button>
                  </form>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Powered by AI • For urgent queries, call 1800-XXX-XXXX
                  </p>
                </div>
              </>
            )}
          </div>
          </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}