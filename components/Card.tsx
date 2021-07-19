import { Box } from '@chakra-ui/react'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Box> & {
  children: JSX.Element
}

export default function Card(props: Props) {
  return (
    <Box bgColor="gray.50" borderRadius={10} padding={4} {...props}>
      {props.children}
    </Box>
  )
}
