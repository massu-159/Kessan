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
  PresentationChartBarIcon,
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
        <Card className='fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5'>
          <div className='mb-2 flex items-center gap-4 p-4'>
            <div className='relative w-10 h-10'>
              <Image
                src='/Kessan-logo.png'
                alt='logo'
                fill
                className='object-cover'
              ></Image>
            </div>
            <Typography variant='h5' color='blue-gray'>
              Kessan
            </Typography>
          </div>
          <List>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? 'rotate-180' : ''
                  }`}
                />
              }
            >
              <ListItem className='p-3' selected={open === 1}>
                <ListItemPrefix>
                  <PresentationChartBarIcon className='h-5 w-5' />
                </ListItemPrefix>
                <Typography color='blue-gray' className='mr-auto font-normal'>
                  Dashboard
                </Typography>
              </ListItem>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? 'rotate-180' : ''
                  }`}
                />
              }
            >
              <ListItem className='p-0' selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className='border-b-0 p-3'
                >
                  <ListItemPrefix>
                    <AdjustmentsHorizontalIcon className='h-5 w-5' />
                  </ListItemPrefix>
                  <Typography color='blue-gray' className='mr-auto font-normal'>
                    Matrix
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className='py-1'>
                <List className='p-0'>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className='h-3 w-5' />
                    </ListItemPrefix>
                    Assets
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className='h-3 w-5' />
                    </ListItemPrefix>
                    Finance
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <hr className='my-2 border-blue-gray-50' />
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className='h-5 w-5' />
              </ListItemPrefix>
              AI Chat
              <ListItemSuffix>
                <Chip
                  value='Beta'
                  size='sm'
                  variant='ghost'
                  color='blue'
                  className='rounded-full'
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className='h-5 w-5' />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
                <ListItemPrefix>
                  <Cog6ToothIcon className='h-5 w-5' />
                </ListItemPrefix>
              <Link href='/settings/profile'>
                Settings
              </Link>
            </ListItem>
            <ListItem>
                <ListItemPrefix>
                  <PowerIcon className='h-5 w-5' />
                </ListItemPrefix>
              <Link href='/settings/logout'>
                Log Out
              </Link>
            </ListItem>
          </List>
        </Card>
      )}
    </>
  )
}
