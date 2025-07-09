'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SendForm from '@/components/SendForm';
import MessageCard from '@/components/MessageCard';
import { Message } from '@/lib/db';

export default function SecretDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<'inbox' | 'send'>('inbox');
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages?to=you');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsViewed = async (messageId: string) => {
    try {
      await fetch(`/api/messages/${messageId}`, {
        method: 'PATCH',
      });
      // Refresh messages
      fetchMessages();
    } catch (error) {
      console.error('Error marking message as viewed:', error);
    }
  };

  const handleMessageSent = () => {
    // Refresh messages when a new message is sent
    fetchMessages();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Secret Messages
            </span>
          </h1>
          <p className="text-white/80 text-lg">
            A hidden space for your most precious thoughts ✨
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-full p-1">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === 'inbox'
                  ? 'bg-white text-purple-900 shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              📨 Inbox ({messages.length})
            </button>
            <button
              onClick={() => setActiveTab('send')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === 'send'
                  ? 'bg-white text-purple-900 shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              💌 Send Message
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl"
        >
          {activeTab === 'inbox' ? (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">📨</span>
                Your Secret Messages
              </h2>
              
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                  <p className="text-white/80 mt-4">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-white/80 text-lg">No messages yet</p>
                  <p className="text-white/60 text-sm mt-2">
                    Your secret messages will appear here
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {messages.map((message) => (
                    <MessageCard
                      key={message._id?.toString()}
                      message={message}
                      onMarkAsViewed={handleMarkAsViewed}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">💌</span>
                Send a Secret Message
              </h2>
              <SendForm onMessageSent={handleMessageSent} />
            </div>
          )}
        </motion.div>

        {/* Floating Hearts Animation */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: [0, 1, 0], y: -100 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeInOut"
              }}
              className="absolute text-2xl text-pink-400/30"
              style={{
                left: `${20 + i * 15}%`,
                top: `${80 + (i % 2) * 10}%`,
              }}
            >
              💕
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 text-sm">
            This is your private space. Messages are encrypted and secured.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <div className="flex items-center text-white/60 text-xs">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Secure Connection
            </div>
            <div className="flex items-center text-white/60 text-xs">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Private Messages
            </div>
            <div className="flex items-center text-white/60 text-xs">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Auto-Delete
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
