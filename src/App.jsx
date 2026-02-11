import { useState, useEffect } from 'react';
import './App.css';
import { Header, MemoInput, MemoList } from './components';
import { useMemos } from './hooks/useMemos';

const MemoMain = () => {
  // 커스텀 hook 내부에서 상태 변화가 생기면 커스텀 hook을 사용하는 컴포넌트는 리렌더링을 진행.
  // 커스텀 hook 내부에서 상태 변화가 생기면 서버에 GET 요청을 보내 메모 정보를 불러옴
  // 이 정보를 memos에 넣어서 본 컴포넌트에 제공함
  // 서버에 실제 데이터를 삭제 요청 하는 것은 현재 각각 자식 컴포넌트에서 진행 중이고
  // 변한 값을 클라이언트에 동기화 하는 것을 커스텀 hook이 진행 중

  // 커스텀 hook에서 아래와 같은 함수와 값을 가져와서 사용할 수 있게됨
  const { memos, createMemoSync, deleteMemoSync } = useMemos();

  return (
    // 이 div 2개에 들어가 있는 tailwind 문구 해석 필요
    <div className="min-h-screen bg-[#22222] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Header />
        <MemoInput createMemoSync={createMemoSync} />
        <MemoList memos={memos} deleteMemoSync={deleteMemoSync} />
      </div>
    </div>
  );
};

export default MemoMain;
