'use client'

import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

// ナビゲーション
const subNavigation = [
  {
    name: 'プロフィール',
    icon: UserCircleIcon,
    href: '/settings/profile',
  },
  {
    name: 'メールアドレス',
    icon: EnvelopeIcon,
    href: '/settings/email',
  },
  {
    name: 'パスワード',
    icon: KeyIcon,
    href: '/settings/password',
  },
  {
    name: 'ログアウト',
    icon: ArrowLeftOnRectangleIcon,
    href: '/settings/logout',
  },
]

// レイアウト
const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <div>
      <div>
        {subNavigation.map((item, index) => (
          <Link href={item.href} key={index}>
            <div className={`${item.href == pathname }`}>
              <item.icon />
              {item.name}
            </div>
          </Link>
        ))}
      </div>
      <div>{children}</div>
    </div>
  )
}

export default SettingsLayout
