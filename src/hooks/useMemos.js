import { useState, useEffect } from 'react';
import { getMemos } from '../api/memos';

// CRUD 통합 동기화
export const useMemos = () => {
  const [memos, setMemos] = useState([]);

  // 기존 메모 최초 불러오기
  const fetchMemos = async () => {
    // 로딩 컴포넌트 켜기
    // setLoading(true);
    try {
      const memos = await getMemos();
      setMemos(memos.items);
    } catch (error) {
      console.error('로딩 실패!', error);
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

  return { memos, createMemoSync, deleteMemoSync, updateMemoSync };
};
