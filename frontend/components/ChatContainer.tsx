'use client'

import { useEffect, useRef } from 'react'
import { useChat } from '@/lib/useChat'
import ChatMessage from './ChatMessage'
import InputBar from './InputBar'
import TypingDots from './TypingDots'

export default function ChatContainer() {
  const { messages, sendMessage, isTyping } = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* 🟦 Show new chat hint */}
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-12">
            Start a new chat by asking your legal question 👇
          </div>
        )}

        {/* 💬 Messages */}
        {messages.map((msg, idx) => (
          <ChatMessage
            key={idx}
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp}
          />
        ))}

        {/* ⏳ Typing dots */}
        {isTyping && <TypingDots />}

        <div ref={scrollRef} />
      </div>

      <InputBar onSend={sendMessage} />
    </div>
  )
}
