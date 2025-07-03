"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Phone, Calendar, X, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm BENNYHINN's AI assistant. I can help you schedule a meeting, get in touch via WhatsApp, or answer questions about my services. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('schedule') || input.includes('meeting') || input.includes('calendar')) {
      return "I'd be happy to help you schedule a meeting with BENNYHINN! Please provide your preferred date and time, and I'll coordinate with his calendar. You can also call directly at +254 111 291 633.";
    } else if (input.includes('whatsapp') || input.includes('contact') || input.includes('phone')) {
      return "You can reach BENNYHINN directly on WhatsApp at +254 111 291 633. He's usually available during business hours and responds quickly to messages about new projects!";
    } else if (input.includes('project') || input.includes('hire') || input.includes('work')) {
      return "BENNYHINN specializes in Full Stack Development, Android Apps, Web Design, Graphic Design, and AI Integration. He's available for both short-term projects and long-term partnerships. Would you like to discuss a specific project?";
    } else if (input.includes('price') || input.includes('cost') || input.includes('rate')) {
      return "Project pricing depends on scope and complexity. BENNYHINN offers competitive rates for quality work. Let's discuss your specific requirements - I can arrange a consultation call to provide a detailed quote.";
    } else if (input.includes('portfolio') || input.includes('examples') || input.includes('work')) {
      return "Check out the featured projects above! BENNYHINN has worked on Android apps like PROJECT ANTIQUES, full-stack web applications like GENESIL AUTOBRAKE, and stunning graphic designs. Each project showcases different technical skills.";
    } else {
      return "Thanks for your message! For specific inquiries about BENNYHINN's services, project timelines, or technical questions, I recommend reaching out directly via WhatsApp (+254 111 291 633) or scheduling a call. Is there anything specific you'd like to know about his work?";
    }
  };

  const quickActions = [
    { text: "Schedule a meeting", icon: <Calendar className="w-4 h-4" /> },
    { text: "WhatsApp contact", icon: <Phone className="w-4 h-4" /> },
    { text: "View portfolio", icon: <User className="w-4 h-4" /> },
    { text: "Get pricing", icon: <MessageCircle className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* AI Assistant Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-full shadow-2xl hover:shadow-cyber-cyan/50 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="w-6 h-6 text-black" /> : <Bot className="w-6 h-6 text-black" />}
        </motion.div>
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple animate-ping opacity-30" />
      </motion.button>

      {/* AI Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-80 h-96 glass-card rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 p-4 border-b border-cyber-cyan/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-cyber-silver font-mono font-semibold">AI Assistant</h3>
                  <p className="text-cyber-silver/60 text-xs">Online & Ready to Help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-60">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black'
                      : 'bg-cyber-gray/50 text-cyber-silver'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-cyber-gray/50 text-cyber-silver p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-cyber-gray/30">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(action.text)}
                    className="flex items-center space-x-1 px-3 py-1 bg-cyber-gray/30 hover:bg-cyber-cyan/20 rounded-full text-xs text-cyber-silver hover:text-cyber-cyan transition-colors"
                  >
                    {action.icon}
                    <span>{action.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-cyber-gray/30">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                  placeholder="Type your message..."
                  className="flex-1 bg-cyber-gray/30 text-cyber-silver placeholder-cyber-silver/50 border border-cyber-gray/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyber-cyan"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  className="p-2 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-lg hover:shadow-cyber-cyan/50 transition-all duration-300"
                >
                  <Send className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}