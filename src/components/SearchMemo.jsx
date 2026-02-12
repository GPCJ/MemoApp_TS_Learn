import { useEffect, useState } from 'react';

function SelectMemo({ fetchMemos }) {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // 최종 검색어

  const handleSearch = () => {
    setSearchQuery(inputValue);
  };
  useEffect(() => {
    fetchMemos({ q: searchQuery });
  }, [searchQuery]);

  return (
    <div className="relative w-full">
      {/* 돋보기 아이콘 */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="flex w-full gap-2 mb-5 flex-nowrap items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="block w-full pl-10 pr-3 py-2.5 bg-[#3333] border border-gray-300 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2
        focus:ring-blue-500/20 focus:border-blue-500 focus:bg-[#7777] transition-all shadow-sm"
          placeholder="어떤 메모를 찾으시나요?"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(inputValue)}
        />
        <button
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-2xl 
        hover:bg-blue-700 active:scale-95 transition-all shadow-md whitespace-nowrap"
          onClick={() => handleSearch(inputValue)}
        >
          검색
        </button>
      </div>
    </div>
  );
}

export default SelectMemo;
