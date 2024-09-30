import 'server-only'

import { createClient } from "../../../utils/supabase/server"

/**
 * 目標を取得
 * @param userId ユーザーID
 */
export async function getGoal(userId: string) {
  const supabase = createClient()
  const { data: goal, error } = await supabase
    .from('Goal')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error("エラー", error)
    return {}
  }
  return goal
}
