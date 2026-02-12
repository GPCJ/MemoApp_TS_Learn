import { useState, useEffect } from 'react';
import { getMemos } from '../api/memos';

// CRUD 통합 동기화
export const useSyncMemos = () => {
  const [memos, setMemos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 메모 불러오기
  const fetchMemos = async () => {
    setIsLoading(true);
    try {
      const memos = await getMemos();
      setMemos(memos.items);
    } catch (error) {
      console.error('로딩 실패!', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  // 메모 추가 동기화
  const createMemoSync = (newMemo) => setMemos((prev) => [newMemo, ...prev]);

  // 메모 삭제 동기화
  const deleteMemoSync = (id) =>
    setMemos((prev) => prev.filter((m) => m.id !== id));

  // 메모 수정 동기화
  const updateMemoSync = (memo) =>
    setMemos((prev) => prev.map((m) => (m.id === memo.id ? memo : m)));

  return { memos, isLoading, createMemoSync, deleteMemoSync, updateMemoSync };
};
