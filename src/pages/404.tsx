interface NotFoundProps {}

function NotFound({}: NotFoundProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <span className="text-8xl font-bold text-white/10 select-none mb-4">404</span>
      <h1 className="text-2xl font-semibold text-white mb-2">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="text-gray-400 text-sm mb-8 max-w-xs">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/40 hover:bg-blue-500/30 hover:border-blue-500/60 transition-colors duration-200"
      >
        메인 페이지로 돌아가기
      </a>
    </div>
  );
}

export default NotFound;
