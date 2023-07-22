import '../styles/globals.css'
import SupabaseListener from './components/supabase-listener'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Kessan',
  description:
    'Kessan is a web application for managing your personal finances.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={`${inter.className}`}>
        <div className='flex'>
          <div className='flex-[1_1_22%] max-w-[16rem]'>
            <SupabaseListener />
          </div>
          <main className='flex-[1_1_78%] bg-[#f4fcfc] h-screen'>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
