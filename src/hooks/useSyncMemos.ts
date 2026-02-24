import { useReducer, useEffect, useCallback } from 'react';
import { getMemos } from '../api/memos';
import type {
  Memo,
  MemoSearchParams,
  MemosAction,
  MemosState,
} from '../types/memo';

const initialState: MemosState = {
  memoInfo: { items: [], page: 1, limit: 5, total: 0, totalPages: 1 },
  isLoading: false,
  isError: false,
  isEmpty: false,
};

function memosReducer(state: MemosState, action: MemosAction): MemosState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true };
    case 'FETCH_SUCCESS': {
      const getMemoInfo = action.payload;
      return {
        ...state,
        memoInfo: getMemoInfo,
        isError: false,
        // 불러오기를 성공하면 조건식이 True가 되면 불러온 메모가 없는거니까 에러 메시지 띄우고 flase면 isEmpty를 false로 초기화
        isEmpty: getMemoInfo.items.length === 0,
      };
    }
    case 'FETCH_ERROR':
      return { ...state, isError: true };
    case 'FETCH_END':
      return { ...state, isLoading: false };
    case 'CREATE_MEMO':
      return {
        ...state,
        memoInfo: {
          ...state.memoInfo,
          items: [action.payload, ...state.memoInfo.items],
        },
        isEmpty: false,
      };
    case 'DELETE_MEMO':
      return {
        ...state, // 상태 전체 복사
        memoInfo: {
          ...state.memoInfo, // memoInfo 키 value 복사사
          items: [
            // memoInfo 키의 value중 items 키를 복사(items 키의 value는 배열)
            ...state.memoInfo.items.filter((m) => m.id !== action.payload),
          ],
        },
        isEmpty: state.memoInfo.items.length <= 1,
      };
    case 'UPDATE_MEMO':
      return {
        ...state,
        memoInfo: {
          ...state.memoInfo,
          items: [
            ...state.memoInfo.items.map((m) =>
              m.id === action.payload.id ? action.payload : m,
            ),
          ],
        },
      };
    default:
      return state;
  }
}

export const useSyncMemos = () => {
  const [state, dispatch] = useReducer(memosReducer, initialState);

  const fetchMemos = useCallback(async (params?: MemoSearchParams) => {
    try {
      dispatch({ type: 'FETCH_START' });
      const serverMemos = await getMemos(params);
      const items = serverMemos;
      console.log('따끈따끈 데이터:', items);
      dispatch({ type: 'FETCH_SUCCESS', payload: items });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR' });
    } finally {
      setTimeout(() => dispatch({ type: 'FETCH_END' }), 500);
    }
  }, []);

  useEffect(() => {
    fetchMemos({ page: 1, limit: 5 });
  }, []);

  const createMemoSync = useCallback((newMemo: Memo) => {
    dispatch({ type: 'CREATE_MEMO', payload: newMemo });
  }, []);

  const deleteMemoSync = useCallback((id: number) => {
    dispatch({ type: 'DELETE_MEMO', payload: id });
  }, []);

  const updateMemoSync = useCallback((memo: Memo) => {
    dispatch({ type: 'UPDATE_MEMO', payload: memo });
  }, []);

  return {
    state, // state를 반환 하는 이유 : 메인 컴포넌트에서 state에 담긴 상태 UI boolean 값으로 UI ON/OFF를 판단해야 하기 때문에
    createMemoSync,
    deleteMemoSync,
    updateMemoSync,
    fetchMemos,
  };
};
