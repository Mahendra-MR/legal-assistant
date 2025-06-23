export default function TypingDots() {
  return (
    <div className="flex justify-start items-center px-4 py-2">
      <div className="flex space-x-1">
        <div className="h-2 w-2 bg-gray-500 dark:bg-gray-200 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="h-2 w-2 bg-gray-500 dark:bg-gray-200 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="h-2 w-2 bg-gray-500 dark:bg-gray-200 rounded-full animate-bounce" />
      </div>
    </div>
  )
}
