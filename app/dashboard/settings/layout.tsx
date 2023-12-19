'use client'

import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '../../_components/common'

// ナビゲーション
const subNavigation = [
  {
    name: 'プロフィール',
    icon: UserCircleIcon,
    href: '/dashboard/settings/profile',
  },
  {
    name: 'メールアドレス',
    icon: EnvelopeIcon,
    href: '/dashboard/settings/email',
  },
  {
    name: 'パスワード',
    icon: KeyIcon,
    href: '/dashboard/settings/password',
  },
  {
    name: 'ログアウト',
    icon: ArrowLeftOnRectangleIcon,
    href: '/dashboard/settings/logout',
  },
]

// レイアウト
const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <div className='grid grid-cols-8 gap-3 h-full'>
      <List className='col-start-2 col-span-2 text-sm space-y-1 font-bold flex flex-col'>
        {subNavigation.map((item, index) => (
          <Link href={item.href} key={index}>
            <ListItem
              className={`${
                item.href == pathname && 'bg-sky-100 text-sky-500'
              } hover:bg-sky-100 px-3 py-2 rounded-full`}
            >
              <ListItemPrefix>
                <item.icon className='inline-block w-5 h-5 mr-2' />
              </ListItemPrefix>
              <Typography>{item.name}</Typography>
            </ListItem>
          </Link>
        ))}
      </List>
      <div className='col-span-3'>{children}</div>
    </div>
  )
}

export default SettingsLayout
