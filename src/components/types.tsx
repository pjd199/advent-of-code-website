export type Result = {
  title: string
  year: number
  day: number
  part_one: number
  part_two?: number
}

export type YearResults = {
  [key: string]: Result | undefined
}

export type ExpectedResults = {
  [key: string]: YearResults | undefined
}
