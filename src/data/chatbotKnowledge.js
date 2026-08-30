// ============================================================================
// CHATBOT KNOWLEDGE BASE
// ----------------------------------------------------------------------------
// A simple rule-based FAQ engine: each entry has an array of `keywords` to
// match against the visitor's (lowercased) message, and a canned `response`.
// No API key, no backend, no network call — everything resolves instantly
// on the client. To upgrade this to a real AI backend later, replace the
// `getBotResponse()` matching logic in Chatbot.jsx with a fetch() call to
// your own API route (which then calls OpenAI/Claude/etc. server-side).
// ============================================================================

export const QUICK_REPLIES = [
  'What skills do you have?',
  'Are you available for freelance?',
  'How can I contact you?',
  'What tech stack do you use?',
];

export const KNOWLEDGE_BASE = [
  {
    keywords: ['skill', 'stack', 'tech', 'technology', 'language', 'framework'],
    response:
      "I work mainly with JavaScript (ES6+), React, Node.js, and modern CSS — plus creative-coding tools like GSAP, Framer Motion, and the Canvas API for interactive UI work.",
  },
  {
    keywords: ['project', 'work', 'portfolio', 'built', 'made'],
    response:
      "Check out the Work section above — a few highlights are Nebula Dashboard (real-time analytics), Aurora Commerce (headless storefront), and Pulse Studio (audio-reactive visuals). Want details on any of them?",
  },
  {
    keywords: ['hire', 'freelance', 'available', 'availability', 'work with you'],
    response:
      "Yes — I'm currently open to select freelance and contract work. The fastest way to start a conversation is the contact form below, or you can say 'contact' here and I'll point you to it.",
  },
  {
    keywords: ['contact', 'email', 'reach', 'get in touch'],
    response:
      "You can reach out directly through the Contact form at the bottom of this page — just scroll down or click 'Contact' in the nav bar.",
  },
  {
    keywords: ['experience', 'years', 'background', 'about you', 'who are you'],
    response:
      "I'm a full-stack developer with 7+ years of experience, focused lately on interaction design — the small tactile details (custom cursors, 3D tilt, motion) that make an interface feel alive.",
  },
  {
    keywords: ['price', 'cost', 'rate', 'budget', 'how much'],
    response:
      "Rates depend on project scope — timeline, complexity, and whether it's fixed-price or ongoing. Send a quick note through the contact form with your project details and I'll follow up with specifics.",
  },
  {
    keywords: ['resume', 'cv'],
    response:
      "I don't have a resume linked on this build yet, but the About section covers my background — and you're welcome to ask me directly about specific experience.",
  },
  {
    keywords: ['hello', 'hi', 'hey', 'yo', 'sup'],
    response: "Hey! 👋 I'm Elias's portfolio assistant. Ask me about skills, projects, or how to get in touch.",
  },
  {
    keywords: ['thank', 'thanks', 'thx'],
    response: "You're welcome! Let me know if there's anything else you'd like to know.",
  },
];

export const FALLBACK_RESPONSES = [
  "I'm a simple rule-based assistant, so I might not catch that one — try asking about skills, projects, availability, or how to get in touch.",
  "Not sure I follow — I can answer questions about Elias's skills, past projects, or how to start a project together.",
];

/**
 * Matches a visitor message against the knowledge base and returns the best
 * response. Pure keyword matching — no ML, no network call, instant result.
 */
export function getBotResponse(message) {
  const normalized = message.toLowerCase();

  const match = KNOWLEDGE_BASE.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword))
  );

  if (match) return match.response;

  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
}
