import { ExpectedResults } from "@/components/types"
import { Text } from "@mantine/core"

import Star, { StarData } from "../components/stars"

import type { InferGetStaticPropsType, GetStaticProps } from 'next'

/*
  Change API endpoints and add CloudFront CDN
  /         - endpoints list [{name:URL}]
  /events - list the years available {results:[]}
  /puzzles/{year} - list of puzzle days and titles {year:number, results:{day:number,title:string,part_one:true/false,part_two:true/false}}
  /solve/{year}/{day} - solve with POST or ?input= {day, year, part_one, part_two,title}
  /solve_part_one/{year}/{day} - {day, year, part_one, title}
  /solve_part_two/{year}/{day} - - {day, year, part_one, title}
*/

export const getStaticProps: GetStaticProps<{
  expectedResults: ExpectedResults
}> = async () => {
  const response = await fetch(
    'https://raw.githubusercontent.com/pjd199/advent_of_code_python/main/tests/expected.json'
  )
  const expectedResults = await response.json()
  return { props: { expectedResults } }
}

export default function Page ({
  expectedResults
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <Star expectedResults={expectedResults} />
}
