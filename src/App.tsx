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
import { Routes, Route } from 'react-router-dom';

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

        <Routes>
          <Route
            index
            element={
              <Pagination memoInfo={state.memoInfo} fetchMemos={fetchMemos} />
            }
          />
          <Route
            path="/page/1"
            element={
              <Pagination memoInfo={state.memoInfo} fetchMemos={fetchMemos} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default MemoMain;
