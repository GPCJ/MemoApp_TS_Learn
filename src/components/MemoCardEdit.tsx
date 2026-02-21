import { deleteMemo } from '../api/memos';
import type { Memo, EditAction, EditState } from '../types/memo';
import { useRef } from 'react';
import { formatDate } from '../utils/formatDate';

interface MemoViewProps {
  memo: Memo;
  editState: EditState;
  deleteMemoSync: (id: number) => void;
  dispatchEdit: React.Dispatch<EditAction>;
  handleKeyDown: (e: React.KeyboardEvent, memo: Memo) => void;
  handleUpdate: (memoInfo: Memo) => void;
}

function MemoEdit({
  memo,
  editState,
  dispatchEdit,
  deleteMemoSync,
  handleKeyDown,
  handleUpdate,
}: MemoViewProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        value={editState.title}
        onChange={(e) =>
          dispatchEdit({
            type: 'UPDATE_FIELD',
            field: 'title',
            value: e.target.value,
          })
        }
        onKeyDown={(e) => handleKeyDown(e, memo)}
        ref={inputRef}
        autoFocus
        className={`w-full p-4 mb-4 border  rounded-lg focus:ring-2  focus:border-transparent outline-none transition-all  text-white
                  ${
                    editState.isNull
                      ? 'border-red-500 placeholder-red-500 focus:ring-red-500'
                      : 'border-gray-200 placeholder-neutral-500 focus:ring-blue-500'
                  }`}
        placeholder="제목을 입력해주세요."
      />
      <textarea
        value={editState.content}
        onChange={(e) =>
          dispatchEdit({
            type: 'UPDATE_FIELD',
            field: 'content',
            value: e.target.value,
          })
        }
        onKeyDown={(e) => handleKeyDown(e, memo)}
        className={`w-full h-32 p-4 border  rounded-lg focus:ring-2  focus:border-transparent outline-none transition-all resize-none text-white
                  ${
                    editState.isNull
                      ? 'border-red-500 placeholder-red-500 focus:ring-red-500'
                      : 'border-gray-200 placeholder-neutral-500 focus:ring-blue-500'
                  }`}
        placeholder="내용을 입력해주세요."
      />
      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs text-white font-medium mr-auto">
          {`생성: ${formatDate(memo.updatedAt)}`}
        </span>
        <button
          onClick={() => handleUpdate(memo)}
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
  );
}

export default MemoEdit;
