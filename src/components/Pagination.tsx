interface PaginationProps {
  page: number;
  // fetchMemos: (params?: { page?: number; limit?: number }) => void;
  setPage: (value: number | ((prev: number) => number)) => void;
  setStartIdex: (value: number | ((prev: number) => number)) => void;
}

function Pagination({ page, setPage, setStartIdex }: PaginationProps) {
  // 조작
  const handlePageChange = (change: string) => {
    if (change === 'back') {
      setPage((prev) => Math.max(prev - 1, 1));
      setStartIdex((prev) => Math.max(prev - 5, 0));
    } else if (change === 'front') {
      setPage((prev) => Math.max(prev - 1, 1));
      setStartIdex((prev) => Math.max(prev - 5, 0));
    }
  };

  return (
    <nav
      className="flex justify-center items-center space-x-1 mt-8"
      aria-label="Pagination"
    >
      {/* 이전 버튼 */}
      <a
        href="#"
        onClick={() => handlePageChange('back')} // 현재 페이지에 대한 정보가 필요요 / 클릭하면 로컬에서 가지고 있는 메모 배열의 0~4인덱스까지 렌더링
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
        {page}
      </a>

      {/* 다음 버튼 */}
      <a
        href="#"
        onClick={() => handlePageChange('front')}
        // 클릭하면 서버에 다음 페이지 정보 요청 -> 현재 페이지 number에 +1해서 리렌더링
        className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors"
      >
        <span className="sr-only">Next</span>
        &raquo;
      </a>
    </nav>
  );
}

export default Pagination;
