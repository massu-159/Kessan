import AssetsTable from './sections/total-table'
import AssetCumulativeRateCard from './sections/asset-cumulative-rate-card'
import AssetActualVsTarget from './sections/asset-actual-vs-target'
import BannerCard from './sections/banner-card'
import AssetTotalPieChartCard from './sections/asset-total-pie-chart-card'
import AssetTotalBarChartCard from './sections/asset-total-bar-chart-card'

/**
 * 資産ダッシュボード
 */
const TotalAssetDashboard = async () => {
  return (
    <div className='grid grid-cols-8 gap-6'>
      <div className='col-span-3'>
        <AssetCumulativeRateCard />
      </div>
      <div className='col-span-3'>
        <AssetActualVsTarget />
      </div>
      <div className='col-span-2 relative'>
        <BannerCard />
      </div>
      <div className='col-span-3 pb-2'>
        <AssetTotalPieChartCard />
      </div>
      <div className='col-span-5 pb-2'>
        <AssetTotalBarChartCard />
      </div>
      <div className='col-span-8'>
        <AssetsTable />
      </div>
    </div>
  )
}

export default TotalAssetDashboard
