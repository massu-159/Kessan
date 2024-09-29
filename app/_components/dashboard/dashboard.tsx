import CumulativeRateCard from './sections/cumulative-rate-card'
import ActualVsTargetCard from './sections/actual-vs-target-card'
import TotalBarChartCard from './sections/total-bar-chart-card'
import BannerCard from './sections/banner-card'
import TotalPieChartCard from './sections/total-pie-chart-card'
import AccountCards from './sections/account-cards'

/**
 * ダッシュボード
 */
const Dashboard = async () => {
  return (
    <div className='grid grid-cols-8 gap-4'>
      <div className='col-span-3'>
        <CumulativeRateCard />
      </div>
      <div className='col-span-3'>
        <ActualVsTargetCard />
      </div>
      <div className='col-span-2 relative'>
        <BannerCard />
      </div>
      <div className='col-span-5 pb-2'>
        <TotalBarChartCard />
      </div>
      <div className='col-span-3 pb-2'>
        <TotalPieChartCard />
      </div>
      <AccountCards />
    </div>
  )
}

export default Dashboard
