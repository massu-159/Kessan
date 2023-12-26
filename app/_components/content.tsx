import { ReactNode } from "react"

const Content = ({ children }: {children: ReactNode}) => {
  return (
    <div className='pt-32 pb-8 min-h-full overflow-y-auto z-10'>
      <div className='container grid px-4 mx-auto'>{children}</div>
    </div>
  )
}

export default Content