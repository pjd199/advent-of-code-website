import { IconApiApp, IconCalendar, IconHome2, IconInfoCircle } from '@tabler/icons-react';

type Item = {
  icon: JSX.Element
  label: string
  href: string
}

const navItems: Item[] = [
  {
    icon: <IconHome2 size='1em' stroke={1.5} />,
    label: 'Home',
    href: './'
  },
  {
    icon: <IconApiApp size='1em' stroke={1.5} />,
    label: 'REST API',
    href: './docs'
  },
  {
    icon: <IconCalendar size='1em' stroke={1.5} />,
    label: 'Events Calendars',
    href: './calendars'
  },
  {
    icon: <IconInfoCircle size='1em' stroke={1.5} />,
    label: 'About',
    href: './about'
  }
]

export default navItems
