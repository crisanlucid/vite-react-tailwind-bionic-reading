import { AppShell } from '@mantine/core'
import { Outlet } from 'react-router-dom'

import { FCC } from '../../types'
import { HeaderAction } from '../Header'

const links = [
  {
    link: '/about',
    label: 'About',
  },
  {
    link: '/playground',
    label: 'Playground',
  },
]

export const Layout: FCC = () => {
  return (
    <AppShell
      padding="md"
      header={<HeaderAction links={links} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
        body: {
          height: '100vh',
        },
      })}
    >
      <Outlet />
    </AppShell>
  )
}
