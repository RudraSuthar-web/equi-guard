"use client";

import { PageHeader } from "@/components/page-components";
import { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  User,
  Plus,
  Clock,
  MessageSquare,
  Bot,
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const chatHistory = [
  { id: 1, title: "Bias in hiring data", date: "Today" },
  { id: 2, title: "Fairness threshold help", date: "Yesterday" },
  { id: 3, title: "Data synthesis explained", date: "3 days ago" },
];

const suggestedPrompts = [
  "Why is my model biased against females?",
  "How can I improve fairness scores?",
  "Explain the 4/5 rule for disparate impact",
  "What data do I need for bias detection?",
];

const initialMessages: Message[] = [
  {
    role: "user",
    content: "Why is my model biased against females?",
  },
  {
    role: "assistant",
    content: `Your model's training data contains historical gender bias. Females have lower positive outcomes (52% vs 68% for males), creating a data imbalance the model treats as 'learning signals' rather than systemic bias.

**Key factors:**

1. **Historical Data Imbalance** — The training data reflects past discriminatory practices where females were systematically underrepresented in positive outcomes.

2. **Feature Correlation** — Fields like 'years_experience' and 'job_title' have strong correlation with gender, leading the model to indirectly discriminate.

3. **Selection Rate Disparity** — The 4/5 rule threshold is violated with a ratio of 0.76, indicating adverse impact.

**Recommendations:**
- Use the Data Synthesizer to generate balanced synthetic data
- Apply fairness constraints during model retraining
- Consider removing or decorrelating proxy features

After applying our rebalancing techniques, the selection rate gap was reduced to under 5%.`,
  },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const assistantMsg: Message = {
        role: "assistant",
        content:
          "Thank you for your question! Based on the current analysis of your dataset, I can see several areas where bias mitigation strategies could be applied. Would you like me to provide specific recommendations based on your latest bias detection results?",
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-6rem)]">
      <PageHeader
        title="AI Assistant"
        description="Get answers about bias, fairness, and your data."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100%-5rem)]">
        {/* Left — Chat History */}
        <div className="hidden lg:flex flex-col glass-card rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/[0.06]">
            <button className="w-full flex items-center justify-center gap-2 text-xs font-medium text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/15 border border-indigo-500/20 px-4 py-2.5 rounded-lg transition-all">
              <Plus className="w-3.5 h-3.5" />
              New Chat
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            <p className="text-[10px] font-medium text-white/20 uppercase tracking-widest px-3 mb-2">
              Chat History
            </p>
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                className={`w-full text-left flex items-start gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  chat.id === 1
                    ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                    : "text-white/40 hover:text-white/60 hover:bg-white/[0.04]"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <div className="overflow-hidden">
                  <p className="text-xs font-medium truncate">{chat.title}</p>
                  <p className="text-[10px] text-white/20 mt-0.5">{chat.date}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right — Chat Area */}
        <div className="lg:col-span-3 glass-card rounded-xl flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-indigo-400" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-indigo-600/20 text-white/90 border border-indigo-500/20"
                      : "bg-white/[0.03] text-white/70 border border-white/[0.06]"
                  }`}
                >
                  {msg.content.split("\n\n").map((para, j) => (
                    <p key={j} className={j > 0 ? "mt-3" : ""}>
                      {para.split("**").map((part, k) =>
                        k % 2 === 1 ? (
                          <strong key={k} className="text-white font-semibold">
                            {part}
                          </strong>
                        ) : (
                          <span key={k}>{part}</span>
                        )
                      )}
                    </p>
                  ))}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-violet-400" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl px-5 py-4">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-white/20 animate-pulse [animation-delay:200ms]" />
                    <span className="w-2 h-2 rounded-full bg-white/20 animate-pulse [animation-delay:400ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          {messages.length <= 2 && (
            <div className="px-6 pb-2 flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="text-xs text-white/40 bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 rounded-full hover:bg-white/[0.06] hover:text-white/60 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-white/[0.06] p-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Ask anything about bias or fairness..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10 transition-all"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-white/[0.06] disabled:to-white/[0.06] flex items-center justify-center transition-all shadow-lg shadow-indigo-500/20 disabled:shadow-none shrink-0"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
