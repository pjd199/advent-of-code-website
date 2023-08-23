import { Text } from '@mantine/core'

import { ExpectedResults } from './types'

export type StarData = {
  year: string
  total: number
}

export default function Stars (props: { expectedResults: ExpectedResults }) {
  let data: StarData[] = []
  for (const year in props.expectedResults) {
    let entry: StarData = { year: year, total: 0 }
    for (const day in props.expectedResults[year]) {
      entry.total++
    }
    data.push(entry)
  }

  return (
    <div>
      {data.map((entry, i) => (
        <Text key={i}>
          {entry.year} {entry.total}
        </Text>
      ))}
    </div>
  )
}
