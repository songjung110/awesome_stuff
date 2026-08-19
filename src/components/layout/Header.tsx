export default function Header() {
  return (
    <header className="bg-white border-b h-16 flex items-center px-4 shadow-sm sticky top-0 left-0 right-0 z-20">
      <div className="flex items-center gap-3">
        <svg className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
        </svg>
        <span className="text-lg font-semibold">덕질 트렌드 대시보드</span>
      </div>

      <div className="ml-auto flex items-center gap-3">

        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-700">
          정
        </div>
      </div>
    </header>
  )
}
