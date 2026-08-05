interface LnbProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Lnb({ collapsed, onToggle }: LnbProps) {
  return (
    <aside
      className={`fixed top-16 left-0 bottom-0 z-10 bg-white border-r transition-all duration-200 ease-in-out overflow-hidden ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      aria-hidden={collapsed}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <span className={`font-medium text-sm ${collapsed ? 'hidden' : 'block'}`}>메뉴</span>
          <button
            onClick={onToggle}
            aria-label="사이드바 토글"
            className="p-1 rounded hover:bg-gray-100"
          >
            {collapsed ? '▶' : '◀'}
          </button>
        </div>

        <nav className="p-3 overflow-auto">
          <ul className="space-y-2">
            <li>
              <a className="flex items-center gap-2 rounded px-2 py-2 hover:bg-gray-50" href="#">
                <span className="inline-block w-4">🏠</span>
                <span className={`${collapsed ? 'hidden' : 'inline'}`}>대시보드</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 rounded px-2 py-2 hover:bg-gray-50" href="#">
                <span className="inline-block w-4">⭐</span>
                <span className={`${collapsed ? 'hidden' : 'inline'}`}>좋아요 분석</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}
