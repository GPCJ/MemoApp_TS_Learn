export type Memo = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export interface MemoInfo {
  items: Memo[];
  page: number;
  limit: number | string;
  total: number;
  totalPages: number;
}
export interface MemoCreatePayload {
  title: string;
  content: string;
  tags: string[];
}

export interface MemoUpdatePayload {
  title?: string;
  content?: string;
  tags?: string[];
}

export interface MemosResponse {
  items: Memo[];
  total?: number;
}

// 페이지네이션 컴포넌트 타입선언
export interface MemoPaginationContext {
  memoInfo: MemoInfo;
  fetchMemos: (params: { page: number; limit: 5 }) => void;
}

// 수정모드 컴포넌트 타입선언
export type EditAction =
  | { type: 'START_EDIT'; payload: Memo }
  | { type: 'UPDATE_FIELD'; field: 'title' | 'content'; value: string }
  | { type: 'SET_VALIDATION_ERROR' }
  | { type: 'RESET' };

export interface EditState {
  memoId: number | null;
  title: string;
  content: string;
  isNull: boolean;
}

// 동기화 훅 타입선언
export interface MemosState {
  memoInfo: MemoInfo;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
}

export type MemosAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: MemoInfo }
  | { type: 'FETCH_ERROR' }
  | { type: 'FETCH_END' }
  | { type: 'CREATE_MEMO'; payload: Memo }
  | { type: 'DELETE_MEMO'; payload: number }
  | { type: 'UPDATE_MEMO'; payload: Memo };

export interface MemoSearchParams {
  page?: number;
  limit?: number | string;
  q?: string;
  fail?: string;
}
