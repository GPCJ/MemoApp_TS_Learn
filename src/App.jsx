import { useState, useEffect } from 'react';
import './App.css';
import {
  Header,
  MemoInput,
  MemoList,
  Loading,
} from './components/components-index';
import { useSyncMemos } from './hooks/useSyncMemos';

const MemoMain = () => {
  const { memos, isLoading, createMemoSync, deleteMemoSync, updateMemoSync } =
    useSyncMemos();

  return (
    <div className="min-h-screen bg-[#2222] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Header />
        <MemoInput createMemoSync={createMemoSync} />
        {/* 만약 isLoading이 true면 로딩 UI 컴포넌트 렌더링 */}
        {isLoading && <Loading />}
        <MemoList
          memos={memos}
          deleteMemoSync={deleteMemoSync}
          updateMemoSync={updateMemoSync}
        />
      </div>
    </div>
  );
};

export default MemoMain;
