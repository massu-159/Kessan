'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '../../../_components/common'
import { subNavigation } from '../../../_common/constants/subNavigation'


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
                item.href == pathname && 'bg-cyan-600 text-cyan-50'
              } text-white hover:bg-cyan-600 hover:text-cyan-50 px-3 py-2 rounded-full`}
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
