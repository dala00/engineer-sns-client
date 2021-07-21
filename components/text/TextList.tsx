import { Box } from '@chakra-ui/react'
import React from 'react'
import { Text } from '../../models/text'
import Card from '../Card'

type Props = {
  texts: Text[]
}

export default function TextList(props: Props) {
  return (
    <Box>
      {props.texts.map((text) => (
        <Card key={text.id} my={4} whiteSpace="pre-wrap">
          <>
            <Box fontSize={9} color="gray.700" mb={1}>
              {text.createdAt.format('YYYY/MM/DD HH:mm:ss')}
            </Box>
            <Box>{text.text}</Box>
          </>
        </Card>
      ))}
    </Box>
  )
}
