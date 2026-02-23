interface NotFoundProps {}

function NotFound({}: NotFoundProps) {
  return (
    <div className="text-white">
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <a href="/" className="text-blue-400">
        메인 페이지로
      </a>
    </div>
  );
}

export default NotFound;
