'use client'

import { useChat } from '@/lib/useChat'
import { useEffect, useState } from 'react'

export default function Sidebar() {
  const {
    sessions,
    createNewSession,
    selectSession,
    currentSessionId,
    setSessions,
    setCurrentSessionId,
  } = useChat()

  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(true)
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)
  const [dropdownPosition, setDropdownPosition] = useState<{ x: number; y: number } | null>(null)
  const [menuSession, setMenuSession] = useState<{ id: string; title: string } | null>(null)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setOpen(!mobile)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => setOpen(prev => !prev)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.dropdown-container')) {
        setMenuOpenId(null)
        setDropdownPosition(null)
        setMenuSession(null)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const handleRename = (sessionId: string, currentTitle: string) => {
    const newTitle = prompt('Rename this chat:', currentTitle)
    if (newTitle && newTitle.trim()) {
      const trimmedTitle = newTitle.trim()
      const updatedSessions = sessions.map(s =>
        s.id === sessionId ? { ...s, title: trimmedTitle } : s
      )
      setSessions(updatedSessions)
      localStorage.setItem('chat_sessions', JSON.stringify(updatedSessions))
    }
    setMenuOpenId(null)
    setDropdownPosition(null)
    setMenuSession(null)
  }

  const handleDelete = (sessionId: string) => {
    if (confirm('Are you sure you want to delete this chat?')) {
      const updatedSessions = sessions.filter(s => s.id !== sessionId)
      setSessions(updatedSessions)
      localStorage.setItem('chat_sessions', JSON.stringify(updatedSessions))

      if (currentSessionId === sessionId) {
        setCurrentSessionId(updatedSessions[0]?.id || '')
      }

      setMenuOpenId(null)
      setDropdownPosition(null)
      setMenuSession(null)
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 text-xl bg-gray-60 dark:bg-gray-800 rounded shadow-md"
        >
          ☰
        </button>
      )}

      <aside
        className={`fixed md:relative top-0 left-0 h-full w-64 z-40 bg-gray-100 dark:bg-[#1e1e1e] text-gray-900 dark:text-white transition-transform duration-300 transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {open && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 z-50 text-xl px-3 py-1 rounded shadow bg-gray-60 dark:bg-[#1e1e1e]"
          >
            ×
          </button>
        )}

        <div className="relative mt-16 md:mt-0 px-4 py-6 space-y-4 h-full overflow-y-auto">
          <h2 className="text-xl font-semibold">Legal Assistant</h2>

          <button
            onClick={() => createNewSession('')}
            className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + New Chat
          </button>

          <div className="text-sm mt-4">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Recent Chats</p>
            <ul className="space-y-2 relative z-50">
              {sessions.map(session => (
                <li
                  key={session.id}
                  className={`relative px-3 py-2 rounded flex justify-between items-center cursor-pointer transition truncate ${
                    currentSessionId === session.id
                      ? 'bg-blue-200 dark:bg-blue-700 text-blue-900 dark:text-white'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => selectSession(session.id)}
                >
                  <span className="truncate pr-6">
                    {session.title?.trim() || 'Untitled Chat'}
                  </span>

                  <div className="dropdown-container relative">
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        const rect = (e.target as HTMLElement).getBoundingClientRect()

                        if (menuOpenId === session.id) {
                          setMenuOpenId(null)
                          setDropdownPosition(null)
                          setMenuSession(null)
                        } else {
                          setDropdownPosition({ x: rect.right, y: rect.bottom })
                          setMenuOpenId(session.id)
                          setMenuSession({ id: session.id, title: session.title })
                        }
                      }}
                      className="text-lg font-bold px-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      ⋯
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {menuOpenId && dropdownPosition && menuSession && (
        <div
          className="fixed bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-[9999] flex flex-col w-40"
          style={{
            left: `${dropdownPosition.x - 130}px`,
            top: `${dropdownPosition.y + 1}px`,
          }}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={() => handleRename(menuSession.id, menuSession.title)}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Rename
          </button>
          <button
            onClick={() => handleDelete(menuSession.id)}
            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Delete
          </button>
        </div>
      )}
    </>
  )
}
