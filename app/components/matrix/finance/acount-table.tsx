import { ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { Card, CardBody, Typography } from '../../common'

const TABLE_HEAD = ['日付', '資産残高', '増減率', '']

type TableRows = {
  date: string
  amount: string
}

export default function AcountTable({ tableRows }: { tableRows: TableRows[] }) {
  // 増減率を計算
  const rate = (amount: string, previousAmount: string) => {
    if (tableRows.length < 2) return 0
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
                className='border-b border-blue-gray-100 bg-cyan-900 p-4'
              >
                <Typography
                  variant='small'
                  color='white'
                  className='font-bold leading-none opacity-70'
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map(({ amount, date }: TableRows, i) => {
            const previousAmount = tableRows[i + 1]?.amount
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
                    {Number(amount).toLocaleString()}円
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
                        {rate(amount, previousAmount)}%
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
                        {rate(amount, previousAmount) * -1}%
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
