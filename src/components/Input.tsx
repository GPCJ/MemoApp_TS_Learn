import { useState } from 'react';
import { createMemo } from '../api/memos';
import type { Memo } from '../types/memo';
import { Link } from 'react-router-dom';

interface MemoInputProps {
  createMemoSync: (newMemo: Memo) => void;
}

function MemoInput({ createMemoSync }: MemoInputProps) {
  const [titleMemo, setTitleMemo] = useState('');
  const [contentMemo, setContentMemo] = useState('');
  const [isNull, setIsNull] = useState(false);

  const handleMemo = async (title: string, content: string) => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (trimmedTitle === '' || trimmedContent === '') {
      setIsNull(true);
      return;
    }

    const newMemo = {
      title: trimmedTitle,
      content: trimmedContent,
      tags: ['할일'],
    };

    try {
      const createData = await createMemo(newMemo);
      createMemoSync(createData);
      setTitleMemo('');
      setContentMemo('');
    } catch (error) {
      console.error('저장 실패:', error);
    }
  };

  return (
    <section className="bg-[#1c1c1c] p-6 rounded-xl shadow-md mb-5">
      <h2 className="text-center text-white mb-2">새 메모 작성</h2>
      <p className="text-left text-white mb-2">제목</p>
      <input
        className={`w-full p-4 mb-4 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all pl text-white 
          ${
            isNull
              ? 'border-red-500 placeholder-red-500 focus:ring-red-500'
              : 'border-gray-200 placeholder-neutral-500 focus:ring-blue-500'
          }`}
        value={titleMemo}
        onChange={(e) => {
          setTitleMemo(e.target.value);
          setIsNull(false);
        }}
        placeholder="제목을 입력해주세요."
      />
      <p className="text-left text-white mb-2">내용</p>
      <textarea
        className={`w-full h-32 p-4 border  rounded-lg focus:ring-2  focus:border-transparent outline-none transition-all resize-none  text-white
          ${
            isNull
              ? 'border-red-500 placeholder-red-500 focus:ring-red-500'
              : 'border-gray-200 placeholder-neutral-500 focus:ring-blue-500'
          }`}
        value={contentMemo}
        onChange={(e) => {
          setContentMemo(e.target.value);
          setIsNull(false);
        }}
        placeholder="내용을 입력해주세요."
      />
      <div className="flex justify-end mt-4">
        <Link
          to={'/'}
          onClick={() => handleMemo(titleMemo, contentMemo)}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          메모 추가
        </Link>
      </div>
    </section>
  );
}

export default MemoInput;
