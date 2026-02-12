function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center gap-3 bg-black/50 backdrop-blur-sm">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white font-medium mb-5">메모 불러오는 중...</p>
    </div>
  );
}

export default Loading;
