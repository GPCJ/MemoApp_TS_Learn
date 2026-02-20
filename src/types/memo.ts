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
  limit: number;
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

export interface MemoSearchParams {
  page?: number;
  limit?: 5;
  q?: string;
  fail?: string;
}

export interface MemoPaginationContext {
  memoInfo: MemoInfo;
  fetchMemos: (params: { page: number; limit: 5 }) => void;
}
