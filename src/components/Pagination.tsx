import type { MemoInfo } from '../types/memo';

interface PaginationProps {
  memoInfo: MemoInfo;
  fetchMemos: (params: { page: number; limit?: 5 }) => void;
}

function Pagination({ memoInfo, fetchMemos }: PaginationProps) {
  const handlePageChange = (targetPage: number) => {
    fetchMemos({ page: targetPage });
  };

  return (
    <nav
      className="flex justify-center items-center space-x-1 mt-8"
      aria-label="Pagination"
    >
      {/* 이전 버튼 */}
      <a
        href="#"
        onClick={() => handlePageChange(memoInfo.page - 1)}
        className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors"
      >
        <span className="sr-only">Previous</span>
        &laquo;
      </a>

      {/* 현재 페이지 (Active) */}
      <a
        href="#"
        className="px-4 py-2 rounded-md border border-indigo-600 bg-indigo-600 text-white font-bold"
      >
        {memoInfo.page}
      </a>

      {/* 다음 버튼 */}
      <a
        href="#"
        onClick={() => handlePageChange(memoInfo.page + 1)}
        className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors"
      >
        <span className="sr-only">Next</span>
        &raquo;
      </a>
    </nav>
  );
}

export default Pagination;
