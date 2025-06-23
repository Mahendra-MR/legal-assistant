'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <button
      className="absolute top-4 right-4 text-sm px-3 py-1 border rounded"
      onClick={() => setDark(!dark)}
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
