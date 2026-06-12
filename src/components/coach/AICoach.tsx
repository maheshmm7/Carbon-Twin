// src/components/coach/AICoach.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useCarbonStore } from '@/store/carbon-store';
import { Send, Sparkles, MessageCircle } from 'lucide-react';


export default function AICoach() {
  const twin = useCarbonStore((state) => state.twin);
  const coachMessages = useCarbonStore((state) => state.coachMessages);
  const sendCoachMessage = useCarbonStore((state) => state.sendCoachMessage);

  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [coachMessages]);

  if (!twin) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const text = input;
    setInput('');
    setIsSending(true);

    try {
      await sendCoachMessage(text);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const handlePresetClick = async (presetText: string) => {
    if (isSending) return;
    setIsSending(true);
    try {
      await sendCoachMessage(presetText);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const presets = [
    'How do I improve my Aura?',
    'Explain my travel carbon cost.',
    'Quickest way to save 1 tonne.',
    'Give me green diet tips.'
  ];

  return (
    <div 
      id="ai-coach"
      className="w-full"
    >
      <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/40 border border-white/5 backdrop-blur-xl">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              AI Carbon Coach
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-[9px] font-extrabold text-indigo-400 uppercase tracking-wider">
                Active Expert
              </span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Ask customized follow-up questions to receive tailored advice on how to drop emissions.
            </p>
          </div>
        </div>

        {/* Chat Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Chat Box */}
          <div className="lg:col-span-8 flex flex-col h-[400px] rounded-2xl bg-black/40 border border-white/5 overflow-hidden">
            
            {/* Scrollable messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {coachMessages.map((msg) => {
                const isCoach = msg.sender === 'coach';
                return (
                  <div 
                    key={msg.id}
                    className={`flex ${isCoach ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                      isCoach 
                        ? 'bg-neutral-800/80 text-white rounded-tl-none border border-white/5' 
                        : 'bg-indigo-600 text-white rounded-tr-none shadow-[0_4px_12px_rgba(79,70,229,0.2)]'
                    }`}>
                      {isCoach && (
                        <div className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider text-indigo-400 mb-1">
                          <Sparkles className="w-2.5 h-2.5" /> Coach
                        </div>
                      )}
                      <p className="whitespace-pre-line text-xs leading-relaxed md:text-sm">{msg.text}</p>
                    </div>
                  </div>
                );
              })}
              
              {isSending && (
                <div className="flex justify-start">
                  <div className="bg-neutral-800/80 text-white rounded-2xl rounded-tl-none p-4 border border-white/5">
                    <div className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider text-indigo-400 mb-1.5">
                      <Sparkles className="w-2.5 h-2.5" /> Coach
                    </div>
                    <div className="flex gap-1.5 items-center py-1">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-white/5 bg-neutral-900/50 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask how to reduce carbon footprints..."
                disabled={isSending}
                className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 placeholder-neutral-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isSending}
                className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Preset Prompts / Quick actions */}
          <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-white/5 border border-white/5">
            <div>
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                Quick Questions
              </h4>
              <div className="space-y-2.5">
                {presets.map((preset) => (
                  <button
                    type="button"
                    key={preset}
                    onClick={() => handlePresetClick(preset)}
                    disabled={isSending}
                    className="w-full text-left p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-neutral-300 hover:bg-white/5 hover:border-white/10 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-indigo-950/10 border border-indigo-950/20 text-[11px] text-neutral-400 leading-relaxed">
              💡 <span className="font-semibold text-white">Pro Tip:</span> Ask about specific alternatives in your area, or ask how your simulator toggles can save you money.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
