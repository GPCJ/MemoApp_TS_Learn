import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', label: '메인' },
  { path: '/list', label: '목록' },
  { path: '/createMemo', label: '작성' },
];

function SideNavbar() {
  return (
    <nav
      className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 p-2 
                 bg-gray-800/90 backdrop-blur-md border border-gray-600/50
                 rounded-r-3xl shadow-xl"
      aria-label="사이드 네비게이션"
    >
      {navItems.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          className={({ isActive }) =>
            `px-4 py-3 min-w-12 text-center rounded-2xl font-medium
             transition-all duration-200 hover:scale-105
             ${
               isActive
                 ? 'bg-blue-500/80 text-white shadow-lg shadow-blue-500/30'
                 : 'bg-gray-700/60 text-gray-300 hover:bg-gray-600/80 hover:text-white'
             }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default SideNavbar;
