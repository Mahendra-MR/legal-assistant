import html2pdf from 'html2pdf.js'
import { useRef } from 'react'

export default function ExportChat({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)

  const exportToPDF = () => {
    if (ref.current) {
      html2pdf().from(ref.current).save('chat.pdf')
    }
  }

  return (
    <>
      <div ref={ref}>{children}</div>
      <button onClick={exportToPDF} className="text-sm px-3 py-1 bg-blue-600 text-white rounded mt-2">
        🧾 Export as PDF
      </button>
    </>
  )
}
