import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: '¡Hola! Bienvenido a Urban Step. ¿En qué te puedo ayudar hoy?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const lowerInput = userMessage.text.toLowerCase();
      let botResponse = 'Gracias por tu mensaje. Un asesor te contactará pronto.';
      
      if (lowerInput.includes('envío') || lowerInput.includes('envio')) {
        botResponse = 'Nuestros envíos tardan entre 2 y 5 días hábiles. ¡El envío es gratis a todo el país!';
      } else if (lowerInput.includes('talla')) {
        botResponse = 'Nuestros modelos vienen en tallas estándar EU. Si estás entre dos tallas, te recomendamos elegir la mayor.';
      } else if (lowerInput.includes('devolución') || lowerInput.includes('devolucion')) {
        botResponse = 'Tienes 30 días para devoluciones gratuitas siempre que el producto esté sin uso y en su caja original.';
      }

      setMessages((prev) => [...prev, { id: Date.now(), text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-foreground text-background shadow-lg hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] h-[500px] max-h-[80vh] bg-background border border-border flex flex-col shadow-2xl z-50">
          {/* Header */}
          <div className="bg-foreground text-background p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm">Soporte Urban Step</h3>
              <p className="text-xs opacity-70">En línea</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-background/20 p-1 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 text-sm ${msg.sender === 'user' ? 'bg-foreground text-background' : 'bg-muted border border-border text-foreground'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-4 border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 bg-muted px-3 py-2 text-sm border border-border focus:outline-none focus:border-foreground"
            />
            <button type="submit" disabled={!input.trim()} className="bg-foreground text-background p-2 disabled:opacity-50">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
