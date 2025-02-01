import React, { useState } from 'react';
import { Send, Image } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string, type: 'text' | 'image') => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const type = message.startsWith('/poli') ? 'image' : 'text';
      onSendMessage(message.trim(), type);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-t p-4">
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-100 rounded-full px-6 py-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message or /poli for image generation..."
            className="w-full bg-transparent outline-none"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="w-12 h-12 flex items-center justify-center bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {message.startsWith('/poli') ? <Image className="w-5 h-5" /> : <Send className="w-5 h-5" />}
        </button>
      </div>
    </form>
  );
}