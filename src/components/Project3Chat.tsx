import { useState, useRef, useEffect } from 'react';
import { parts, bom, changeRequests } from '../data/mockData';
import { chatWithPLMAssistant } from '../services/gemini';
import Markdown from 'react-markdown';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

export default function Project3Chat() {
  const [messages, setMessages] = useState<{role: string, text: string}[]>([
    { role: 'assistant', text: 'Hello! I am your PLM Knowledge Assistant. Ask me about parts, BOMs, or engineering changes.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contextData = JSON.stringify({ parts, bom, changeRequests }, null, 2);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    
    try {
      const response = await chatWithPLMAssistant(messages, userMsg, contextData);
      setMessages(prev => [...prev, { role: 'assistant', text: response || 'No response.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, I encountered an error processing your request.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">PLM Knowledge Assistant</h1>
        <p className="text-slate-500 mt-1">Chat with your Windchill data using RAG (Retrieval-Augmented Generation).</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={clsx("flex gap-4", msg.role === 'user' ? "flex-row-reverse" : "")}>
              <div className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                msg.role === 'user' ? "bg-indigo-100 text-indigo-600" : "bg-emerald-100 text-emerald-600"
              )}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={clsx(
                "max-w-[80%] rounded-2xl px-5 py-3 text-sm",
                msg.role === 'user' 
                  ? "bg-indigo-600 text-white" 
                  : "bg-slate-100 text-slate-800 prose prose-sm prose-slate max-w-none"
              )}>
                {msg.role === 'user' ? (
                  msg.text
                ) : (
                  <div className="markdown-body bg-transparent text-inherit">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-slate-100 rounded-2xl px-5 py-4 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                <span className="text-sm text-slate-500">Searching database...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex gap-3">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="e.g., Which products use the Piston Ring?"
              className="flex-1 border border-slate-300 rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-colors disabled:opacity-50 shrink-0 shadow-sm"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
