import {
  Box,
  Flex,
  Image,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
} from '@chakra-ui/react'
import React from 'react'
import { useCallback } from 'react'
import { Text } from '../../models/text'
import { User } from '../../models/user'
import Card from '../Card'

type Props = {
  text: Text
  user?: User
}

type ParsedText = {
  body: string
  urls: string[]
  imageUrls: string[]
}

export default function TextListRow(props: Props) {
  const { text, user } = props

  const parseText = useCallback((): ParsedText => {
    const matches = text.text.match(
      /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g
    )
    if (!matches) {
      return {
        body: text.text,
        urls: [],
        imageUrls: [],
      }
    }

    let body = text.text
    const urls = []
    const imageUrls = []
    matches.forEach((url) => {
      body = body.replace(url, '')
      if (url.match(/\.(png|jpe?g|gif|svg)$/)) {
        imageUrls.push(url)
      } else {
        urls.push(url)
      }
    })
    return { body: body.trim(), urls, imageUrls }
  }, [text])

  const parsedText = parseText()

  return (
    <Card key={text.id} my={4} whiteSpace="pre-wrap">
      <>
        <Flex alignItems="center" mb={2}>
          {user ? (
            <Popover>
              <PopoverTrigger>
                <Box fontSize={10} color="teal.400" mr={2} cursor="pointer">
                  {user.name}
                </Box>
              </PopoverTrigger>
              <PopoverContent fontSize={12}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>{user.name}</PopoverHeader>
                <PopoverBody>
                  <Box>{user.id}</Box>
                  <Box>{user.description}</Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : (
            <Box fontSize={9} color="gray.700" mr={2}>
              {text.userId}
            </Box>
          )}
          <Box fontSize={9} color="gray.700" display="inline-block">
            {text.createdAt.format('YYYY/MM/DD HH:mm:ss')}
          </Box>
        </Flex>
        <Box>{parsedText.body}</Box>
        {parsedText.urls.length > 0 && (
          <Box mt={2}>
            {parsedText.urls.map((url) => (
              <Box key={url}>
                <Link href={url} color="teal.500" isExternal>
                  {url}
                </Link>
              </Box>
            ))}
          </Box>
        )}
        {parsedText.imageUrls.map((url) => (
          <Box key={url} my={2}>
            <Image src={url} alt="" />
          </Box>
        ))}
      </>
    </Card>
  )
}
