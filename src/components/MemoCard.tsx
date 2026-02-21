import { useReducer, useEffect } from 'react';
import { updateMemo } from '../api/memos';
import type { Memo, MemoInfo, EditAction, EditState } from '../types/memo';
import { MemoView, MemoEdit } from './components-index';

interface MemoListProps {
  memoInfo: MemoInfo;
  deleteMemoSync: (id: number) => void;
  updateMemoSync: (memo: Memo) => void;
}

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
function MemoList({ memoInfo, deleteMemoSync, updateMemoSync }: MemoListProps) {
  const [editState, dispatchEdit] = useReducer(editReducer, initialEditState);
  const isEditing = editState.memoId !== null;

  const handleKeyDown = (e: React.KeyboardEvent, memo: Memo) => {
    if (e.key === 'Enter') {
      handleUpdate(memo);
    } else if (e.key === 'Escape') {
      dispatchEdit({ type: 'RESET' });
    }
  };

  useEffect(() => {
    console.log('메모 리렌더링');
  });

  // 수정 모드 컴포넌트에 필요
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

  return (
    <section className="grid gap-4">
      {memoInfo.items.slice(0, 5).map((memo) => (
        <div
          key={memo.id}
          className="bg-[#3333] p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group"
        >
          {isEditing && memo.id === editState.memoId ? (
            <MemoEdit
              memo={memo}
              dispatchEdit={dispatchEdit}
              deleteMemoSync={deleteMemoSync}
              editState={editState}
              handleKeyDown={handleKeyDown}
              handleUpdate={handleUpdate}
            />
          ) : (
            <MemoView
              memo={memo}
              dispatchEdit={dispatchEdit}
              deleteMemoSync={deleteMemoSync}
            />
          )}
        </div>
      ))}
    </section>
  );
}

export default MemoList;
