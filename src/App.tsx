import { useState } from 'react'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <BrowserRouter>
      {/* 네비게이션 */}
      <nav>
        <Link to="/">홈</Link> | <Link to="/about">소개</Link>
      </nav>

      {/* 라우트 정의 */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="*" element={<NotFound />} /> 없는 경로 처리 */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
