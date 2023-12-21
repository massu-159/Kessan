import { Card } from '../common'

type Props = {
  children: React.ReactNode
  className?: string
}

export const CustomCard = ({ children, className}:Props) => {
  return (
    <Card className={className ? className : 'bg-opacity-70'}>{children}</Card>
  )
}