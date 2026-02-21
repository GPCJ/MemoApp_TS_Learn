import {
  Header,
  MemoInput,
  SelectMemo,
  MemoList,
  Loading,
  ErrorMessage,
  EmptyMemos,
  Pagination,
} from './components/components-index';
import { useSyncMemos } from './hooks/useSyncMemos';
import './App.css';
import { createContext } from 'react';

export const Context = createContext<
  { deleteMemoSync: (id: number) => void } | undefined
>(undefined);

const MemoMain = () => {
  const { state, createMemoSync, deleteMemoSync, updateMemoSync, fetchMemos } =
    useSyncMemos();

  return (
    <div className="min-h-screen bg-[#2222] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Header />
        <MemoInput createMemoSync={createMemoSync} />
        <SelectMemo fetchMemos={fetchMemos} />

        {state.isLoading && <Loading />}
        {state.isError && <ErrorMessage fetchMemos={fetchMemos} />}
        {state.isEmpty && <EmptyMemos />}

        <MemoList
          memoInfo={state.memoInfo}
          deleteMemoSync={deleteMemoSync}
          updateMemoSync={updateMemoSync}
        />

        <Pagination memoInfo={state.memoInfo} fetchMemos={fetchMemos} />
      </div>
    </div>
  );
};

export default MemoMain;
