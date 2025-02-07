import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import type { Message, ChatState } from './types';

const API_URL = "https://text.pollinations.ai/openai/";

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const handleSendMessage = async (content: string, type: 'text' | 'image' | 'code') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type,
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      isLoading: true,
    }));

    try {
      if (type === 'image') {
        const query = content.replace('/poli ', '');
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(query)}`;
        
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: 'Here\'s your generated image:',
          sender: 'bot',
          timestamp: new Date(),
          type: 'image',
          imageUrl,
        };

        setChatState(prev => ({
          ...prev,
          messages: [...prev.messages, botResponse],
          isLoading: false,
        }));
      } else {
        const response = await axios.get(`${API_URL}${encodeURIComponent(content)}`);

        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: response.data, // Pollinations API renvoie directement du texte
          sender: 'bot',
          timestamp: new Date(),
          type: 'text',
        };

        setChatState(prev => ({
          ...prev,
          messages: [...prev.messages, botResponse],
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Error:', error);
      setChatState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Fonction de copie du texte ou du code
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pt-20 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {chatState.messages.map((message) => (
              <ChatMessage key={message.id} message={message}>
                {/* Affichage du message avec le bouton "Copier" */}
                <div className="flex justify-between items-center">
                  {message.type === 'code' ? (
                    <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                      {message.content}
                    </pre>
                  ) : (
                    <p className="text-gray-800">{message.content}</p>
                  )}

                  <button 
                    onClick={() => copyToClipboard(message.content)} 
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    Copy
                  </button>
                </div>
              </ChatMessage>
            ))}
            {chatState.isLoading && (
              <div className="flex justify-center">
                <div className="animate-bounce bg-purple-600 p-2 w-12 h-12 ring-1 ring-slate-900/5 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0">
        <ChatInput onSendMessage={handleSendMessage} isLoading={chatState.isLoading} />
      </div>
    </div>
  );
}

export default App;
  
