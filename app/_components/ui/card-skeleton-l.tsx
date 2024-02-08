import { CustomCard } from "./custom-card"

const CardSkeletonL = () => {
  return (
    <CustomCard className='h-full w-full bg-opacity-80 p-4'>
      <div className='bg-gray-400 h-2 w-full rounded animate-pulse'></div>
      <div className='mt-2 bg-gray-400 h-2 w-full rounded animate-pulse'></div>
      <div className='mt-2 bg-gray-400 h-2 w-48 rounded animate-pulse'></div>
    </CustomCard>
  )
}

export default CardSkeletonL
