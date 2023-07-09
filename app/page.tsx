import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../lib/database.types"
import {cookies} from 'next/headers'

const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  const {data: {session},} = await supabase.auth.getSession()
  return (
    <div>
      {session && (
        <div>
          <div>ようこそ</div>
          <div>ログイン済みです。</div>
        </div>
      )}
      {!session && (
        <div>
          <div>ようこそ、ゲストさん</div>
        </div>
      )}
    </div>
  )
}

export default Home