import { useReducer, useRef, useEffect } from 'react';
import { updateMemo, deleteMemo } from '../api/memos';
import type { Memo, MemoInfo } from '../types/memo';
import { Pagination } from './components-index';

interface MemoListProps {
  memoInfo: MemoInfo;
  deleteMemoSync: (id: number) => void;
  updateMemoSync: (memo: Memo) => void;
  fetchMemos: (params: { page: number; limit?: 5 }) => void;
  isError: boolean;
}

interface EditState {
  memoId: number | null;
  title: string;
  content: string;
  isNull: boolean;
}

type EditAction =
  | { type: 'START_EDIT'; payload: Memo }
  | { type: 'UPDATE_FIELD'; field: 'title' | 'content'; value: string }
  | { type: 'SET_VALIDATION_ERROR' }
  | { type: 'RESET' };

const initialEditState: EditState = {
  memoId: null,
  title: '',
  content: '',
  isNull: false,
};

function editReducer(state: EditState, action: EditAction): EditState {
  switch (action.type) {
    case 'START_EDIT':
      return {
        memoId: action.payload.id,
        title: action.payload.title,
        content: action.payload.content,
        isNull: false,
      };
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        isNull: false,
      };
    case 'SET_VALIDATION_ERROR':
      return { ...state, isNull: true };
    case 'RESET':
      return initialEditState;
    default:
      return state;
  }
}

// 컴포넌트
function MemoList({
  memoInfo,
  deleteMemoSync,
  updateMemoSync,
  fetchMemos,
}: MemoListProps) {
  const [editState, dispatchEdit] = useReducer(editReducer, initialEditState);
  const inputRef = useRef<HTMLInputElement>(null);
  // const [page, setPage] = useState<number>(1); // 이 state 매번 1씩 증감
  // const [startIdex, setStartIdex] = useState<number>(0); // page state가 증감 될 때 마다 +-4 증감

  console.log(
    '(아마 페이지 정보가 없을듯)app에서 props로 받은 데이터:',
    memoInfo,
  );

  const isEditing = editState.memoId !== null;

  const handleKeyDown = (e: React.KeyboardEvent, memo: Memo) => {
    if (e.key === 'Enter') {
      handleUpdate(memo);
    } else if (e.key === 'Escape') {
      dispatchEdit({ type: 'RESET' });
    }
  };

  useEffect(() => {
    console.log('리렌더링');
  });

  const handleUpdate = (memoInfo: Memo) => {
    const updateInfo: Memo = {
      ...memoInfo,
      title: editState.title,
      content: editState.content,
    };
    // 수정 이전 값과 수정 값이 같으면 서버에 요청을 보내지 않고 수정 모드 종료
    // updateInfo.title.trim()은 수정 값, memoInfo.title.trim()은 이전 값
    if (
      updateInfo.title.trim() === memoInfo.title.trim() &&
      updateInfo.content.trim() === memoInfo.content.trim()
    ) {
      dispatchEdit({ type: 'RESET' });
      return;
    } else if (
      // 수정 값이 비어있으면 에러 메시지 띄우고 서버에 요청을 보내지 않음
      updateInfo.title.trim() === '' ||
      updateInfo.content.trim() === ''
    ) {
      dispatchEdit({ type: 'SET_VALIDATION_ERROR' });
      return;
    } else {
      updateMemo(memoInfo.id, updateInfo);
      updateMemoSync(updateInfo);
      dispatchEdit({ type: 'RESET' });
    }
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return '';
    return date.replace('T', ' ').slice(0, 16);
  };

  return (
    <section className="grid gap-4">
      {memoInfo.items.map((memo) => (
        <div
          key={memo.id}
          className="bg-[#3333] p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group"
        >
          {isEditing && memo.id === editState.memoId ? (
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
                  onClick={() =>
                    dispatchEdit({ type: 'START_EDIT', payload: memo })
                  }
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
      ))}
      <Pagination memoInfo={memoInfo} fetchMemos={fetchMemos} />
    </section>
  );
}

export default MemoList;
