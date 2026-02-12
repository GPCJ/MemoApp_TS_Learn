import { useState } from 'react';
import { createMemo } from '../api/memos';

function MemoInput({ createMemoSync }) {
  const [titleMemo, setTitleMemo] = useState('');
  const [contentMemo, setContentMemo] = useState('');
  const [isNull, setIsNull] = useState(false);

  const handleMemo = async (title, content) => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    // 서버에 Create요청 보내고 로컬에 동기화 하기 전에 입력 값은 검사해서 빈 값이면 사용자에게 알림
    if (trimmedTitle === '' || trimmedContent === '') {
      setIsNull(true);
      return;
    }

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
          setIsNull(false); // 입력 시작 시 빈 값 에러 OFF
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
        <button
          onClick={() => handleMemo(titleMemo, contentMemo)}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          메모 추가
        </button>
      </div>
    </section>
  );
}

export default MemoInput;
