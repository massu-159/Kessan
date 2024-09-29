import 'server-only'

import { createClient } from "../../../utils/supabase/server";
import { FinancialInstitution } from "../../_common/types/FinancialInstitution";

/**
 * 金融機関を取得
 * @param userId ユーザーID
 */
export async function getFinancialInstitution(userId: string) {
  const supabase = createClient()
  const { data: FinancialInstitution, error } = await supabase
    .from('FinancialInstitution')
    .select(`name, usage`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .returns<FinancialInstitution[]>()

  if (error) {
    console.error('エラー', error)
    return []
  }

  return FinancialInstitution
}
