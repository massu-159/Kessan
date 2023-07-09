import SupabaseListener from './components/supabase-listener'
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
      <body>
        <SupabaseListener></SupabaseListener>
        <main>{children}</main>
        <footer>
          <div>
            copyright ©︎ ALL rights reserved. Kessan
          </div>
        </footer>
      </body>
    </html>
  )
}
