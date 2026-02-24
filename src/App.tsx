import NotFound from './pages/404';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ListPage from './pages/ListPage';
import { SideNavbar, MemoInput } from './components/components-index';
import { useSyncMemos } from './hooks/useSyncMemos';

const MemoMain = () => {
  const { createMemoSync } = useSyncMemos();
  return (
    <div className="min-h-screen bg-[#2222] py-10 px-4">
      <SideNavbar />
      <div className="max-w-2xl mx-auto pl-14">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route
            path="/createMemo"
            element={<MemoInput createMemoSync={createMemoSync} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default MemoMain;
