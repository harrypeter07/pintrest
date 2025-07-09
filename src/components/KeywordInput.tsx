'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface KeywordInputProps {
  onKeywordEnter?: (keyword: string) => void;
}

export default function KeywordInput({ onKeywordEnter }: KeywordInputProps) {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (keyword.toLowerCase().trim() === 'chingi') {
      // Redirect to the hidden dashboard
      router.push('/x983-fav');
    } else {
      // Clear the input and show a fake "search" behavior
      setKeyword('');
      // You could add fake Pinterest-like search results here
    }
    
    onKeywordEnter?.(keyword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          data-form-type="other"
          className="w-full px-4 py-3 pr-12 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent shadow-sm"
          style={{ WebkitTextSecurity: 'none' }}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
