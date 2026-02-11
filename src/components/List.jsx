import { use, useState, useRef } from 'react';
import { updateMemo, deleteMemo } from '../api/memos';

function MemoList({ memos, deleteMemoSync, updateMemoSync }) {
  const [editTitle, setEditTitle] = useState(memos.title);
  const [editContent, setEditContent] = useState(memos.content);
  const [editMemoId, setEditMemoId] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const handleUpdate = (memoInfo) => {
    const updateInfo = { ...memoInfo, title: editTitle, content: editContent };
    updateMemo(memoInfo.id, updateInfo);
    updateMemoSync(updateInfo);
  };

  // 날짜 데이터 포맷 함수
  const formatDate = (date) => {
    if (!date) return '';
    return date.replace('T', ' ').slice(0, 16);
  };

  return (
    <div className="grid gap-4">
      {memos.length === 0 ? (
        <p className="text-center text-white py-10">
          아직 작성된 메모가 없어요. ✍️
        </p>
      ) : (
        memos.map((memo) => (
          <div
            key={memo.id}
            className="bg-[#3333] p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group"
          >
            {isEditing && memo.id === editMemoId ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  ref={inputRef}
                  autoFocus
                  className="w-full p-4 mb-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-neutral-500 text-white"
                  placeholder="제목을 입력해주세요."
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none placeholder-neutral-500 text-white"
                  placeholder="내용을 입력해주세요."
                />
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-white font-medium mr-auto">
                    {`생성: ${formatDate(memo.createdAt)}`}
                  </span>
                  <button
                    onClick={() => {
                      handleUpdate(memo);
                      setIsEditing(false);
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
    </div>
  );
}
export default MemoList;
