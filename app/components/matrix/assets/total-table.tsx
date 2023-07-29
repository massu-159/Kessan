import { ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { Card, Typography } from '../../common'

const TABLE_HEAD = ['日付', '資産残高', '増減率', '']


export default function AssetsTable(data: any) {
  const totalAmountParDate = data.totalAmountParDate
  // 増減率を計算
  const rate = (amount: number, previousAmount: number) => { 
    if (data.length < 2) return 0
    return Math.floor(
      ((Number(amount) - Number(previousAmount)) / Number(previousAmount)) * 100
    )
  }

  return (
    <Card className='overflow-scroll h-full w-full'>
      <table className='w-full min-w-max table-auto text-left'>
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className='border-b border-cyan-900 bg-cyan-900 p-4'
              >
                <Typography
                  variant='small'
                  color='white'
                  className='font-bold leading-none'
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {totalAmountParDate.map(({ date, amount }: any, index: number) => {
            const previousAmount = totalAmountParDate[index + 1]?.amount
            return (
              <tr key={date} className='even:bg-blue-gray-50/50'>
                <td className='p-4'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal'
                  >
                    {date}
                  </Typography>
                </td>
                <td className='p-4'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal'
                  >
                    {amount.toLocaleString()}円
                  </Typography>
                </td>
                <td className='p-4'>
                  {rate(amount, previousAmount) > 0 ? (
                    <div className='flex items-center'>
                      <ArrowLongUpIcon
                        fill='#1e88e5'
                        className='w-6 h-6'
                      ></ArrowLongUpIcon>
                      <Typography
                        variant='small'
                        color='blue'
                        className='font-normal'
                      >
                        {Math.floor(rate(amount, previousAmount))}%
                      </Typography>
                    </div>
                  ) : rate(amount, previousAmount) < 0 ? (
                    <div className='flex items-center'>
                      <ArrowLongDownIcon
                        fill='#e53834'
                        className='w-6 h-6'
                      ></ArrowLongDownIcon>
                      <Typography
                        variant='small'
                        color='red'
                        className='font-normal'
                      >
                        {Math.floor(rate(amount, previousAmount))}%
                      </Typography>
                    </div>
                  ) : (
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      0%
                    </Typography>
                  )}
                </td>
                <td className='p-4'>
                  <Typography
                    as='a'
                    href='#'
                    variant='small'
                    color='blue'
                    className='font-medium'
                  >
                    Edit
                  </Typography>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Card>
  )
}
