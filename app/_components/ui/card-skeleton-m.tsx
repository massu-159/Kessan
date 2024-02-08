import { CustomCard } from "./custom-card"

const CardSkeletonM = () => {
  return (
    <CustomCard className='h-full w-full bg-opacity-80 p-4'>
      <div className='flex justify-center items-center bg-gray-400 h-96 w-full rounded-xl animate-pulse'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-20 h-20'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
          />
        </svg>
      </div>
      <div className='mt-2 bg-gray-400 h-2 w-full rounded animate-pulse'></div>
      <div className='mt-2 bg-gray-400 h-2 w-48 rounded animate-pulse'></div>
    </CustomCard>
  )
}

export default CardSkeletonM
