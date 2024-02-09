'use client'

import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import useStore from '../../store'
import Image from 'next/image'
import type { Database } from '../../lib/database.types'
type ProfileType = Database['public']['Tables']['profiles']['Row']
import { useState, useEffect, Suspense } from 'react'
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
import { ChevronDownIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import {
  chatPath,
  dashboardPath,
  emailPath,
  financePath,
  logoutPath,
  passwordPath,
  profilePath,
  totalAssetsPath,
} from '../_common/constants/path'
import { usePathname } from 'next/navigation'
import SideBarSkeleton from './ui/side-bar-skeleton'

export default function SideBar({
  user,
  profile,
}: {
  user: User | null
  profile: ProfileType | null
}) {
  const [open, setOpen] = useState(0)
  // パスを取得
  const pathname = usePathname()

  const { setUser } = useStore()
  // 状態管理にユーザー情報を保存
  useEffect(() => {
    setUser({
      id: user ? user.id : '',
      email: user ? user.email! : '',
      name: profile ? profile.name : '',
      introduce: profile ? profile.introduce : '',
      avatar_url: profile ? profile.avatar_url : '',
    })
  }, [user, setUser, profile])

  const handleOpen = (value: React.SetStateAction<number>) => {
    setOpen(open === value ? 0 : value)
  }

  return (
    <Suspense fallback={<SideBarSkeleton />}>
      {user && (
        <Card className='fixed min-h-screen bg-cyan-900 bg-opacity-80 rounded-none w-full max-w-[16rem] p-4 shadow-xl'>
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
                className={`p-3 hover:bg-cyan-800 active:bg-cyan-700 focus:bg-cyan-700 ${
                  pathname === dashboardPath ? 'bg-cyan-700' : ''
                }`}
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
              <ListItem
                className={`hover:bg-cyan-800 active:bg-cyan-700 focus:bg-cyan-700 ${
                  pathname === totalAssetsPath ? 'bg-cyan-700' : ''
                }`}
              >
                <ListItemPrefix>
                  <AdjustmentsHorizontalIcon className='h-5 w-5' fill='cyan' />
                </ListItemPrefix>
                <Typography color='white'>Total Assets</Typography>
              </ListItem>
            </Link>

            {/* 各資産テーブル */}
            <Link href={financePath}>
              <ListItem
                className={`hover:bg-cyan-800 active:bg-cyan-700 focus:bg-cyan-700 ${
                  pathname === financePath ? 'bg-cyan-700' : ''
                }`}
              >
                <ListItemPrefix>
                  <Square3Stack3DIcon className='h-5 w-5' fill='cyan' />
                </ListItemPrefix>
                <Typography color='white'>Finance</Typography>
              </ListItem>
            </Link>

            <hr className='my-2 border-blue-gray-50' />

            {/* AIチャット */}
            <ListItem
              className={`hover:bg-cyan-800 focus:bg-inherit active:bg-inherit ${
                pathname === chatPath ? 'bg-cyan-700' : ''
              }`}
            >
              <ListItemPrefix>
                <ChatBubbleLeftEllipsisIcon className='h-5 w-5' fill='cyan' />
              </ListItemPrefix>
              <Typography color='white'>AI Chat</Typography>
              <ListItemSuffix>
                <Chip value='Beta' size='sm' className='rounded-full' />
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
                className='p-0 hover:bg-cyan-800 focus:bg-cyan-800 active:bg-transparent bg-transparent'
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
                    <ListItem
                      className={`hover:bg-cyan-800 focus:bg-cyan-700 active:bg-cyan-700 ${
                        pathname === profilePath ? 'bg-cyan-700' : ''
                      }`}
                    >
                      <ListItemPrefix>
                        <UserCircleIcon className='h-5 w-5 ml-9' fill='cyan' />
                      </ListItemPrefix>
                      <Typography color='white'>Profile</Typography>
                    </ListItem>
                  </Link>

                  {/* メールアドレス */}
                  <Link href={emailPath}>
                    <ListItem
                      className={`hover:bg-cyan-800 focus:bg-cyan-700 active:bg-cyan-700 ${
                        pathname === emailPath ? 'bg-cyan-700' : ''
                      }`}
                    >
                      <ListItemPrefix>
                        <EnvelopeIcon className='h-5 w-5 ml-9' fill='cyan' />
                      </ListItemPrefix>
                      <Typography color='white'>Email</Typography>
                    </ListItem>
                  </Link>

                  {/* パスワード */}
                  <Link href={passwordPath}>
                    <ListItem
                      className={`hover:bg-cyan-800 focus:bg-cyan-700 active:bg-cyan-700 ${
                        pathname === passwordPath ? 'bg-cyan-700' : ''
                      }`}
                    >
                      <ListItemPrefix>
                        <KeyIcon className='h-5 w-5 ml-9' fill='cyan' />
                      </ListItemPrefix>
                      <Typography color='white'>Password</Typography>
                    </ListItem>
                  </Link>

                  {/* ログアウト */}
                  <Link href={logoutPath}>
                    <ListItem
                      className={`hover:bg-cyan-800 focus:bg-cyan-700 active:bg-cyan-700 ${
                        pathname === logoutPath ? 'bg-cyan-700' : ''
                      }`}
                    >
                      <ListItemPrefix>
                        <PowerIcon className='h-5 w-5 ml-9' fill='cyan' />
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
    </Suspense>
  )
}
