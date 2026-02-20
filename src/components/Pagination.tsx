import type { MemoInfo } from '../types/memo';

interface PaginationProps {
  memoInfo: MemoInfo;
  fetchMemos: (params: { page: number; limit: 5 }) => void;
}

function Pagination({ memoInfo, fetchMemos }: PaginationProps) {
  let currentPage = memoInfo.page;
  console.log('초기값:', currentPage);

  // 페이지네이션 핸들러
  const handlePageChange = (targetPage: number) => {
    currentPage = targetPage;
    console.log('증감값:', currentPage);
    console.log(memoInfo);
    // 유저가 더 이상 정보가 존재하지 않는 페이지로 가려는 것을 막는 로직
    // 첫 페이지 관련 조건
    if (targetPage < 1) {
      currentPage = memoInfo.page;
      return;
    }
    // 마지막 페이지 관련 조건
    if (currentPage > memoInfo.totalPages) {
      currentPage = memoInfo.totalPages;
      return;
    }

    fetchMemos({ page: targetPage, limit: 5 });
  };

  return (
    <nav
      className="flex justify-center items-center space-x-1 mt-8"
      aria-label="Pagination"
    >
      {/* 이전 버튼 */}
      <button
        title={memoInfo.page <= 1 ? '이미 첫 페이지입니다' : undefined}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`px-3 py-2 rounded-md border border-gray-300 hover:border-indigo-600 hover:bg-indigo-600 text-white transition-colors
          cursor-pointer ${memoInfo.page <= 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span>이전</span>
      </button>

      {/* 첫 페이지 바로가기 */}
      <button
        onClick={() => handlePageChange(1)}
        className="px-4 py-2 rounded-md border border-indigo-600 hover:border-indigo-600 hover:bg-indigo-600 text-white font-bold cursor-pointer"
      >
        {memoInfo.page === 1 ? '/' : 1}
      </button>

      <span className="text-white px-1">...</span>

      {/* 현재 페이지 (Active) */}
      <button className="px-4 py-2 rounded-md border border-indigo-600 bg-indigo-600 text-white font-bold">
        {memoInfo.page}
      </button>

      <span className="text-white px-1">...</span>

      {/* 마지막 페이지 바로가기 */}
      <button
        onClick={() => handlePageChange(memoInfo.totalPages)}
        className="px-4 py-2 rounded-md border border-indigo-600 hover:border-indigo-600 hover:bg-indigo-600 text-white font-bold cursor-pointer"
      >
        {memoInfo.page === memoInfo.totalPages ? '/' : memoInfo.totalPages}
      </button>

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
    </nav>
  );
}

export default Pagination;
