import 'server-only'

import { createClient } from '../../../utils/supabase/server'
import { AssetsWithoutUsage } from '../../_common/types/AssetsWithoutUsage'
import { AssetParFinancialInstitution } from '../../_common/types/AssetParFinancialInstitution'

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

/**
 * 金融機関ごとの資産を取得
 * @param userId ユーザーID
 */
export async function getAssetPerFinancialInstitution(userId: string) {
  const supabase = createClient()
  // 金融機関ごとの資産を取得
    const { data: AssetParFinancialInstitution, error } = await supabase
      .from('FinancialInstitution')
      .select(`name, usage, Asset!inner(date, amount)`)
      .eq('user_id', userId)
      .order('date', {
        referencedTable: 'Asset',
        ascending: false,
      })
    .returns<AssetParFinancialInstitution[]>()

  if (error) {
    console.error('エラー', error)
    return []
  }

  return AssetParFinancialInstitution
}
