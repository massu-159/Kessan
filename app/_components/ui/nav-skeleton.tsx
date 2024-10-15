const NavSkeleton = () => {
  return (
    <nav className='block fixed max-w-[calc(100vw-16rem)] bg-[#f4fcfc] bg-opacity-5 text-white mx-auto w-screen px-4 py-3 rounded-none shadow-none backdrop-blur-sm z-30 animate-pulse'>
      <div className='flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900'>
        <div className='relative flex w-full gap-2 md:w-max'>
          <div className='min-w-[600px] pr-20'>
            <div className='h-8 bg-gray-400 rounded'></div>{' '}
            {/* 検索バーのスケルトン */}
          </div>
        </div>
        <div className='ml-auto flex items-center gap-3 md:mr-4'>
          <div className='h-7 w-7 bg-gray-400 rounded-full'></div>{' '}
          {/* 設定アイコンのスケルトン */}
          <div className='h-7 w-7 bg-gray-400 rounded-full'></div>{' '}
          {/* 通知アイコンのスケルトン */}
          <div className='relative w-10 h-10'>
            <div className='rounded-full bg-gray-400 h-full w-full'></div>{' '}
            {/* アバターのスケルトン */}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavSkeleton
