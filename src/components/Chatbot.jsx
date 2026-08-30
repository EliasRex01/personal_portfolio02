import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Send, X, Sparkles } from 'lucide-react';
import { getBotResponse, QUICK_REPLIES } from '../data/chatbotKnowledge.js';

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'bot',
  text: "Hi! I'm Elias's portfolio assistant 👋 Ask me about skills, projects, or how to get in touch.",
};

/**
 * Chatbot
 * ----------------------------------------------------------------------
 * A fully client-side, rule-based FAQ chatbot — no API key, no backend,
 * no network request. `getBotResponse()` (in ../data/chatbotKnowledge.js)
 * does simple keyword matching against a small knowledge base and returns
 * an instant canned answer, with a short artificial "typing" delay purely
 * for UX polish (so responses don't feel unnervingly instantaneous).
 *
 * To upgrade this to a real AI backend later: replace the body of
 * `handleSend`'s setTimeout block with a fetch() to your own API route,
 * which then calls OpenAI/Claude/etc. server-side (never expose an API
 * key in client-side code).
 */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to the latest message whenever the conversation grows.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  function pushMessage(role, text) {
    setMessages((prev) => [...prev, { id: `${role}-${Date.now()}`, role, text }]);
  }

  function handleSend(rawText) {
    const text = (rawText ?? input).trim();
    if (!text) return;

    pushMessage('user', text);
    setInput('');
    setIsTyping(true);

    // Small artificial delay so the "typing..." indicator has time to read
    // as intentional rather than the UI flickering instantly.
    setTimeout(() => {
      const reply = getBotResponse(text);
      setIsTyping(false);
      pushMessage('bot', reply);
    }, 700 + Math.random() * 400);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSend();
  }

  return (
    <>
      {/* Floating launcher button, bottom-right, always present */}
      <motion.button
        data-hover
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="fixed bottom-7 right-7 z-[1100] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-accent text-white shadow-glow-violet"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-7 z-[1099] flex h-[520px] w-[360px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-surface-2 px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-accent">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold leading-tight">Portfolio Assistant</p>
                <p className="font-mono text-[0.7rem] text-text-faint">Instant · rule-based · no API key</p>
              </div>
            </div>

            {/* Message list */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'rounded-br-sm bg-gradient-accent text-white'
                        : 'rounded-bl-sm bg-surface-2 text-text-dim'
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-surface-2 px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-text-faint"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies — only shown before the visitor starts typing,
                to keep the panel uncluttered once a conversation is underway. */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 px-4 pb-2">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="rounded-full border border-border px-3 py-1.5 font-mono text-[0.7rem] text-text-dim transition-colors hover:border-violet hover:text-text"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input row */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border px-3 py-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects..."
                className="flex-1 rounded-full bg-surface-2 px-4 py-2.5 text-sm text-text outline-none placeholder:text-text-faint"
              />
              <button
                type="submit"
                data-hover
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-accent text-white transition-transform hover:scale-105 active:scale-95"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
