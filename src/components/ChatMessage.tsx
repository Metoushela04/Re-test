import React from 'react';
import { Bot, User } from 'lucide-react';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex items-start space-x-3 ${isBot ? 'justify-start' : 'justify-end'} animate-slideIn`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      <div className={`max-w-[80%] ${isBot ? 'bg-white' : 'bg-purple-600 text-white'} rounded-2xl p-4 shadow-md`}>
        {message.type === 'text' ? (
          <p className="text-sm">{message.content}</p>
        ) : (
          <img src={message.imageUrl} alt="Generated" className="rounded-lg max-w-full" />
        )}
        <span className="text-xs opacity-50 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
}