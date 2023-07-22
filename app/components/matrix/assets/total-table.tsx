import { Card, Typography } from '../../common'

const TABLE_HEAD = ['日付', '資産残高', '増減率', '']

const TABLE_ROWS = [
  {
    date: '23/07/01',
    amount: '23000000',
    rate: '20',
  },
  {
    date: '23/06/01',
    amount: '2000000',
    rate: '14',
  },
  {
    date: '23/05/01',
    amount: '1760000',
    rate: '8',
  },
  {
    date: '23/04/01',
    amount: '1440000',
    rate: '13',
  },
  {
    date: '23/03/01',
    amount: '1290000',
    rate: '-2',
  },
]

export default function AssetsTable() {
  return (
    <Card className='overflow-scroll h-full w-full'>
      <table className='w-full min-w-max table-auto text-left'>
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
              >
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal leading-none opacity-70'
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ amount, rate, date }, index) => (
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
                  {amount}
                </Typography>
              </td>
              <td className='p-4'>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal'
                >
                  {rate}
                </Typography>
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
          ))}
        </tbody>
      </table>
    </Card>
  )
}
