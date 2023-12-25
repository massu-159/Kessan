import { CardBody, Typography } from "../../common"

const BannerCard = () => {
  return (
    <>
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
    </>
  )
}

export default BannerCard