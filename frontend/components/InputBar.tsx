'use client'

import { useState } from 'react'
import { useChat } from '@/lib/useChat'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

export default function InputBar({ onSend }: { onSend: (q: string) => void }) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!input.trim()) return
    setLoading(true)
    await onSend(input)
    setInput('')
    setLoading(false)
  }

  return (
    <div className="bg-white dark:bg-[#1e1e1e] px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
      {/* ⬅️ Add-ons placeholder */}
      <div className="flex gap-3 text-gray-500 dark:text-gray-400">
        <button disabled className="text-xl">＋</button>
        <button disabled className="text-xl">⚙</button>
      </div>

      {/* 💬 Input */}
      <input
        type="text"
        placeholder="Ask anything"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        className="flex-1 outline-none bg-transparent text-sm px-3 py-2 rounded-md text-gray-900 dark:text-white placeholder-gray-400"
      />

      {/* 🎤 + Submit */}
      <div className="flex items-center gap-2">
        <button disabled className="text-xl text-gray-500 dark:text-gray-400">🎤</button>
        <button
          onClick={handleSubmit}
          className="rounded-full bg-blue-600 hover:bg-blue-700 text-white w-9 h-9 flex items-center justify-center"
        >
          {loading ? (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <PaperPlaneIcon className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  )
}
