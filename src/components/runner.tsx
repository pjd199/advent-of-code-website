import { useState } from 'react'

import { AocApiPuzzle, AocApiResults } from '@/components/types'
import {
  Button,
  Collapse,
  FileInput,
  Group,
  Progress,
  Stepper,
  Radio,
  Text,
  TextInput,
  Title
} from '@mantine/core'

import { useInterval } from '@mantine/hooks'

import { IconCloud, IconFileText, IconReport } from '@tabler/icons-react'

export default function Runner (props: { puzzle : AocApiPuzzle }) {
  let [urlValue, setUrlValue] = useState(
    `https://raw.githubusercontent.com/pjd199/advent_of_code_python/main/puzzle_input/year${props.puzzle.year}/day${props.puzzle.day}.txt`
  )
  // TODO: DEFINE THE RESULT TYPE
  let [results, setResults] = useState<AocApiResults | null>(null)
  let [fileOrUrl, setFileOrUrl] = useState('url')
  let [file, setFile] = useState<File | null>(null)
  let [active, setActive] = useState(0)
  let [startTime, setStartTime] = useState(Date.now())
  let [finishTime, setFinishTime] = useState(Date.now())
  const timer = useInterval(() => setFinishTime(Date.now()), 42)

  let averageTime =
    props.puzzle.timings.parse + props.puzzle.timings.part_one + props.puzzle.timings.part_two

  const handleUrlClick = async () => {
    let answers_link = props.puzzle.links.find(
      x => x.rel == 'answers' && x.parameters && x.parameters.includes('input')
    )
    if (!answers_link) {
      return
    }
    setStartTime(Date.now())
    setFinishTime(Date.now())
    timer.start()
    setActive(1)

    const response = await fetch(`${answers_link.href}?input=${urlValue}`, {
      headers: { 'cache-control': 'no-cache' },
      cache: 'no-store'
    })
    const body = await response.json()
    setResults(body.results)
    timer.stop()
    setActive(2)
  }

  const handleFileClick = async () => {
    let answers_link = props.puzzle.links.find(
      x => x.rel == 'answers' && x.action == 'POST'
    )
    if (!answers_link) {
      return
    }
    setStartTime(Date.now())
    setFinishTime(Date.now())
    timer.start()
    setActive(1)

    const response = await fetch(answers_link.href, {
      method: 'POST',
      headers: { 'cache-control': 'no-cache' },
      cache: 'no-store',
      body: file
    })
    const body = await response.json()
    setResults(body.results)
    timer.stop()
    setActive(2)
  }

  let urlRegex =
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/

  let elapsedTime = finishTime - startTime

  return (
    <Stepper active={active} onStepClick={setActive} breakpoint='sm'>
      <Stepper.Step
        icon={<IconFileText />}
        label='Input'
        description='Select puzzle input source'
        allowStepSelect={false}
      >
        <Radio.Group
          label='Would you like to load your puzzle input from a URL or upload a file?'
          value={fileOrUrl}
          onChange={setFileOrUrl}
        >
          <Group>
            <Radio value='url' label='Load from URL' />
            <Radio value='file' label='Upload file' />
          </Group>
        </Radio.Group>
        <Collapse in={fileOrUrl == 'url'}>
          <TextInput
            value={urlValue}
            onChange={event => setUrlValue(event.currentTarget.value)}
            label='Puzzle Input URL'
            error={
              urlRegex.test(urlValue)
                ? false
                : 'Please enter a valid URL, including protocol'
            }
          />
          <Button onClick={handleUrlClick} disabled={!urlRegex.test(urlValue)}>
            Solve puzzle
          </Button>
        </Collapse>
        <Collapse in={fileOrUrl == 'file'}>
          <FileInput
            placeholder='Pick file'
            label='Upload puzzle input file'
            value={file}
            onChange={setFile}
          />
          <Button onClick={handleFileClick} disabled={!file}>
            Solve puzzle
          </Button>
        </Collapse>
      </Stepper.Step>

      <Stepper.Step
        icon={<IconCloud />}
        label='Solve'
        description='Solve using AWS lambda'
        loading={active == 1}
        allowStepSelect={false}
      >
        <Text>
          Elapsed Time: {(elapsedTime / 1000).toFixed(2)}s
          {elapsedTime > (averageTime + 1000) && ' (taking longer than expected)'}
        </Text>
        <Progress
          radius='xl'
          size={24}
          value={(elapsedTime / (averageTime + 1000)) * 100}
          animate={elapsedTime > (averageTime + 1000)}
        />
      </Stepper.Step>

      <Stepper.Step
        icon={<IconReport />}
        label='Results'
        description='View results'
        allowStepSelect={false}
      >
        <Text>
          <Title order={3}>Results</Title>
          {results && (
            <>
              <Text>Part One: {results.part_one}</Text>
              {props.puzzle.has_part_two && <Text>Part Two: {results.part_two}</Text>}
              <Title order={3}>Timings</Title>
              <Text>
                Parse: {results.timings.parse}
                {results.timings.units}
              </Text>
              <Text>
                Part One: {results.timings.part_one}
                {results.timings.units}
              </Text>
              <Text>
                Part Two: {results.timings.part_two}
                {results.timings.units}
              </Text>
            </>
          )}
        </Text>
        <Button onClick={() => setActive(0)}>Restart</Button>
      </Stepper.Step>
    </Stepper>
  )
}
