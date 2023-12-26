'use client'
import { ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { Button, Card, Typography } from '../../common'
import { Suspense, useState } from 'react'
import PopUpEditForm from '../parts/finance-edit-form'
import { ParFinancialInstitutionAsset } from '../../../_common/types/AssetParFinancialInstitution'
import Loading from '../../../(routes)/loading'

const TABLE_HEAD = ['日付', '資産残高', '増減率', '増減額', '']

type Props = {
  tableRows: ParFinancialInstitutionAsset[]
  name: string | null
  userId: string | undefined
}

/**
 * 金融機関カード
 * @param tableRows 金融機関テーブルの行データ
 * @param name 金融機関名
 * @param userId ユーザーID
 */
export default function AccountTable({ tableRows, name, userId }: Props) {
  const [open, setOpen] = useState(false)
  const [pickAmount, setPickAmount] = useState(0)
  const [pickDate, setPickDate] = useState('')
  // 金額入力ボタンを押したら、金額入力モーダルウィンドウを表示する
  const handleClick = (amount: number, date: string) => {
    setPickAmount(amount)
    setPickDate(date)
    setOpen(true)
  }
  // 増減率を計算
  const rate = (amount: number, previousAmount: number) => {
    if (tableRows.length < 2) return 0
    return Math.floor(((amount - previousAmount) / previousAmount) * 100)
  }

  // 増減額を計算
  const difference = (amount: number, previousAmount: number) => {
    if (tableRows.length < 2) return 0
    return amount - previousAmount
  }
  return (
    <Card className='overflow-scroll h-full w-full'>
      <Suspense fallback={<Loading />}>
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
            {tableRows.map(
              ({ amount, date }: ParFinancialInstitutionAsset, i: number) => {
                const previousAmount = tableRows[i + 1]?.amount
                if (!amount || !previousAmount || !date || !name) return null
                return (
                  <tr key={date} className='even:bg-blue-gray-50/50'>
                    <td className='pl-4 pr-1 py-1'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className='p-1'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {Number(amount).toLocaleString()}円
                      </Typography>
                    </td>
                    <td className='p-1'>
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
                    <td className='p-1'>
                      {difference(amount, previousAmount) > 0 ? (
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
                            {difference(
                              amount,
                              previousAmount
                            ).toLocaleString()}
                            円
                          </Typography>
                        </div>
                      ) : difference(amount, previousAmount) < 0 ? (
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
                            {difference(
                              amount,
                              previousAmount
                            ).toLocaleString()}
                            円
                          </Typography>
                        </div>
                      ) : (
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          0円
                        </Typography>
                      )}
                    </td>
                    <td className='py-1 '>
                      <Button
                        onClick={() => handleClick(Number(amount), date)}
                        variant='text'
                        color='cyan'
                        className='font-medium'
                      >
                        Edit
                      </Button>
                      {open && (
                        <PopUpEditForm
                          open={open}
                          setOpen={setOpen}
                          name={name}
                          id={userId}
                          amount={pickAmount}
                          date={pickDate}
                        ></PopUpEditForm>
                      )}
                    </td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      </Suspense>
    </Card>
  )
}
