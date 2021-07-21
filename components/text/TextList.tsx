import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useCallback } from 'react'
import { Text } from '../../models/text'
import { User } from '../../models/user'
import Card from '../Card'
import TextListRow from './TextListRow'

type Props = {
  texts: Text[]
  users: User[]
}

export default function TextList(props: Props) {
  const getUser = useCallback(
    (userId: string) => props.users.find((user) => user.id === userId),
    [props.users]
  )

  return (
    <Box>
      {props.texts.map((text) => (
        <TextListRow key={text.id} text={text} user={getUser(text.userId)} />
      ))}
    </Box>
  )
}
