import { ReactNode } from "react"

const Content = ({ children }: {children: ReactNode}) => {
  return (
    <div className='h-full overflow-y-auto'>
      <div className='container grid px-6 mx-auto'>{children}</div>
    </div>
  )
}

export default Content