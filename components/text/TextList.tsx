import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useCallback } from 'react'
import { Text } from '../../models/text'
import { User } from '../../models/user'
import Card from '../Card'

type Props = {
  texts: Text[]
  users: User[]
}

export default function TextList(props: Props) {
  const getUserName = useCallback(
    (userId: string) => {
      const user = props.users.find((user) => user.id === userId)
      if (user) {
        return user.name
      }
      return undefined
    },
    [props.users]
  )

  return (
    <Box>
      {props.texts.map((text) => (
        <Card key={text.id} my={4} whiteSpace="pre-wrap">
          <>
            <Flex alignItems="center" mb={2}>
              {getUserName(text.userId) ? (
                <Box fontSize={10} color="gray.700" mr={2}>
                  {getUserName(text.userId)}
                </Box>
              ) : (
                <Box fontSize={9} color="gray.700" mr={2}>
                  {text.userId}
                </Box>
              )}
              <Box fontSize={9} color="gray.700" display="inline-block">
                {text.createdAt.format('YYYY/MM/DD HH:mm:ss')}
              </Box>
            </Flex>
            <Box>{text.text}</Box>
          </>
        </Card>
      ))}
    </Box>
  )
}
