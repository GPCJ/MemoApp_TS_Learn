import { deleteMemo } from '../api/memos';

function MemoList({ memos, deleteMemoSync }) {
  return (
    <div className="grid gap-4">
      {memos.length === 0 ? (
        <p className="text-center text-white py-10">
          아직 작성된 메모가 없어요. ✍️
        </p>
      ) : (
        memos.map((memo) => (
          <div
            key={memo.id}
            className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group"
          >
            <p className="text-gray-700 whitespace-pre-wrap pr-8">
              {memo.content}
            </p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-gray-400 font-medium">
                {`생성${memo.createdAt}`}
              </span>
              <button
                onClick={() => {
                  deleteMemo(memo.id);
                  deleteMemoSync(memo.id);
                }}
                className="text-gray-400 hover:text-red-500 transition-colors text-sm"
              >
                삭제
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default MemoList;
