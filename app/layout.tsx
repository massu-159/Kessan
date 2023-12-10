import '../styles/globals.css'
import SupabaseListener from './components/supabase-listener'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Kessan',
  description:
    'Kessan is a web application for managing your personal finances.',
  icons: {
    icon: '/favicon.ico',
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={`${inter.className}`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
