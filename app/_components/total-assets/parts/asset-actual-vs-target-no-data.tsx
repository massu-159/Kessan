import { CardBody, CardFooter, Typography } from '../../common'
import { CurrencyYenIcon } from '@heroicons/react/24/solid'
import GoalEditButton from './goal-edit-button'
import { CustomCard } from '../../ui/custom-card'
import { Suspense } from 'react'
import Loading from '../../../(routes)/loading'
import { createClient } from '../../../../utils/supabase/server'
import { getGoal } from '../../../api/goal/fetcher'
import { redirect } from 'next/navigation'

/**
 * 実績と目標の比較カード
 */
const AssetActualVsTargetNoData = async () => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const userId = user?.id
  // ユーザーが存在しない場合はログイン画面にリダイレクト
  if (!user || !userId) {
    return redirect('/login')
  }

  // 目標を取得
  const goal = await getGoal(userId)

  return (
    <CustomCard className='bg-opacity-0 text-white'>
      <Suspense fallback={<Loading />}>
        <CardBody className='w-full h-fit'>
          <div className='flex gap-4 items-center justify-between'>
            <div>
              <Typography variant='h5' className='text-sm font-normal'>
                actual vs target
              </Typography>
              <Typography variant='lead' className='text-2xl font-bold'>
                目標が未設定です
              </Typography>
            </div>
            <CurrencyYenIcon
              fill='#00C49F'
              className='w-10 h-10'
            ></CurrencyYenIcon>
            <GoalEditButton goal={goal} userId={userId}></GoalEditButton>
          </div>

          <div className='flex justify-center items-center gap-6'>
            <div>現在</div>
            <Typography
              variant='lead'
              className='text-blue-100 font-bold flex justify-center items-center'
            >
              0 %
            </Typography>
          </div>
          <Typography variant='small'>Target achievement rate</Typography>
        </CardBody>
        <CardFooter className='pt-0 pb-2'>
          <Typography className='text-base font-bold'>
            目標金額 0 円
          </Typography>
        </CardFooter>
      </Suspense>
    </CustomCard>
  )
}

export default AssetActualVsTargetNoData
