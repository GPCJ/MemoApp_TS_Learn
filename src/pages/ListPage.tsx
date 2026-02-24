import {
  Header,
  SelectMemo,
  MemoList,
  Loading,
  ErrorMessage,
  EmptyMemos,
  Pagination,
} from '../components/components-index';
import { useSyncMemos } from '../hooks/useSyncMemos';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

function ListPage() {
  const { state, deleteMemoSync, updateMemoSync, fetchMemos } = useSyncMemos();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ page: '1', limit: '5' });
  }, []);

  return (
    <>
      <Header />
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
        // searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </>
  );
}

export default ListPage;
