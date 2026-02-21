import type { MemoInfo } from '../types/memo';

interface PaginationProps {
  memoInfo: MemoInfo;
  fetchMemos: (params: { page: number; limit: 5 }) => void;
}

function Pagination({ memoInfo, fetchMemos }: PaginationProps) {
  // 페이지네이션 핸들러
  const handlePageChange = (targetPage: number) => {
    console.log('현재 타겟값:', targetPage);
    console.log('현재 페이지값:', memoInfo.page);

    // 이미 해당 페이지에 있으면 아무것도 하지 않음
    if (targetPage < 1 || targetPage === memoInfo.page) {
      // targetPage = 1;
      return;
    }

    // 범위 밖이면 아무것도 하지 않음
    if (targetPage > memoInfo.totalPages || targetPage > memoInfo.totalPages) {
      targetPage = memoInfo.totalPages;
      return;
    }

    fetchMemos({ page: targetPage, limit: 5 });
  };

  return (
    <nav
      className="flex justify-center items-center space-x-1 mt-8 gap-1"
      aria-label="Pagination"
    >
      {/* 첫 페이지 바로가기 */}
      <button
        title={memoInfo.page <= 1 ? '이미 첫 페이지입니다' : undefined}
        onClick={() => handlePageChange(1)}
        className={`px-4 py-2 rounded-md border border-indigo-600 hover:border-indigo-600 hover:bg-indigo-600 text-white font-bold 
          cursor-pointer ${memoInfo.page <= 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {'<<'}
      </button>

      {/* 이전 버튼 */}
      <button
        title={memoInfo.page <= 1 ? '이미 첫 페이지입니다' : undefined}
        onClick={() => handlePageChange(memoInfo.page - 1)}
        className={`px-3 py-2 rounded-md border border-gray-300 hover:border-indigo-600 hover:bg-indigo-600 text-white transition-colors
          cursor-pointer ${memoInfo.page <= 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span>이전</span>
      </button>

      {/* 현재 페이지 (Active) */}
      <p className="text-sm text-gray-400 text-center mt-2 flex flex-col gap-0.5">
        <span>
          {memoInfo.page} / {memoInfo.totalPages} 페이지
        </span>
        {(memoInfo.page === 1 ||
          (memoInfo.page === memoInfo.totalPages &&
            memoInfo.totalPages > 1)) && (
          <span>{memoInfo.page === 1 ? '첫 페이지' : '마지막 페이지'}</span>
        )}
      </p>

      {/* 다음 버튼 */}
      <button
        title={
          memoInfo.page >= memoInfo.totalPages
            ? '이미 마지막 페이지입니다'
            : undefined
        }
        onClick={() => handlePageChange(memoInfo.page + 1)}
        className={`px-3 py-2 rounded-md border border-gray-300 hover:border-indigo-600 hover:bg-indigo-600 text-white transition-colors
          cursor-pointer ${memoInfo.page >= memoInfo.totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span>다음</span>
      </button>

      {/* 마지막 페이지 바로가기 */}
      <button
        title={
          memoInfo.page >= memoInfo.totalPages
            ? '이미 마지막 페이지입니다'
            : undefined
        }
        onClick={() => handlePageChange(memoInfo.totalPages)}
        className={`px-4 py-2 rounded-md border border-indigo-600 hover:border-indigo-600 hover:bg-indigo-600 text-white font-bold
          cursor-pointer ${memoInfo.page >= memoInfo.totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {'>>'}
      </button>
    </nav>
  );
}

export default Pagination;
