'use client'

import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

export default function ChatMessage({
  role,
  content,
  timestamp,
}: {
  role: string
  content: string
  timestamp?: number
}) {
  const isUser = role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className="flex flex-col max-w-sm">
        <div
          className={`px-4 py-2 rounded-lg text-sm whitespace-pre-wrap break-words
            ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'}`}
        >
          {isUser ? (
            <span>{content}</span>
          ) : (
            <div className="prose prose-sm dark:prose-invert">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* 🕒 Timestamp */}
        {timestamp && (
          <span className="text-xs text-gray-400 mt-1 ml-1">
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </motion.div>
  )
}
