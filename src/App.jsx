import { useState, useEffect } from 'react';
import './App.css';
import {
  Header,
  MemoInput,
  MemoList,
  Loading,
} from './components/components-index';
import { useMemos } from './hooks/useMemos';

const MemoMain = () => {
  const { memos, isLoading, createMemoSync, deleteMemoSync, updateMemoSync } =
    useMemos();

  return (
    <div className="min-h-screen bg-[#2222] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Header />
        <MemoInput createMemoSync={createMemoSync} />
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
