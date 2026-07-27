import React, { useState, useEffect } from 'react'
import Header from './Header'
import Lnb from './Lnb'
import './Layout.scss'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      const v = localStorage.getItem('lnb.collapsed')
      return v === 'true'
    } catch (e) {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('lnb.collapsed', String(collapsed))
    } catch (e) {
      // ignore
    }
  }, [collapsed])

  return (
    <div className="app-layout">
      <Header />
      <Lnb collapsed={collapsed} onToggle={() => setCollapsed((s) => !s)} />

      <main className={`app-layout__content ${collapsed ? 'lnb-collapsed' : ''}`}>
        {children}
      </main>
    </div>
  )
}
