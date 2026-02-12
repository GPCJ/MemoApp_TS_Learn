import { useState, useEffect } from 'react';
import './App.css';
// 컴포넌트 불러오기
import {
  Header,
  MemoInput,
  SelectMemo,
  MemoList,
  Loading,
  ErrorMessage,
  NullMemos,
} from './components/components-index';
import { useSyncMemos } from './hooks/useSyncMemos';

const MemoMain = () => {
  // useSyncMemos Hook 상태, 함수
  const {
    memos,
    isLoading,
    isError,
    isNull,
    createMemoSync,
    deleteMemoSync,
    updateMemoSync,
    fetchMemos,
  } = useSyncMemos();

  return (
    <div className="min-h-screen bg-[#2222] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Header />
        <MemoInput createMemoSync={createMemoSync} />
        <SelectMemo fetchMemos={fetchMemos} />

        {isLoading && <Loading />}
        {isError && <ErrorMessage fetchMemos={fetchMemos} />}
        {isNull && <NullMemos />}

        <MemoList
          isError={isError}
          memos={memos}
          deleteMemoSync={deleteMemoSync}
          updateMemoSync={updateMemoSync}
        />
      </div>
    </div>
  );
};

export default MemoMain;
