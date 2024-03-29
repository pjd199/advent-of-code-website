import { AocApiCalendars } from '@/components/types'
import { Text, Title, Anchor } from '@mantine/core'

import Link from 'next/link'

import { IconStar } from '@tabler/icons-react'

import type { InferGetStaticPropsType, GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps<{
  calendars: AocApiCalendars
}> = async () => {
  const response = await fetch('https://api.adventofcode.dibdin.me/calendars')
  const body = await response.json()
  const calendars = body.results

  return { props: { calendars } }
}

export default function Page ({
  calendars
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Title order={1}>Event Calendars</Title>
      {calendars.map((x, i) => (
        <Text key={i}>
            <Anchor component={Link} href={`/calendars/${x.year}`} key={i}>
              <b>Year {x.year}</b> - {x.days.length} puzzles solved - {x.days.length * 2}&nbsp;
              <IconStar
                size={14} // set custom `width` and `height`
                color='orange' // set `stroke` color
                fill='gold'
              />'s earned
            </Anchor>
        </Text>
      ))}
    </div>
  )
}
