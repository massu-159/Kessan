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
          <div>ようこそ、Aさん</div>
          <button>ログアウト</button>
        </div>
      )}
      {!session && (
        <div>
          <div>ようこそ、ゲストさん</div>
          <button>ログイン</button>
        </div>
      )}
    </div>
  )
}

export default Home