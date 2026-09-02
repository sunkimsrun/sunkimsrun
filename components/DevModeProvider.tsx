'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface DevModeContextType {
  isDevMode: boolean
  toggleDevMode: () => void
}

const DevModeContext = createContext<DevModeContextType>({
  isDevMode: false,
  toggleDevMode: () => {},
})

export function useDevMode() {
  return useContext(DevModeContext)
}

export function DevModeProvider({ children }: { children: ReactNode }) {
  const [isDevMode, setIsDevMode] = useState<boolean>(false)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-dev-mode')
    if (saved === 'true') {
      setIsDevMode(true)
    }
  }, [])

  const toggleDevMode = () => {
    setIsDevMode((prev) => {
      const next = !prev
      localStorage.setItem('portfolio-dev-mode', String(next))
      return next
    })
  }

  return (
    <DevModeContext.Provider value={{ isDevMode, toggleDevMode }}>
      {children}
    </DevModeContext.Provider>
  )
}
