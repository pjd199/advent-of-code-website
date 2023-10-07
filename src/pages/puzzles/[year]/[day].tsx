import { Prism } from '@mantine/prism'
import { ParsedUrlQuery } from 'querystring'

import Runner from '@/components/runner'

import {
  AocApiCalendars,
  AocApiPuzzle,
  AocApiPuzzles
} from '@/components/types'
import { Anchor, Text, Title, Accordion } from '@mantine/core'

interface IParams extends ParsedUrlQuery {
  year: string
  day: string
}

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType
} from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`https://api.adventofcode.dibdin.me/calendars`)
  const body = await response.json()
  const calendars = body.results as AocApiCalendars

  let paths = []
  for (let calendar of calendars) {
    for (let day of calendar.days) {
      paths.push({
        params: {
          year: calendar.year.toString(),
          day: day.toString()
        }
      })
    }
  }

  return {
    paths: paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<{
  puzzle: AocApiPuzzle
  code: string
}> = async context => {
  const { year, day } = context.params as IParams

  const response = await fetch(`https://api.adventofcode.dibdin.me/puzzles`)
  const body = await response.json()
  const results: AocApiPuzzles = body.results
  const puzzle = results.filter(
    x => x.year == parseInt(year) && x.day == parseInt(day)
  )[0]

  const codeResposne = await fetch(puzzle.code_url)
  const code = await codeResposne.text()

  return { props: { puzzle, code } }
}

export default function Page ({
  puzzle,
  code
}: InferGetStaticPropsType<typeof getStaticProps>) {
  let averageTime =
    puzzle.timings.parse + puzzle.timings.part_one + puzzle.timings.part_two

  return (
    <div>
      <Title order={1}>{puzzle.title} ({puzzle.day.toString().padStart(2, '0')} / {puzzle.year})</Title>
      <Title order={2}>
        Overview
      </Title>
      <Text>{puzzle.excerpt}... (<Anchor href={puzzle.official_url}>read more</Anchor>)</Text>
      <Text><b>Completion date:</b> {new Date(puzzle.completion_date).toUTCString()}</Text>
      <Text>
        <b>Average solve time:</b> {averageTime}
        {puzzle.timings.unit}
      </Text>
      <Title order={2}>Solve puzzle</Title>
      <Runner puzzle={puzzle} />
      <Title order={2}>Code</Title>
      <Accordion>
        <Accordion.Item value='code'>
          <Accordion.Control>Click to expand...</Accordion.Control>
          <Accordion.Panel>
            <Prism language='python' withLineNumbers>
              {code}
            </Prism>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
