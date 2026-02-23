import client from './client';
import type {
  Memo,
  MemoCreatePayload,
  MemoUpdatePayload,
  MemoInfo,
  MemoSearchParams,
} from '../types/memo';

// 목록 조회 / 에러 파라미터( fail: '1' )
export const getMemos = async (
  params: MemoSearchParams = { limit: 5 },
): Promise<MemoInfo> => {
  const response = await client.get<MemoInfo>('/memos', { params });
  return response.data;
};

// 생성
export const createMemo = async (payload: MemoCreatePayload): Promise<Memo> => {
  const response = await client.post<Memo>('/memos', payload);
  return response.data;
};

// 수정
export const updateMemo = async (
  id: number,
  payload: MemoUpdatePayload | Partial<Memo>,
): Promise<void> => {
  console.log(payload);
  await client.patch(`/memos/${id}`, payload);
};

// 삭제
export const deleteMemo = async (id: number): Promise<void> => {
  await client.delete(`/memos/${id}`);
};
