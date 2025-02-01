import React, { useState } from 'react';
import { Bot, Menu, X, Github, Linkedin, Twitter, Mail, Bell, Settings, HelpCircle, Moon } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasNotification] = useState(true);

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-800 to-purple-900 backdrop-blur-lg text-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Metoushela AI</h1>
              <p className="text-xs text-pink-200">Created by Metoushela Walker</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <Bell className="w-6 h-6" />
                {hasNotification && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                )}
              </button>
            </div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Sliding Menu */}
      <div 
        className={`fixed top-0 right-0 min-h-full w-72 bg-white transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-end">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-purple-100 rounded-full transition-colors text-purple-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-800">Menu</h2>
            
            <div className="space-y-2 bg-gray-100 p-4 rounded-lg">
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-left text-purple-700 hover:bg-purple-50 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-left text-purple-700 hover:bg-purple-50 rounded-lg transition-colors">
                <HelpCircle className="w-5 h-5" />
                <span>Help & Support</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-left text-purple-700 hover:bg-purple-50 rounded-lg transition-colors">
                <Moon className="w-5 h-5" />
                <span>Dark Mode</span>
              </button>
            </div>

            <div className="pt-6">
              <h2 className="text-lg font-semibold text-purple-800 mb-4">Connect</h2>
              <div className="flex justify-around bg-gray-100 p-4 rounded-lg">
                <a href="https://github.com/MeganAe" className="p-2 text-purple-600 hover:bg-purple-100 rounded-full transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/metoushela walker" className="p-2 text-purple-600 hover:bg-purple-100 rounded-full transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" className="p-2 text-purple-600 hover:bg-purple-100 rounded-full transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="mailto:metoushael@gmail.com" className="p-2 text-purple-600 hover:bg-purple-100 rounded-full transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
