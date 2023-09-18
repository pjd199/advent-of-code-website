import { AocApiCalendars } from "@/components/types"
import { Text } from "@mantine/core"

import Star, { StarData } from "../../components/stars"

import type { InferGetStaticPropsType, GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps<{
  calendars: AocApiCalendars
}> = async () => {
  const response = await fetch(
    "https://api.adventofcode.dibdin.me/calendars"
  )
  const body = await response.json()
  const calendars = body.results

  return { props: { calendars } }
}

export default function Page ({
  calendars
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <Star calendars={calendars} />
}
