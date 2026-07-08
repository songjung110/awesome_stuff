import './App.scss'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import About from './pages/about.tsx'

function App() {

  return (
    <>

    <BrowserRouter>
      {/* 네비게이션 */}
      <nav className="nav" >
        <Link className="nav__item" to="/">HOME</Link>
        <Link className="nav__item" to="/about">ABOUT ME</Link>
        <Link className="nav__item" to="/history">WORK HISTORY</Link>
      </nav>

      {/* 라우트 정의 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/history" element={<History />} /> */}
        {/* <Route path="*" element={<NotFound />} /> 없는 경로 처리 */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
