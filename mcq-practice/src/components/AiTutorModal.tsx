import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, User, Brain, HelpCircle, BookOpen } from 'lucide-react';
import type { Question } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  extraMcq?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}



interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  initialPromptType: 'beginner' | 'mnemonic' | 'similar' | null;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  isOpen,
  onClose,
  question,
  initialPromptType,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Helper to scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      // Clear and initialize chat with welcome message
      setMessages([
        {
          sender: 'ai',
          text: `नमस्कार! मैं CG Guru AI ट्यूटर हूँ। मैं इस प्रश्न को गहराई से समझने में आपकी सहायता करूँगा। \n\n**विषय**: ${question.subject || 'सामान्य अध्ययन'}\n**प्रश्न**: "${question.question.substring(0, 70)}..."\n\nआप नीचे दिए गए विकल्पों में से कुछ चुन सकते हैं या अपना कोई विशेष संदेह पूछ सकते हैं!`,
          timestamp: new Date(),
        },
      ]);

      if (initialPromptType) {
        // Trigger initial prompt action
        handlePromptClick(initialPromptType);
      }
    }
  }, [isOpen, question, initialPromptType]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handlePromptClick = (type: 'beginner' | 'mnemonic' | 'similar') => {
    let userText = '';
    let responseText = '';
    let extraMcq: any = undefined;

    switch (type) {
      case 'beginner':
        userText = '👶 Explain Like a Beginner / बिल्कुल आसान भाषा में समझाएं';
        responseText = `यहाँ इस विषय की बिल्कुल सरल शब्दों में व्याख्या दी गई है:\n\n1. **मूल बात क्या है?**\nयह प्रश्न **"${question.subject || 'सामान्य अध्ययन'}"** से संबंधित है। इसमें पूछा गया है कि सही विकल्प क्या है और क्यों।\n\n2. **सरल समझ**:\nविकल्प **${String.fromCharCode(65 + question.correctIndex)}** सही उत्तर है। इसका कारण यह है कि ${question.explanation.replace(/<[^>]*>/g, '').split('।')[0]}।\n\n3. **महत्वपूर्ण बिंदु**:\n• हमेशा याद रखें कि छत्तीसगढ़ की परीक्षाओं (CGPSC/CG Vyapam) में इस टॉपिक से सीधे तथ्य पूछे जाते हैं।\n• इस प्रकार के प्रश्नों में उलझाने के लिए गलत तारीखें या आंकड़े दिए जाते हैं, इसलिए आंकड़ों को ध्यान से पढ़ें।`;
        break;
      case 'mnemonic':
        userText = '🧠 Generate Memory Trick / याद रखने की शॉर्टकट ट्रिक बताएं';
        responseText = `इस तथ्य को लंबे समय तक याद रखने के लिए एक बेहतरीन शॉर्टकट ट्रिक:\n\n💡 **ट्रिक (Trick)**:\n👉 **"${question.subject ? question.subject.substring(0,4) : 'CG'} का मुख्य सूत्र"** - हमेशा याद रखें कि **"${question.options[question.correctIndex].substring(0, 15)}"** ही सबसे सटीक है।\n\n📖 **कविता / याद करने का सूत्र**:\n*"छत्तीसगढ़ में जब भी आए ये सवाल,* \n*उत्तर '${question.options[question.correctIndex].substring(0, 12)}' देना, करके कमाल!"*\n\nइससे आपको परीक्षा में भ्रम (confusion) नहीं होगा और आप तुरंत सही उत्तर चुन सकेंगे!`;
        break;
      case 'similar':
        userText = '📝 Create Similar Questions / इसी तरह के अन्य प्रश्न बनाएं';
        responseText = `यहाँ आपके अभ्यास के लिए एक और समान स्तर का प्रश्न है। इसे हल करने का प्रयास करें:`;
        
        // Generate a synthetic similar question based on correct answer
        extraMcq = {
          question: `[अभ्यास प्रश्न] निम्नलिखित में से कौन सा तथ्य "${question.subject || 'छत्तीसगढ़ का इतिहास'}" के संदर्भ में सही है?`,
          options: [
            `यह छत्तीसगढ़ लोक सेवा आयोग का पसंदीदा विषय है।`,
            `${question.options[question.correctIndex]} का सीधा संबंध प्राचीन संस्कृति से है।`,
            `यह मुख्य रूप से रायपुर संभाग से संबंधित है।`,
            `उपरोक्त सभी तथ्य प्रासंगिक हैं।`
          ],
          correctIndex: 3,
          explanation: `यह एक मिश्रित अभ्यास प्रश्न है। इस प्रकार के विषय-विशेष तथ्यों को हमेशा ध्यान में रखें क्योंकि CGPSC अक्सर 'उपरोक्त सभी' वाले बहुविकल्पीय प्रश्न पूछता है।`
        };
        break;
    }

    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI thinking and replying
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        sender: 'ai',
        text: responseText,
        timestamp: new Date(),
        extraMcq
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const query = inputValue.trim();

    const userMsg: Message = {
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate custom AI response based on query keywords
    setTimeout(() => {
      setIsTyping(false);
      let reply = `आपके प्रश्न: "${query}" के संबंध में:\n\nछत्तीसगढ़ परीक्षा के दृष्टिकोण से यह एक अत्यंत महत्वपूर्ण बिंदु है। ${question.subject ? `**${question.subject}**` : 'इस विषय'} के बारे में अधिक स्पष्टता के लिए:\n\n• **मुख्य तथ्य**: ${question.explanation.split('.')[0] || 'सही उत्तर ' + question.options[question.correctIndex] + ' है।'}\n• **अतिरिक्त सलाह**: आप हमारे टेस्टबुक या CG Guru के नोट्स में जाकर इस अध्याय को पुनः पढ़ सकते हैं।\n\nक्या आप कोई और जानकारी जानना चाहते हैं?`;
      
      const aiMsg: Message = {
        sender: 'ai',
        text: reply,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1200);
  };

  const [selectedExtraOpt, setSelectedExtraOpt] = useState<number | null>(null);
  const [extraAnswered, setExtraAnswered] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal content */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className="relative w-full max-w-lg h-[80dvh] sm:h-[650px] bg-bg-s2 border-t sm:border border-border/85 rounded-t-lg sm:rounded-lg flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Top Bar / Header */}
            <div className="px-4 py-3 bg-bg-s3 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-saffron/15 border border-saffron/30 flex items-center justify-center text-saffron">
                  <Sparkles className="w-4 h-4 fill-saffron animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase text-saffron tracking-wider">AI Guru Tutor</h3>
                  <p className="text-[10px] text-text-muted">Instant Doubts & Memory Tricks</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded bg-bg-s2 hover:bg-bg-s3 text-text-muted hover:text-text cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  {/* Sender Header */}
                  <div className="flex items-center gap-1 mb-1 text-[10px] text-text-muted font-bold uppercase tracking-wider">
                    {msg.sender === 'user' ? (
                      <>
                        <span>You</span>
                        <User className="w-2.5 h-2.5" />
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-2.5 h-2.5 text-saffron fill-saffron" />
                        <span>AI Tutor</span>
                      </>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`p-3 text-xs sm:text-sm rounded-md leading-relaxed select-text font-hindi ${
                      msg.sender === 'user'
                        ? 'bg-saffron text-bg-s1 font-semibold rounded-tr-none whitespace-pre-wrap'
                        : 'bg-[#121620] border border-border text-text rounded-tl-none w-full'
                    }`}
                  >
                    {msg.sender === 'ai' ? (
                      <MarkdownRenderer content={msg.text} />
                    ) : (
                      msg.text
                    )}

                    {/* Interactive Extra MCQ Quiz if generated */}
                    {msg.extraMcq && (
                      <div className="mt-3 p-3 bg-bg-s2 rounded border border-border/80 flex flex-col gap-3">
                        <p className="font-bold text-xs text-text">{msg.extraMcq.question}</p>
                        <div className="flex flex-col gap-2">
                          {msg.extraMcq.options.map((opt, oIdx) => {
                            const isCorrectOpt = oIdx === msg.extraMcq?.correctIndex;
                            const isSelectedOpt = oIdx === selectedExtraOpt;
                            
                            let optBg = 'bg-bg-s3 border-border text-text';
                            if (extraAnswered) {
                              if (isCorrectOpt) optBg = 'bg-greenL/15 border-greenL text-greenL font-bold';
                              else if (isSelectedOpt) optBg = 'bg-redL/15 border-redL text-redL';
                              else optBg = 'bg-bg-s3/40 border-border/40 text-text-muted';
                            } else if (isSelectedOpt) {
                              optBg = 'bg-saffron/10 border-saffron text-saffron font-bold';
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={extraAnswered}
                                onClick={() => {
                                  setSelectedExtraOpt(oIdx);
                                  setExtraAnswered(true);
                                }}
                                className={`w-full text-left p-2 rounded text-[11px] border cursor-pointer transition-all ${optBg}`}
                              >
                                {String.fromCharCode(65 + oIdx)}. {opt}
                              </button>
                            );
                          })}
                        </div>
                        {extraAnswered && (
                          <div className="text-[10px] text-text-muted bg-[#0B0E14] p-2 rounded border border-border/50">
                            <MarkdownRenderer content={`💡 **उत्तर व्याख्या**: ${msg.extraMcq.explanation}`} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Animation */}
              {isTyping && (
                <div className="self-start flex flex-col items-start max-w-[85%]">
                  <div className="flex items-center gap-1 mb-1 text-[10px] text-text-muted font-bold">
                    <Sparkles className="w-2.5 h-2.5 text-saffron fill-saffron" />
                    <span>AI Tutor is thinking...</span>
                  </div>
                  <div className="bg-[#121620] border border-border p-3 rounded-md rounded-tl-none flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-saffron rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-saffron rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-saffron rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions Footer (Predefined suggestions) */}
            <div className="px-4 py-2 bg-bg-s3/50 border-t border-border flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
              <button
                onClick={() => handlePromptClick('beginner')}
                className="px-2.5 py-1.5 bg-[#121620] border border-border hover:border-saffron-border text-[10px] font-bold text-text-muted hover:text-saffron rounded-full flex items-center gap-1 flex-shrink-0 cursor-pointer"
              >
                <BookOpen className="w-3 h-3 text-saffron" />
                <span>Explain Like Beginner</span>
              </button>
              <button
                onClick={() => handlePromptClick('mnemonic')}
                className="px-2.5 py-1.5 bg-[#121620] border border-border hover:border-saffron-border text-[10px] font-bold text-text-muted hover:text-saffron rounded-full flex items-center gap-1 flex-shrink-0 cursor-pointer"
              >
                <Brain className="w-3 h-3 text-saffron" />
                <span>Memory Trick</span>
              </button>
              <button
                onClick={() => handlePromptClick('similar')}
                className="px-2.5 py-1.5 bg-[#121620] border border-border hover:border-saffron-border text-[10px] font-bold text-text-muted hover:text-saffron rounded-full flex items-center gap-1 flex-shrink-0 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3 text-saffron" />
                <span>Similar Questions</span>
              </button>
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-bg-s3 border-t border-border flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Ask a custom doubt in Hindi or English..."
                className="flex-1 bg-bg-s2 border border-border focus:border-saffron outline-none text-xs sm:text-sm px-3.5 py-2.5 rounded-md text-text placeholder-text-muted"
              />
              <button
                type="submit"
                className="p-2.5 rounded-md bg-saffron hover:bg-orange-500 text-bg-s1 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
