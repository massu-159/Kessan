'use client'

import { Session } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import useStore from '../../store'
import Image from 'next/image'
import type { Database } from '../../lib/database.types'
type ProfileType = Database['public']['Tables']['profiles']['Row']
import { useState, useEffect } from 'react'
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from './common'
import {
  ChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  AdjustmentsHorizontalIcon,
  ChatBubbleLeftEllipsisIcon,
  KeyIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/solid'
import { ChevronRightIcon, ChevronDownIcon, TableCellsIcon, CircleStackIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { dashboardPath, emailPath, financePath, logoutPath, passwordPath, profilePath, totalAssetsPath } from '../_common/constants/path'

export default function SideBar({
  session,
  profile,
}: {
  session: Session | null
  profile: ProfileType | null
}) {
  const [open, setOpen] = useState(0)

  const { setUser } = useStore()
  // 状態管理にユーザー情報を保存
  useEffect(() => {
    setUser({
      id: session ? session.user.id : '',
      email: session ? session.user.email! : '',
      name: session && profile ? profile.name : '',
      introduce: session && profile ? profile.introduce : '',
      avatar_url: session && profile ? profile.avatar_url : '',
    })
  }, [session, setUser, profile])

  const handleOpen = (value: React.SetStateAction<number>) => {
    setOpen(open === value ? 0 : value)
  }

  return (
    <>
      {session && (
        <Card className='fixed min-h-screen bg-cyan-900 rounded-none w-full max-w-[16rem] p-4 shadow-xl'>
          {/* タイトル */}
          <div className='mb-2 flex items-center gap-4 p-4'>
            <div className='relative w-10 h-10'>
              <Image
                src='/Kessan-logo.png'
                alt='logo'
                fill
                className='object-cover'
                sizes='100vw'
              ></Image>
            </div>
            <Typography variant='h5' color='white'>
              Kessan
            </Typography>
          </div>
          <List>
            {/* ダッシュボード */}
            <Link href={dashboardPath}>
              <ListItem
                className='p-3 hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'
                ripple
              >
                <ListItemPrefix>
                  <ChartBarIcon className='h-5 w-5' fill='cyan' />
                </ListItemPrefix>
                <Typography className='text-white mr-auto font-normal hover:text-gray'>
                  Dashboard
                </Typography>
              </ListItem>
            </Link>

            {/* 資産合計テーブル */}
            <Link href={totalAssetsPath}>
              <ListItem className='hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'>
                <ListItemPrefix>
                  <AdjustmentsHorizontalIcon className='h-5 w-5' fill='cyan' />
                </ListItemPrefix>
                <Typography color='white'>Total Assets</Typography>
              </ListItem>
            </Link>

            {/* 各資産テーブル */}
            <Link href={financePath}>
              <ListItem className='hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'>
                <ListItemPrefix>
                  <Square3Stack3DIcon className='h-5 w-5' fill='cyan' />
                </ListItemPrefix>
                <Typography color='white'>Finance</Typography>
              </ListItem>
            </Link>

            <hr className='my-2 border-blue-gray-50' />

            {/* AIチャット */}
            <ListItem className='hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'>
              <ListItemPrefix>
                <ChatBubbleLeftEllipsisIcon className='h-5 w-5' fill='cyan' />
              </ListItemPrefix>
              <Typography color='white'>AI Chat</Typography>
              <ListItemSuffix>
                <Chip
                  value='Beta'
                  size='sm'
                  className='rounded-full'
                />
              </ListItemSuffix>
            </ListItem>

            {/* セッティング */}
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`text-white mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? 'rotate-180' : ''
                  }`}
                />
              }
            >
              <ListItem
                className='p-0 hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'
                selected={open === 1}
              >
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className='border-b-0 p-3 hover:bg-transparent focus:bg-transparent active:bg-transparent'
                >
                  <ListItemPrefix>
                    <Cog6ToothIcon className='h-5 w-5' fill='cyan' />
                  </ListItemPrefix>
                  <Typography color='white' className='mr-auto font-normal'>
                    Settings
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className='py-1'>
                <List className='p-0'>
                  {/* プロフィール */}
                  <Link href={profilePath}>
                    <ListItem className='hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'>
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className='text-white h-3 w-5'
                        />
                      </ListItemPrefix>
                      <ListItemPrefix>
                        <UserCircleIcon className='h-5 w-5' fill='cyan' />
                      </ListItemPrefix>
                      <Typography color='white'>Profile</Typography>
                    </ListItem>
                  </Link>

                  {/* メールアドレス */}
                  <Link href={emailPath}>
                    <ListItem className='hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'>
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className='text-white h-3 w-5'
                        />
                      </ListItemPrefix>
                      <ListItemPrefix>
                        <EnvelopeIcon className='h-5 w-5' fill='cyan' />
                      </ListItemPrefix>
                      <Typography color='white'>Email</Typography>
                    </ListItem>
                  </Link>

                  {/* パスワード */}
                  <Link href={passwordPath}>
                    <ListItem className='hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'>
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className='text-white h-3 w-5'
                        />
                      </ListItemPrefix>
                      <ListItemPrefix>
                        <KeyIcon className='h-5 w-5' fill='cyan' />
                      </ListItemPrefix>
                      <Typography color='white'>Password</Typography>
                    </ListItem>
                  </Link>

                  {/* ログアウト */}
                  <Link href={logoutPath}>
                    <ListItem className='hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'>
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className='text-white h-3 w-5'
                        />
                      </ListItemPrefix>
                      <ListItemPrefix>
                        <PowerIcon className='h-5 w-5' fill='cyan' />
                      </ListItemPrefix>
                      <Typography color='white'>Log Out</Typography>
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
          </List>
        </Card>
      )}
    </>
  )
}
