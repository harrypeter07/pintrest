'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SendFormProps {
  onMessageSent: () => void;
}

export default function SendForm({ onMessageSent }: SendFormProps) {
  const [formData, setFormData] = useState({
    type: 'text' as 'text' | 'image',
    messageText: '',
    imageUrl: '',
    viewPolicy: 'once' as 'once' | '24hr' | 'custom',
    customHours: 1,
    from: 'you',
    to: 'partner'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          type: 'text',
          messageText: '',
          imageUrl: '',
          viewPolicy: 'once',
          customHours: 1,
          from: 'you',
          to: 'partner'
        });
        onMessageSent();
        
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg p-6 shadow-lg border border-rose-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        💌 Send Secret Message
      </h2>

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6"
        >
          <p className="text-green-800 text-center">✨ Message sent successfully!</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="text">📝 Text Message</option>
              <option value="image">🖼️ Image Message</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              View Policy
            </label>
            <select
              name="viewPolicy"
              value={formData.viewPolicy}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="once">👁️ View Once</option>
              <option value="24hr">⏰ 24 Hours</option>
              <option value="custom">⏱️ Custom Hours</option>
            </select>
          </div>
        </div>

        {formData.viewPolicy === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Hours
            </label>
            <input
              type="number"
              name="customHours"
              value={formData.customHours}
              onChange={handleInputChange}
              min="1"
              max="168"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        )}

        {formData.type === 'text' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message Text
            </label>
            <textarea
              name="messageText"
              value={formData.messageText}
              onChange={handleInputChange}
              placeholder="Write your secret message here..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              required
            />
          </div>
        )}

        {formData.type === 'image' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Caption (Optional)
              </label>
              <textarea
                name="messageText"
                value={formData.messageText}
                onChange={handleInputChange}
                placeholder="Add a caption to your image..."
                rows={2}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Sending...
            </div>
          ) : (
            '💌 Send Secret Message'
          )}
        </button>
      </form>
    </motion.div>
  );
}
