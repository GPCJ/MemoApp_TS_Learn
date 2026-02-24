import { useEffect } from 'react';
import {
  Header,
  MemoInput,
  SelectMemo,
  MemoList,
  Loading,
  ErrorMessage,
  EmptyMemos,
  Pagination,
} from '../components/components-index';
import { useSyncMemos } from '../hooks/useSyncMemos';
import { useSearchParams } from 'react-router-dom';

function MainPage() {
  const { state, createMemoSync, deleteMemoSync, updateMemoSync, fetchMemos } =
    useSyncMemos();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch: (currentPage: number, viewLimit: string) => void = (
    currentPage,
    viewLimit,
  ) => {
    setSearchParams({ page: currentPage.toString(), limit: viewLimit });
  };

  useEffect(() => {
    const pageUrl = Number(searchParams.get('page')) || 1;
    const limitUrl = Number(searchParams.get('limit')) || 5;
    handleSearch(pageUrl, limitUrl.toString());
  }, []);

  return (
    <>
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
      <Pagination
        memoInfo={state.memoInfo}
        fetchMemos={fetchMemos}
        setSearchParams={setSearchParams}
      />
    </>
  );
}

export default MainPage;
