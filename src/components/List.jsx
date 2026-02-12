import { useState, useRef } from 'react';
import { updateMemo, deleteMemo } from '../api/memos';

function MemoList({ memos, deleteMemoSync, updateMemoSync }) {
  const [editTitle, setEditTitle] = useState(memos.title);
  const [editContent, setEditContent] = useState(memos.content);
  const [editMemoId, setEditMemoId] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const [isNull, setIsNull] = useState(false);

  // 단축키 반응
  const handleKeyDown = (e, memo) => {
    if (e.key === 'Enter') {
      handleUpdate(memo);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    } else {
      return;
    }
  };

  const handleUpdate = (memoInfo) => {
    // 기존 메모 내용을 복사하고, 복사된 객체를 사용자가 입력한 내용으로 수정
    const updateInfo = { ...memoInfo, title: editTitle, content: editContent };

    // 최종 수정 이후, 수정된 값이 서버와 동기화 함수로 보내지기 전에 빈 값을 검사
    if (updateInfo.title.trim() === '' || updateInfo.content.trim() === '') {
      setIsNull(true);
      return;
    }

    updateMemo(memoInfo.id, updateInfo);
    updateMemoSync(updateInfo);
    setIsEditing(false);
  };

  // 날짜 데이터 포맷 함수
  const formatDate = (date) => {
    if (!date) return '';
    return date.replace('T', ' ').slice(0, 16);
  };

  return (
    // 리스트 전체 박스
    <section className="grid gap-4">
      {memos.length === 0 ? (
        <p className="text-center text-white py-10">
          아직 작성된 메모가 없어요. ✍️
        </p>
      ) : (
        memos.map((memo) => (
          // 항목 박스
          <div
            key={memo.id}
            className="bg-[#3333] p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group"
          >
            {isEditing && memo.id === editMemoId ? (
              <>
                {/* 입력 UI */}
                <input
                  value={editTitle}
                  onChange={(e) => {
                    setEditTitle(e.target.value);
                    setIsNull(false);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, memo)}
                  ref={inputRef}
                  autoFocus
                  className={`w-full p-4 mb-4 border  rounded-lg focus:ring-2  focus:border-transparent outline-none transition-all  text-white
                    ${
                      isNull
                        ? 'border-red-500 placeholder-red-500 focus:ring-red-500'
                        : 'border-gray-200 placeholder-neutral-500 focus:ring-blue-500'
                    }`}
                  placeholder="제목을 입력해주세요."
                />
                <textarea
                  value={editContent}
                  onChange={(e) => {
                    setEditContent(e.target.value);
                    setIsNull(false);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, memo)}
                  className={`w-full h-32 p-4 border  rounded-lg focus:ring-2  focus:border-transparent outline-none transition-all resize-none text-white
                    ${
                      isNull
                        ? 'border-red-500 placeholder-red-500 focus:ring-red-500'
                        : 'border-gray-200 placeholder-neutral-500 focus:ring-blue-500'
                    }`}
                  placeholder="내용을 입력해주세요."
                />
                {/* 업데이트 시간과 조작 버튼 */}
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-white font-medium mr-auto">
                    {`생성: ${formatDate(memo.updatedAt)}`}
                  </span>
                  <button
                    onClick={() => {
                      handleUpdate(memo); // 수정 내용 업데이트 함수
                    }}
                    className="text-white hover:bg-gray-500 rounded transition-colors text-sm p-2 "
                  >
                    확인
                  </button>
                  <button
                    onClick={() => {
                      deleteMemo(memo.id);
                      deleteMemoSync(memo.id);
                    }}
                    className="text-white hover:bg-red-500 rounded transition-colors text-sm p-2 "
                  >
                    삭제
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-white whitespace-pre-wrap pr-8">
                  제목: {memo.title}
                </p>
                <p className="text-white whitespace-pre-wrap pr-8 my-5">
                  내용: {memo.content}
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-white font-medium mr-auto">
                    {`생성: ${formatDate(memo.createdAt)}`}
                  </span>
                  <button
                    onClick={() => {
                      setEditMemoId(memo.id);
                      setEditTitle(memo.title);
                      setEditContent(memo.content);

                      setIsEditing(true);
                    }}
                    className="text-white hover:bg-blue-500 rounded transition-colors text-sm p-2 "
                  >
                    수정
                  </button>
                  <button
                    onClick={() => {
                      deleteMemo(memo.id);
                      deleteMemoSync(memo.id);
                    }}
                    className="text-white hover:bg-red-500 rounded transition-colors text-sm p-2 "
                  >
                    삭제
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </section>
  );
}
export default MemoList;
