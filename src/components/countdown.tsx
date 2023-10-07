import { useInterval } from '@mantine/hooks'

import { useEffect, useState } from 'react'

import { Text } from '@mantine/core'

function targetDate (date: Date) {
  // work out when the next puzzle is released
  for (let day = 1; day <= 25; day++) {
    let target = new Date(Date.UTC(date.getFullYear(), 11, day, 0, 5, 0))
    if (date < target) return target
  }
  // the puzzle must be next year!
  return new Date(Date.UTC(date.getFullYear() + 1, 11, 1, 0, 5, 0))
}

function writeMessage (): string {
  const now = new Date(Date.now())
  const target = targetDate(now)
  const diff = target.getTime() - now.getTime()
  const days = Math.floor(diff / 1000 / 60 / 60 / 24)
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24
  const minutes = Math.floor(diff / 1000 / 60) % 60
  const seconds = Math.floor(diff / 1000) % 60

  if (now.getDay() == 25 && now.getMonth() == 12) {
    return "Happy Christmas - Hope you enjoyed this year's Advent of Code!!!"
  } else if (days > 0) {
    return `${days} days til Advent of Code ${now.getFullYear()}`
  } else if (hours > 0) {
    return `${hours} hours ${minutes} min til Advent of Code ${now.getFullYear()}`
  } else {
    return `${minutes} min ${seconds} sec until the next AoC puzzle`
  }
}

export default function Countdown () {
  // prepare the timer
  const [message, setMessage] = useState('')
  const timer = useInterval(() => setMessage(writeMessage()), 1000)
  useEffect(() => {
    setMessage(writeMessage())
    timer.start()
    return timer.stop
  }, [])

  return (
    <div>
      <Text>{message}</Text>
    </div>
  )
}
