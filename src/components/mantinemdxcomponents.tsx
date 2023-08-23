import { MDXComponents } from 'mdx/types'
import { Language } from 'prism-react-renderer'

import {
  Anchor,
  Blockquote,
  Code,
  Divider,
  Image,
  List,
  Space,
  Text,
  Title
} from '@mantine/core'
import { Prism } from '@mantine/prism'

const components: MDXComponents = {
  h1: (props: JSX.IntrinsicElements['h1']) => (
    <Title order={1} className='mdx' children={props.children} />
  ),
  h2: (props: JSX.IntrinsicElements['h2']) => (
    <Title order={2} className='mdx' children={props.children} />
  ),
  h3: (props: JSX.IntrinsicElements['h3']) => (
    <Title order={3} className='mdx' children={props.children} />
  ),
  h4: (props: JSX.IntrinsicElements['h4']) => (
    <Title order={4} className='mdx' children={props.children} />
  ),
  h5: (props: JSX.IntrinsicElements['h5']) => (
    <Title order={4} className='mdx' children={props.children} />
  ),
  h6: (props: JSX.IntrinsicElements['h6']) => (
    <Title order={6} className='mdx' children={props.children} />
  ),
  blockquote: (props: JSX.IntrinsicElements['blockquote']) => (
    <Blockquote className='mdx' children={props.children} />
  ),
  code: (props: JSX.IntrinsicElements['code']) =>
    // Language type includes bash, javascript, jsx, ccs,
    // json, markdown, python, typescript
    props.className ? (
      <Prism
        className='mdx'
        language={props.className.replace('language-', '') as Language}
        children={props.children as string}
        withLineNumbers
      />
    ) : (
      <Code className='mdx' children={props.children} />
    ),
  p: (props: JSX.IntrinsicElements['p']) => (
    <Text className='mdx' children={props.children} />
  ),
  i: (props: JSX.IntrinsicElements['i']) => (
    <Text className='mdx' italic={true} children={props.children} />
  ),
  b: (props: JSX.IntrinsicElements['b']) => (
    <Text className='mdx' weight='bold' children={props.children} />
  ),
  ol: (props: JSX.IntrinsicElements['ol']) => (
    <List className='mdx' type='ordered' children={props.children} />
  ),
  ul: (props: JSX.IntrinsicElements['ul']) => (
    <List className='mdx' children={props.children} />
  ),
  li: (props: JSX.IntrinsicElements['li']) => (
    <List.Item className='mdx' children={props.children} />
  ),
  img: (props: JSX.IntrinsicElements['img']) => (
    <Image
      className='mdx'
      src={props.src}
      alt={props.alt}
      title={props.title}
    />
  ),
  a: (props: JSX.IntrinsicElements['a']) => (
    <Anchor
      className='mdx'
      href={props.href}
      title={props.title}
      children={props.children}
      target='_blank'
    />
  ),
  hr: () => <Divider className='mdx' />,
  br: () => <Space className='mdx' />
}

export default components
