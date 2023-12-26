'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import {cookies} from 'next/headers'
import { Database } from "../../lib/database.types"
import SideBar from "./sidebar"

const SupabaseListener = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const { data: { session }, } = await supabase.auth.getSession()
  
  let profile = null
  if (session) {
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
    
    profile = currentProfile

    // メールアドレスを変更した場合、プロフィールを更新
    if (currentProfile && currentProfile.email !== session.user.email) {
      // プロフィール(メールアドレス)を更新
      const { data: updatedProfile } = await supabase
        .from('profiles')
        .update({ email: session.user.email })
        .match({ id: session.user.id })
        .select('*')
        .single()
      
      profile = updatedProfile
    }
  }
  return (
      <SideBar session={session} profile={profile} />
  )
}

export default SupabaseListener