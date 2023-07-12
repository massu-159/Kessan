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
  InboxIcon,
  PowerIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/solid'
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

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
        <Card className='h-screen bg-cyan-900 rounded-none w-full max-w-[16rem] p-4 shadow-xl'>
          <div className='mb-2 flex items-center gap-4 p-4'>
            <div className='relative w-10 h-10'>
              <Image
                src='/Kessan-logo.png'
                alt='logo'
                fill
                className='object-cover'
              ></Image>
            </div>
            <Typography variant='h5' color='white'>
              Kessan
            </Typography>
          </div>
          <List>
            <Link href='/'>
              <ListItem
                className='p-3 hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'
                ripple
                selected={open === 1}
              >
                <ListItemPrefix>
                  <ChartBarIcon className='h-5 w-5' fill='cyan' />
                </ListItemPrefix>
                <Typography className='text-white mr-auto font-normal hover:text-gray'>
                  Dashboard
                </Typography>
              </ListItem>
            </Link>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`text-white mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? 'rotate-180' : ''
                  }`}
                />
              }
            >
              <ListItem
                className='p-0 hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'
                selected={open === 2}
              >
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className='border-b-0 p-3 hover:bg-transparent focus:bg-transparent active:bg-transparent'
                >
                  <ListItemPrefix>
                    <AdjustmentsHorizontalIcon
                      className='h-5 w-5'
                      fill='cyan'
                    />
                  </ListItemPrefix>
                  <Typography color='white' className='mr-auto font-normal'>
                    Matrix
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className='py-1'>
                <List className='p-0'>
                  <Link href='/matrix/assets'>
                    <ListItem className='hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'>
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className='text-white h-3 w-5'
                        />
                      </ListItemPrefix>
                      <Typography color='white'>Assets</Typography>
                    </ListItem>
                  </Link>
                  <Link href='/matrix/finance'>
                    <ListItem className='hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'>
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className='text-white h-3 w-5'
                        />
                      </ListItemPrefix>
                      <Typography color='white'>Finance</Typography>
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <hr className='my-2 border-blue-gray-50' />
            <ListItem className='hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'>
              <ListItemPrefix>
                <InboxIcon className='h-5 w-5' fill='cyan' />
              </ListItemPrefix>
              <Typography color='white'>AI Chat</Typography>

              <ListItemSuffix>
                <Chip
                  value='Beta'
                  size='sm'
                  variant='gradient'
                  className='rounded-full'
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem className='hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'>
              <ListItemPrefix>
                <UserCircleIcon className='h-5 w-5' fill='cyan' />
              </ListItemPrefix>
              <Typography color='white'>Profile</Typography>
            </ListItem>
            <Link href='/settings/profile'>
              <ListItem className='hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'>
                <ListItemPrefix>
                  <Cog6ToothIcon className='h-5 w-5' fill='cyan' />
                </ListItemPrefix>
                <Typography color='white'>Settings</Typography>
              </ListItem>
            </Link>
            <Link href='/settings/logout'>
              <ListItem className='hover:bg-cyan-800 focus:bg-cyan-900 active:bg-cyan-600'>
                <ListItemPrefix>
                  <PowerIcon className='h-5 w-5' fill='cyan' />
                </ListItemPrefix>
                <Typography color='white'>Log Out</Typography>
              </ListItem>
            </Link>
          </List>
        </Card>
      )}
    </>
  )
}
