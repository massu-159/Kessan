import { ReactNode } from "react"

const Content = ({ children }: {children: ReactNode}) => {
  return (
    <div className='mt-32 h-full overflow-y-auto z-10'>
      <div className='container grid px-4 mx-auto'>{children}</div>
    </div>
  )
}

export default Content