import { CustomCard } from "./custom-card"

const CardSkeletonS = () => {
  return (
    <CustomCard className='h-full w-full bg-opacity-80 p-4'>
      <div className='flex gap-12'>
        <div className='flex flex-col gap-2'>
          <div className='bg-gray-400 h-3 w-48 rounded animate-pulse '></div>
          <div className='bg-gray-400 h-8 w-48 rounded animate-pulse'></div>
        </div>
        <div className='bg-gray-400 h-12 w-12 rounded-full animate-pulse'></div>
      </div>
      <div className='mt-3 bg-gray-400 h-3 w-full rounded animate-pulse'></div>
      <div className='mt-3 bg-gray-400 h-3 w-full rounded animate-pulse'></div>
      <div className='mt-3 bg-gray-400 h-3 w-full rounded animate-pulse'></div>
      <div className='mt-3 bg-gray-400 h-2 w-48 rounded animate-pulse'></div>
    </CustomCard>
  )
}

export default CardSkeletonS
