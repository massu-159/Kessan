export type AssetParFinancialInstitution = {
  name: string | null
  usage: string | null
  Asset: ParFinancialInstitutionAsset[]
}

export type ParFinancialInstitutionAsset = {
  date: string | null
  amount: number | null
}