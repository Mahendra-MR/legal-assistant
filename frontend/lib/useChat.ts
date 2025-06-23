'use client'

import { useEffect, useState } from 'react'

type Message = {
  role: 'user' | 'assistant'
  content: string
  timestamp?: number
}

type ChatSession = {
  id: string
  title: string
  messages: Message[]
}

export const useChat = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)

  // Load chat sessions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chat_sessions')
    if (saved) {
      const parsed = JSON.parse(saved) as ChatSession[]
      setSessions(parsed)
      setCurrentSessionId(parsed[0]?.id ?? '')
    }
  }, [])

  // Save sessions to localStorage on change
  useEffect(() => {
    localStorage.setItem('chat_sessions', JSON.stringify(sessions))
  }, [sessions])

  // Get current session's messages
  const getCurrentMessages = (): Message[] =>
    sessions.find(s => s.id === currentSessionId)?.messages || []

  // Send message with token-by-token simulated streaming
  const sendMessage = async (question: string) => {
    const userMsg: Message = {
      role: 'user',
      content: question,
      timestamp: Date.now(),
    }

    setIsTyping(true)

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    })

    const data = await res.json()
    const fullAnswer = data.answer
    const tokens = fullAnswer.split(' ')

    // Add user message and assistant placeholder
    setSessions(prev =>
      prev.map(session =>
        session.id === currentSessionId
          ? {
              ...session,
              messages: [
                ...session.messages,
                userMsg,
                { role: 'assistant', content: '', timestamp: Date.now() },
              ],
            }
          : session
      )
    )

    // Simulate token-by-token streaming
    for (let i = 0; i < tokens.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 40))

      setSessions(prev =>
        prev.map(session => {
          if (session.id !== currentSessionId) return session
          const messages = [...session.messages]
          const assistantMsg = messages[messages.length - 1]
          assistantMsg.content += (i === 0 ? '' : ' ') + tokens[i]
          return { ...session, messages }
        })
      )
    }

    setIsTyping(false)
  }

  const createNewSession = (title: string) => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: title || 'Untitled Chat',
      messages: [],
    }
    setSessions(prev => [newSession, ...prev])
    setCurrentSessionId(newSession.id)
  }

  const selectSession = (id: string) => setCurrentSessionId(id)

  const regenerateLast = async () => {
    const session = sessions.find(s => s.id === currentSessionId)
    if (!session) return

    const lastQuestion = [...session.messages]
      .reverse()
      .find(m => m.role === 'user')?.content

    if (lastQuestion) {
      sendMessage(lastQuestion)
    }
  }

  return {
    sessions,
    currentSessionId,
    messages: getCurrentMessages(),
    sendMessage,
    createNewSession,
    selectSession,
    setSessions,
    setCurrentSessionId, 
    isTyping,
    regenerateLast,
  }
}
