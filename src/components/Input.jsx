import { useEffect, useState } from 'react';
import { createMemo } from '../api/memos';

function MemoInput({ createMemoSync }) {
  const [titleMemo, setTitleMemo] = useState('');
  const [contentMemo, setContentMemo] = useState('');
  // const [isError, setIsError] = useState(false);

  const handleMemo = async (title, content) => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    // 빈 메모 검사
    if (trimmedTitle === '' || trimmedContent === '') {
      // setIsError(true);
      // 메모 공백 에러 메시지 필요
      // useEffect써서 isError가 바뀌면 에러 메시지 컴포넌트 호출하는 방식 좋아보임
      return;
    }
    // setIsError(false);

    // 요청 형식에 맞게 객체화
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
    <div className="bg-[#1E1E1E] p-6 rounded-xl shadow-md mb-8">
      <p className="text-left text-white mb-2">제목</p>
      <input
        className="w-full p-4 mb-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-neutral-500 text-white"
        value={titleMemo}
        onChange={(e) => setTitleMemo(e.target.value)}
        placeholder="제목을 입력해주세요."
      />
      <p className="text-left text-white mb-2">내용</p>
      <textarea
        className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none placeholder-neutral-500 text-white"
        value={contentMemo}
        onChange={(e) => setContentMemo(e.target.value)}
        placeholder="내용을 입력해주세요."
      />
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handleMemo(titleMemo, contentMemo)}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          메모 추가
        </button>
      </div>
    </div>
  );
}

export default MemoInput;
