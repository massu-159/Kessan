import { Card, Typography } from '../../common'

const TABLE_HEAD = ['日付', '資産残高', '増減率', '増減額', '']

/**
 * 金融機関カード
 */
export default function AccountNoDataTable() {
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
          <tr>
            <td colSpan={4} className='py-6 text-center'>
              <Typography
                variant='small'
                color='blue-gray'
                className='font-normal'
              >
                No Data
              </Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  )
}
