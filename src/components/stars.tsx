import { Text } from '@mantine/core'

import { AocApiCalendars } from './types'

export type StarData = {
  year: number
  total: number
}

export default function Star(props: { calendars: AocApiCalendars }) {
  //let data: StarData[] = []
  
  let data = props.calendars.map((x) => ({ year: x.year, total: x.days.length * 2 }))

  // for (const calendar of props.calendars) {
  //   data.push({ year: calendar.year, puzzles_link: calendar.links[0].href, total: calendar.days.length * 2 })
  // }
  // let data: StarData[] = []
  // for (const year in props.expectedResults) {
  //   let entry: StarData = { year: year, total: 0 }
  //   for (const day in props.expectedResults[year]) {
  //     entry.total++
  //   }
  //   data.push(entry)
  // }

  return (
    <div>
      {data.map((entry, i) => (
        <Text key={i}>
          <b>{entry.year}</b> ... {entry.total} stars
        </Text>
      ))}
    </div>
  )
}
