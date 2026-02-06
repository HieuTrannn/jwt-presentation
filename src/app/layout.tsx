import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chapter 06 - JWT Authentication Flow | PRN232',
  description: 'Implement Security in RESTful Web Service - JWT Authentication Flow - ByteByteGo Style',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="antialiased min-h-screen bg-byte-dark text-slate-200">
        {children}
      </body>
    </html>
  )
}
