import { AocApiCalendars, AocApiPuzzles } from '@/components/types'
import { Title, Text } from '@mantine/core'

import { ParsedUrlQuery } from 'querystring'

interface IParams extends ParsedUrlQuery {
  year: string
}

import type {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticProps
} from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`https://api.adventofcode.dibdin.me/calendars`)
  const body = await response.json()
  const calendars = body.results as AocApiCalendars

  return {
    paths: calendars.map(x => ({
      params: {
        year: x.year.toString()
      }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<{
  year: string
  puzzles: AocApiPuzzles
}> = async context => {
  const { year } = context.params as IParams

  const response = await fetch(
    `https://api.adventofcode.dibdin.me/puzzles/${year}`
  )
  const body = await response.json()
  const puzzles = body.results

  return { props: { year, puzzles } }
}

export default function Page ({
  year,
  puzzles
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Title order={1}>{year}</Title>
      {puzzles.map((entry, i) => (
        <Text key={i}>
          <b>Day {entry.day}</b> ... {entry.title} stars
        </Text>
      ))}
    </div>
  )
}