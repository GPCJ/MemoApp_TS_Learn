import { useState, useEffect } from 'react';
import { getMemos } from '../api/memos';

// CRUD 통합 동기화
export const useSyncMemos = () => {
  const [memos, setMemos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNull, setIsNull] = useState(false);

  // 메모 불러오기
  const fetchMemos = async (searchQuery) => {
    try {
      setIsLoading(true);
      const serverMemos = await getMemos(searchQuery);
      const items = serverMemos.items;
      setMemos(items);

      if (items.length === 0) {
        setIsNull(true);
      } else {
        setIsNull(false);
      }
      setIsError(false);
    } catch (error) {
      if (error.response && error.response.status === 500) setIsError(true);
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

  return {
    memos,
    isLoading,
    isError,
    isNull,
    createMemoSync,
    deleteMemoSync,
    updateMemoSync,
    fetchMemos,
  };
};
