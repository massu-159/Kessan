const SideBarSkeleton = () => {
  return (
    <div className='fixed min-h-screen bg-cyan-900 bg-opacity-80 rounded-none w-full max-w-[16rem] p-4'>
      {/* タイトル */}
      <div className='mb-2 flex items-center gap-4 p-4 animate-pulse'>
        <div className='relative w-10 h-10'>
          <div className='w-full h-full bg-gray-400 rounded-full'></div>
        </div>
        <div className='h-6 w-32 bg-gray-400 rounded'></div>
      </div>
      <div className='p-3 flex gap-2 animate-pulse'>
        <div className='h-5 w-5 bg-gray-400 rounded'></div>
        <div>
          <div className='h-4 w-40 bg-gray-400 rounded'></div>
          <div className='h-2 w-40 bg-gray-400 rounded mt-2'></div>
          <div className='h-2 w-40 bg-gray-400 rounded mt-2'></div>
        </div>
      </div>
      <div className='p-3 flex gap-2 animate-pulse'>
        <div className='h-5 w-5 bg-gray-400 rounded'></div>
        <div>
          <div className='h-4 w-40 bg-gray-400 rounded'></div>
          <div className='h-2 w-40 bg-gray-400 rounded mt-2'></div>
          <div className='h-2 w-40 bg-gray-400 rounded mt-2'></div>
        </div>
      </div>
    </div>
  )
}

export default SideBarSkeleton
