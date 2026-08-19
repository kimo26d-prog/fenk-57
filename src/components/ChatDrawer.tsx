import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Send,
  Wrench,
  Phone,
  MessageSquare,
  Sparkles,
  CheckCheck
} from 'lucide-react';

export const ChatDrawer: React.FC = () => {
  const { activeChatCraftsman, closeChat, chatMessages, sendChatMessage, showToast } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = activeChatCraftsman ? chatMessages[activeChatCraftsman.id] || [] : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!activeChatCraftsman) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(activeChatCraftsman.id, inputText);
    setInputText('');
  };

  const handleQuickPrompt = (promptText: string) => {
    sendChatMessage(activeChatCraftsman.id, promptText);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeChat}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide Drawer */}
      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 sm:pr-10">
        <div className="w-screen max-w-md bg-[#12121a] border-r border-[#2a2a3a] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 bg-[#1a1a24] border-b border-[#2a2a3a] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] flex items-center justify-center text-2xl shadow-lg shadow-[#00d4c8]/20">
                  {activeChatCraftsman.avatar}
                </div>
                <span className="absolute -bottom-1 -left-1 w-3.5 h-3.5 rounded-full bg-[#00e676] border-2 border-[#1a1a24]" />
              </div>

              <div>
                <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                  {activeChatCraftsman.name}
                  {activeChatCraftsman.verified && (
                    <span className="text-[10px] bg-[#00d4c8]/20 text-[#00d4c8] px-2 py-0.5 rounded-full font-bold">
                      معتمد
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-400">
                  {activeChatCraftsman.profession} • {activeChatCraftsman.city}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={`tel:${activeChatCraftsman.phone}`}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#00e676]/20 text-slate-300 hover:text-[#00e676] flex items-center justify-center transition-colors"
                title="اتصال هاتفي"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={closeChat}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2.5 bg-[#0a0a0f] border-b border-[#2a2a3a] flex gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleQuickPrompt('السلام عليكم، هل أنت متاح للعمل هذا الأسبوع؟')}
              className="shrink-0 px-3 py-1.5 rounded-xl bg-[#1a1a24] hover:bg-[#00d4c8]/20 border border-[#2a2a3a] hover:border-[#00d4c8]/40 text-xs text-slate-300 hover:text-[#00d4c8] transition-all"
            >
              📅 هل أنت متاح هذا الأسبوع؟
            </button>
            <button
              onClick={() => handleQuickPrompt('كم تقريباً تكلفة المعاينة والعمل؟')}
              className="shrink-0 px-3 py-1.5 rounded-xl bg-[#1a1a24] hover:bg-[#00d4c8]/20 border border-[#2a2a3a] hover:border-[#00d4c8]/40 text-xs text-slate-300 hover:text-[#00d4c8] transition-all"
            >
              💰 كم تكلفة العمل تقريباً؟
            </button>
            <button
              onClick={() => handleQuickPrompt('هل تقدم ضمان معتمد على الشغل؟')}
              className="shrink-0 px-3 py-1.5 rounded-xl bg-[#1a1a24] hover:bg-[#00d4c8]/20 border border-[#2a2a3a] hover:border-[#00d4c8]/40 text-xs text-slate-300 hover:text-[#00d4c8] transition-all"
            >
              🛡️ هل تقدم ضمان على الشغل؟
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => {
              const isMe = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md ${
                      isMe
                        ? 'bg-gradient-to-r from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] font-bold rounded-bl-sm'
                        : 'bg-[#1a1a24] border border-[#2a2a3a] text-slate-100 rounded-br-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500 px-1">
                    <span>{msg.time}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-[#00d4c8]" />}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Footer */}
          <form onSubmit={handleSend} className="p-3.5 bg-[#1a1a24] border-t border-[#2a2a3a]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="اكتب رسالتك للحرفي هنا..."
                className="flex-1 px-4 py-3 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00d4c8] transition-colors"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00d4c8] to-[#00b8ad] text-[#0a0a0f] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-[#00d4c8]/20 hover:scale-105 transition-all"
              >
                <Send className="w-5 h-5 rotate-180" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
