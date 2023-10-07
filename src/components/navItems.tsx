import {
  IconApiApp,
  IconCalendar,
  IconHome2,
  IconInfoCircle
} from '@tabler/icons-react'

type ChildItem = {
  label: string
  href: string
}

type Item = {
  icon: JSX.Element
  label: string
  href: string
  children?: ChildItem[]
}

const navItems: Item[] = [
  {
    icon: <IconHome2 size='1em' stroke={1.5} />,
    label: 'Home',
    href: '/'
  },
  {
    icon: <IconApiApp size='1em' stroke={1.5} />,
    label: 'REST API',
    href: '/docs'
  },
  {
    icon: <IconCalendar size='1em' stroke={1.5} />,
    label: 'Events Calendars',
    href: '/calendars',
    children: [
      { label: '2015', href: '/calendars/2015' },
      { label: '2016', href: '/calendars/2016' },
      { label: '2017', href: '/calendars/2017' },
      { label: '2018', href: '/calendars/2018' },
      { label: '2019', href: '/calendars/2019' },
      { label: '2020', href: '/calendars/2020' },
      { label: '2021', href: '/calendars/2021' },
      { label: '2022', href: '/calendars/2022' },
    ]
  },
  {
    icon: <IconInfoCircle size='1em' stroke={1.5} />,
    label: 'About',
    href: '/about'
  }
]

export default navItems
