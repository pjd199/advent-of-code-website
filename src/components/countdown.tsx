import { useInterval } from '@mantine/hooks'

import { useEffect, useState } from 'react'

import { Text, Title } from '@mantine/core'

function targetDate (now: Date) {
  // work out when the next puzzle is released
  for (let i = 1; i <= 25; i++) {
    let target = new Date(
      `${now.getFullYear()}-12-${i.toString().padStart(2, '0')} 00:00:00 UTC-5`
    )
    if (now < target) return target
  }
  // the puzzle must be next year!
  return new Date(`${now.getFullYear() + 1}-12-01 00:00:00 UTC-5`)
}

export default function Countdown () {
  // prepare the timer
  const [now, setNow] = useState(new Date(0))
  const timer = useInterval(() => setNow(new Date(Date.now())), 1000)
  useEffect(() => {
    setNow(new Date(Date.now()))
    timer.start()
    return timer.stop
  }, [])

  // work out the countdown difference
  const target = targetDate(now) 
  const diff = target.getTime() - now.getTime()
  const days = Math.floor(diff / 1000 / 60 / 60 / 24)
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24
  const minutes = Math.floor(diff / 1000 / 60) % 60
  const seconds = Math.floor(diff / 1000) % 60
  const isChristmasDay = now.getDay() == 25 && now.getMonth() == 12

  return (
    <div>
      {isChristmasDay ? (
        <Text>
          Happy Christmas - Hope you enjoyed this year's Advent of Code!!!
        </Text>
      ) : (
        <Text>
          Countdown to the {target.getDate().toString().padStart(2, '0')}/
          {target.getFullYear()} AOC puzzle: {days} days, {hours} hours, {minutes}{' '}
          minutes, {seconds} seconds
        </Text>
      )}
    </div>
  )
}
