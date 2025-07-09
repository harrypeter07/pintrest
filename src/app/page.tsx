'use client';

import { useState } from 'react';
import KeywordInput from '@/components/KeywordInput';
import { motion } from 'framer-motion';

// Sample Pinterest-style images for the grid
const sampleImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', title: 'Mountain Landscape' },
  { id: 2, url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=500&fit=crop', title: 'Forest Path' },
  { id: 3, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop', title: 'Nature View' },
  { id: 4, url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop', title: 'Sunset Beach' },
  { id: 5, url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=600&fit=crop', title: 'City Skyline' },
  { id: 6, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=350&fit=crop', title: 'Ocean Waves' },
  { id: 7, url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=450&fit=crop', title: 'Desert Dunes' },
  { id: 8, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop', title: 'Garden Flowers' },
  { id: 9, url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=500&fit=crop', title: 'Mountain Lake' },
  { id: 10, url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=350&fit=crop', title: 'Autumn Forest' },
  { id: 11, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=450&fit=crop', title: 'Stone Bridge' },
  { id: 12, url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop', title: 'Peaceful River' },
];

export default function Home() {
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleKeywordSearch = (keyword: string) => {
    // Show fake search results for any keyword except "chingi"
    if (keyword.toLowerCase() !== 'chingi' && keyword.trim() !== '') {
      const fakeResults = [`"${keyword}" - 0 results found`, 'Try different keywords'];
      setSearchResults(fakeResults);
      setTimeout(() => setSearchResults([]), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-red-600">Inspirations</h1>
            </div>
            
            <div className="flex-1 max-w-xl mx-8">
              <KeywordInput onKeywordEnter={handleKeywordSearch} />
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 16h7v5H4v-5zM4 3h16v9H4V3z" />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            {searchResults.map((result, index) => (
              <p key={index} className="text-yellow-800 text-sm">{result}</p>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pinterest-style Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
          {sampleImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="break-inside-avoid mb-4"
            >
              <div className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">{image.title}</p>
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors">
            Load More Inspirations
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspirations</h3>
              <p className="text-gray-600 text-sm">
                Discover beautiful ideas and inspiration for your next project.
              </p>
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Home & Garden</a></li>
                <li><a href="#" className="hover:text-gray-900">Fashion</a></li>
                <li><a href="#" className="hover:text-gray-900">Food & Drink</a></li>
                <li><a href="#" className="hover:text-gray-900">Travel</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              © 2024 Inspirations. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
