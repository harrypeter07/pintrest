'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Message } from '@/lib/db';

interface MessageCardProps {
  message: Message;
  onMarkAsViewed: (messageId: string) => void;
}

export default function MessageCard({ message, onMarkAsViewed }: MessageCardProps) {
  const [isViewed, setIsViewed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleView = () => {
    if (message.viewPolicy === 'once' && !isViewed) {
      setIsViewed(true);
      onMarkAsViewed(message._id!);
    }
    setIsExpanded(!isExpanded);
  };

  const formatTimeRemaining = () => {
    const now = new Date();
    const expiresAt = new Date(message.expiresAt);
    const diff = expiresAt.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
  };

  const getPolicyDisplay = () => {
    switch (message.viewPolicy) {
      case 'once':
        return '👁️ View once';
      case '24hr':
        return '⏰ 24 hours';
      case 'custom':
        return `⏱️ ${message.customHours}h custom`;
      default:
        return '';
    }
  };

  if (message.viewPolicy === 'once' && isViewed) {
    return (
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-4 shadow-sm border border-gray-200"
      >
        <div className="text-center text-gray-500">
          <p className="text-sm">✨ Message viewed</p>
          <p className="text-xs mt-1">This message has disappeared forever</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-4 shadow-md border border-pink-200 hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-purple-600">From: {message.from}</span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">{getPolicyDisplay()}</span>
        </div>
        <span className="text-xs text-gray-500">
          {formatTimeRemaining()}
        </span>
      </div>

      {message.type === 'text' && (
        <div className="mb-3">
          {!isExpanded ? (
            <p className="text-gray-700 line-clamp-2">
              {message.messageText?.substring(0, 100)}
              {message.messageText && message.messageText.length > 100 && '...'}
            </p>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-700 whitespace-pre-wrap"
            >
              {message.messageText}
            </motion.p>
          )}
        </div>
      )}

      {message.type === 'image' && message.imageUrl && (
        <div className="mb-3">
          <img
            src={message.imageUrl}
            alt="Secret message"
            className="w-full h-48 object-cover rounded-lg"
          />
          {message.messageText && (
            <p className="text-gray-700 mt-2">{message.messageText}</p>
          )}
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          onClick={handleView}
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-medium hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          {message.type === 'text' 
            ? (isExpanded ? 'Show Less' : 'Read Message') 
            : 'View Image'
          }
        </button>
        
        <div className="text-xs text-gray-500">
          {new Date(message.createdAt).toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  );
}
