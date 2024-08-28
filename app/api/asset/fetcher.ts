import 'server-only'

import { createClient } from '../../../utils/supabase/server'
import { AssetsWithoutUsage } from '../../_common/types/AssetsWithoutUsage'

/**
 * 資産を取得
 * @param userId ユーザーID
 */
export async function getAssetPerDate(userId: string) {
  const supabase = createClient()
  // 資産を取得
  const { data: assetParDate, error } = await supabase
    .from('Asset')
    .select(`date, amount, FinancialInstitution!inner(name)`)
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .returns<AssetsWithoutUsage[]>()

  if (error) {
    console.error('エラー', error)
    return []
  }

  return assetParDate
}
