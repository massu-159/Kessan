import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../lib/database.types"
import {cookies} from 'next/headers'
import LoginPage from "./auth/login/page"
import Dashboard from "./components/dashboard"

const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  const {data: {session},} = await supabase.auth.getSession()
  return (
    <div className="">
      {session && (
        <Dashboard></Dashboard>
      )}
      {!session && (
          <LoginPage></LoginPage>
      )}
    </div>
  )
}

export default Home