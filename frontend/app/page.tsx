import ChatContainer from '@/components/ChatContainer'
import Sidebar from '@/components/Sidebar'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <main className="flex h-screen w-full bg-white dark:bg-[#121212]">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <ThemeToggle />
        <ChatContainer />
      </div>
    </main>
  )
}
