import Link from 'next/link'

import {
  AppShell,
  Aside,
  Burger,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  NavLink,
  Text,
  useMantineTheme
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import navItems from './navItems'
import Countdown from './countdown'

type Props = {
  children?: React.ReactNode
}

export default function Layout ({ children }: Props) {
  const theme = useMantineTheme()
  const [opened, { toggle, close }] = useDisclosure(false)
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0]
        }
      }}
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      navbar={
        <Navbar
          p='md'
          hiddenBreakpoint='sm'
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          {navItems.map((item, i) => (
            <Link href={item.href} passHref key={i}>
              <NavLink
                label={item.label}
                icon={item.icon}
                onClick={() => close()}
              />
            </Link>
          ))}
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
          <Aside p='md' hiddenBreakpoint='sm' width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p='md'>
          <Countdown/>
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p='md'>
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => toggle()}
                size='sm'
                color={theme.colors.gray[6]}
                mr='xl'
              />
            </MediaQuery>

            <Text>Advent of Code API</Text>
          </div>
        </Header>
      }
    >
      <div>{children}</div>
    </AppShell>
  )
}
