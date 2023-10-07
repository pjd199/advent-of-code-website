export type AocApiLink = {
  rel: string
  href: string
  description: string
  action: string
  parameters: string[]
}

export type AocApiCalendar = {
  year: number
  days: [number]
  links: [AocApiLink]
}

export type AocApiCalendars = [AocApiCalendar]

export type AocApiPuzzleTimings = {
  unit: string
  parse: number
  part_one: number
  part_two: number
}

export type AocApiPuzzle = {
  year: number
  day: number
  title: string
  excerpt: string
  has_part_one: boolean
  has_part_two: boolean
  part_one_solved: boolean
  part_two_solved: boolean
  completion_date: string
  timings: AocApiPuzzleTimings
  reposiroty_url: string
  code_url: string
  official_url: string
  links: [AocApiLink]
}

export type AocApiPuzzles = [AocApiPuzzle]

export type AocApiTimings = {
  parse: number
  part_one: number
  part_two: number
  units: string
}
export type AocApiResults = {
  year: number
  day: number
  part_one: string
  part_two?: string
  timings: AocApiTimings
}

export type AocApiSystem = {
  base_url: string
  host: string
  platform: string
  machine: string
  architecture: string
  compiler: string
  license_url: string
  license: string
}
