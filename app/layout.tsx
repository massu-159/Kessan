import '../styles/globals.css'
import SupabaseListener from './components/supabase-listener'
import {Inter} from "next/font/google"
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Kessan',
  description:
    'Kessan is a web application for managing your personal finances.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={`${inter.className} bg-cyan-50`}>
        <div className='flex'>
          <SupabaseListener />
          <main className='flex-initial'>{children}</main>
        </div>
      </body>
    </html>
  )
}
