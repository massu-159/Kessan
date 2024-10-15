import { Suspense } from "react"
import { CardBody, Typography } from "../../common"
import CardSkeletonXs from "../../ui/card-skeleton-xs"

const BannerCard = () => {
  return (
    <Suspense fallback={<CardSkeletonXs />}>
      <video
        src='/bg-2.webm'
        className='absolute inset-x-0 px-1 top-5 -z-10 rounded-3xl'
        loop
        autoPlay
        muted
      ></video>
      <CardBody className='h-full flex justify-center items-center'>
        <Typography
          variant='h5'
          className='text-white font-bold text-2xl italic'
        >
          NEVER GIVE UP
        </Typography>
      </CardBody>
    </Suspense>
  )
}

export default BannerCard