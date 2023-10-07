import { AocApiSystem } from './types'

import {Text} from '@mantine/core'


export default function SystemInformation (props: { info: AocApiSystem }) {
  
    return (
      <div>
        <Text><b>Compiler</b> {props.info.compiler}</Text>
        <Text><b>Architecture</b> {props.info.architecture}</Text>
        <Text><b>Platform</b> {props.info.platform}</Text>
      </div>
    )
  }
  