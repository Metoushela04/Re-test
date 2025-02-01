import React from 'react';
import { Bot, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-700 to-indigo-800 text-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bot className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Metoushela AI</h1>
              <p className="text-xs opacity-75">Created by Metoushela Walker</p>
            </div>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}