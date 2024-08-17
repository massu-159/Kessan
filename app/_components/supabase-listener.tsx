'use server'

import SideBar from "./sidebar"
import { createClient } from "../../utils/supabase/server"

const SupabaseListener = async () => {
  const supabase = createClient()
  
  const { data: { user }, } = await supabase.auth.getUser()
  
  let profile = null
  if (user) {
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    
    profile = currentProfile

    // メールアドレスを変更した場合、プロフィールを更新
    if (currentProfile && currentProfile.email !== user.email) {
      // プロフィール(メールアドレス)を更新
      const { data: updatedProfile } = await supabase
        .from('profiles')
        .update({ email: user.email })
        .match({ id: user.id })
        .select('*')
        .single()
      
      profile = updatedProfile
    }
  }
  return (
      <SideBar user={user} profile={profile} />
  )
}

export default SupabaseListener