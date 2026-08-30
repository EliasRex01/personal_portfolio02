import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

/**
 * FloatingField
 * ----------------------------------------------------------------------
 * Controlled input/textarea with a label that floats up once the field has
 * a value or is focused. Unlike the vanilla-CSS version (which relied on
 * `:placeholder-shown`), here we track focus/value in React state directly
 * — more idiomatic in a controlled-component codebase and it lets us reuse
 * one component for both <input> and <textarea>.
 */
function FloatingField({ id, label, type = 'text', value, onChange, as = 'input', rows }) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;
  const Tag = as;

  return (
    <div className="relative">
      <Tag
        id={id}
        name={id}
        type={as === 'input' ? type : undefined}
        rows={rows}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        className="w-full resize-none border-b border-border bg-transparent py-3 font-body text-base text-text outline-none"
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 top-3 origin-left font-body text-text-faint transition-all duration-200 ${
          isFloating ? '-translate-y-6 scale-[0.82] text-cyan' : 'translate-y-0 scale-100'
        }`}
      >
        {label}
      </label>
      <motion.span
        className="absolute -bottom-px left-1/2 h-0.5 -translate-x-1/2 bg-gradient-accent shadow-glow-violet"
        animate={{ width: focused ? '100%' : '0%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  );
}

export default function Contact() {
  const headerRef = useScrollReveal({});
  const formRef = useScrollReveal({ delay: 0.1 });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' }); // idle | sending | sent | error

  function handleChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    if (!form.name || !form.email || !form.message) {
      setStatus({ state: 'error', message: 'Please fill in every field before sending.' });
      return;
    }
  
    setStatus({ state: 'sending', message: '' });
  
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: '8c0b64ed-f9ef-474a-bf64-b645ecca4878', 
        name: form.name,
        email: form.email,
        message: form.message,
        subject: `New portfolio message from ${form.name}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus({ state: 'sent', message: "Message sent — I'll get back to you shortly." });
          setForm({ name: '', email: '', message: '' });
        } else {
          setStatus({ state: 'error', message: 'Something went wrong — please try again.' });
        }
      })
      .catch(() => {
        setStatus({ state: 'error', message: 'Something went wrong — please try again.' });
      });
  }

  return (
    <section id="contact" className="bg-bg-alt px-8 py-32">
      <div ref={headerRef} className="mx-auto mb-14 max-w-6xl">
        <span className="section-tag">03 — Contact</span>
        <h2 className="section-title">Let's build something remarkable</h2>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="mx-auto flex max-w-xl flex-col gap-9">
        <FloatingField id="name" label="Your Name" value={form.name} onChange={handleChange('name')} />
        <FloatingField id="email" label="Your Email" type="email" value={form.email} onChange={handleChange('email')} />
        <FloatingField id="message" label="Your Message" as="textarea" rows={5} value={form.message} onChange={handleChange('message')} />

        <motion.button
          type="submit"
          data-hover
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          disabled={status.state === 'sending'}
          className="w-fit rounded-full bg-gradient-gold px-9 py-4 font-mono text-sm font-medium text-bg shadow-glow-gold disabled:opacity-60"
        >
          {status.state === 'sending' ? 'Sending...' : 'Send Message'}
        </motion.button>

        <p
          role="status"
          aria-live="polite"
          className={`min-h-[1.2em] font-mono text-sm ${
            status.state === 'error' ? 'text-red-400' : 'text-cyan'
          }`}
        >
          {status.message}
        </p>
      </form>
    </section>
  );
}
