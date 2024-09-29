import { ParFinancialInstitutionAsset } from '../types/AssetParFinancialInstitution'
import { AssetsWithoutUsage } from '../types/AssetsWithoutUsage'
import { EachAssetPerDate } from '../types/EachAssetPerDate'


/**
 * 各日付ごとの資産合計を計算
 * @param assets 資産データ
 * @returns 各日付ごとの資産合計
 */
export const calcTotalAmountParDate = (
  assets: ParFinancialInstitutionAsset[] | null
) => {
  if (!assets) {
    return []
  }
  const totalAmountParDate: {
    date: string
    amount: number
  }[] = []

  assets.forEach((asset: ParFinancialInstitutionAsset) => {
    // 日付がない場合は計算しない
    if (!asset.date) {
      return
    }
    // 金額がない場合は0として計算する
    const validAmount = asset.amount ? asset.amount : 0

    const record = totalAmountParDate.find(
      (record) => record.date === asset.date
    )
    if (record) {
      record.amount += validAmount
    } else {
      totalAmountParDate.push({
        date: asset.date,
        amount: validAmount,
      })
    }
  })
  return totalAmountParDate
}

/**
 * 資産を日付ごとに集計
 * @param assets 資産データ
 * @returns 日付ごとの資産データ
 */
export const calcEachAssetPerDate = (assets: AssetsWithoutUsage[]) => {
  if (!assets) {
    return []
  }
  const eachAssetPerDate: Record<string, EachAssetPerDate> = {}
  assets.forEach((item: AssetsWithoutUsage) => {
    const { date, amount, FinancialInstitution } = item
    if (
      date === null ||
      amount === null ||
      FinancialInstitution === null ||
      FinancialInstitution.name === null
    ) {
      return []
    }
    if (!eachAssetPerDate[date]) {
      eachAssetPerDate[date] = { date, total: 0 }
    }
    eachAssetPerDate[date].total = (eachAssetPerDate[date].total || 0) + amount
    eachAssetPerDate[date][FinancialInstitution.name] = amount
  })
  return Object.values(eachAssetPerDate)
}

/**
 * 目標達成率を計算
 * @param goal 目標
 * @param totalAmount 資産合計
 * @returns 目標達成率
 */
export const calcTargetAchievementRate = (
  goal: number,
  totalAmount: number
) => {
  if (!goal || !totalAmount) {
    return 0
  }
  return Math.round((totalAmount / goal) * 100)
}

/**
 * 差分を計算
 * @param left 左辺
 * @param right 右辺
 * @returns 差分
 */
export const calcDifference = (left: number, right: number) => {
  return left - right
}

/**
 * 増減率を計算
 * @param left 左辺
 * @param right 右辺
 * @returns 増減率
 */
export const calcRate = (left: number, right: number) => {
  return Math.floor(((left - right) / right) * 100)
}
