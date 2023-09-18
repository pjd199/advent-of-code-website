import { AocApiSystem } from './types'

import {Text} from '@mantine/core'


export default function SystemInformation (props: { info: AocApiSystem }) {
  
    return (
      <div>
        <Text>Compiler {props.info.compiler}</Text>
        <Text>Architecture {props.info.architecture}</Text>
        <Text>Platform {props.info.platform}</Text>
      </div>
    )
  }
  