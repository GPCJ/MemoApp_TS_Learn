import { useReducer, useEffect, useCallback } from 'react';
import { getMemos } from '../api/memos';
import type { Memo, MemoInfo, MemoSearchParams } from '../types/memo';

interface MemosState {
  memoInfo: MemoInfo;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
}

type MemosAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: MemoInfo }
  | { type: 'FETCH_ERROR' }
  | { type: 'FETCH_END' }
  | { type: 'CREATE_MEMO'; payload: MemoInfo } // 추가, 수정 메모 갱신 할 때도 페이지 정보 받아야 하나?
  | { type: 'DELETE_MEMO'; payload: number }
  | { type: 'UPDATE_MEMO'; payload: MemoInfo };

const initialState: MemosState = {
  memoInfo: { items: [], page: 1, limit: 5, total: 0, totalPages: 1 }, // MemoInfo의 형식에 맞는 초기값을 설정해야함
  isLoading: false,
  isError: false,
  isEmpty: false,
};

function memosReducer(state: MemosState, action: MemosAction): MemosState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true };
    case 'FETCH_SUCCESS': {
      const memoInfo = action.payload;
      return {
        ...state,
        memoInfo: memoInfo,
        isError: false,
        // 와 이거 좋다 불러오기를 성공하면 조건식이 True가 되면 불러온 메모가 없는거니까 에러 메시지 띄우고 flase면 isEmpty를 false로 초기화
        isEmpty: memoInfo.items.length === 0,
      };
    }
    case 'FETCH_ERROR':
      return { ...state, isError: true };
    case 'FETCH_END':
      return { ...state, isLoading: false };

    // 이 밑에 있는 로직 들은 그냥 memos에 메서드를 돌리는 것이 아니라 이제 memos의 items key를 기준으로 메서드를 돌려야함
    case 'CREATE_MEMO':
      return {
        ...state,
        memoInfo: [action.payload.items, ...state.memoInfo.items],
        isEmpty: false,
      };
    case 'DELETE_MEMO':
      return {
        ...state,
        memoInfo: state.memoInfo.items.filter((m) => m.id !== action.payload),
        isEmpty: state.memoInfo.items.length <= 1,
      };
    case 'UPDATE_MEMO':
      return {
        ...state,
        memoInfo: state.memoInfo.items.map((m) =>
          m.id === action.payload.id ? action.payload : m,
        ),
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
    fetchMemos();
  }, []);

  const createMemoSync = useCallback((newMemo: MemoInfo) => {
    dispatch({ type: 'CREATE_MEMO', payload: newMemo });
  }, []);

  const deleteMemoSync = useCallback((id: number) => {
    dispatch({ type: 'DELETE_MEMO', payload: id });
  }, []);

  const updateMemoSync = useCallback((memo: Memo) => {
    dispatch({ type: 'UPDATE_MEMO', payload: memo });
  }, []);

  return {
    memos = state.memos,
    state, // state를 반환 하는 이유 : 메인 컴포넌트에서 state에 담긴 상태 UI boolean 값으로 UI ON/OFF를 판단해야 하기 때문에
    createMemoSync,
    deleteMemoSync,
    updateMemoSync,
    fetchMemos,
  };
};
