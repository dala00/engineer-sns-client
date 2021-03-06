import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { MdAdd } from 'react-icons/md'
import { useTextApi } from '../../hooks/textApi'
import { useTexts } from '../../hooks/texts'
import { useUserApi } from '../../hooks/userApi'

export default function TextPostButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { post, fetchAll } = useTextApi()
  const { fetchUsersAll } = useUserApi()
  const { mergeNewTexts, setUsers } = useTexts()
  const [text, setText] = useState('')

  const submit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      await post({ text })
      setText('')
      onClose()

      fetchUsersAll().then((users) => setUsers(users))
      const texts = await fetchAll({ page: 1 })
      mergeNewTexts(texts)
    },
    [text]
  )

  return (
    <Box>
      <IconButton
        colorScheme="teal"
        aria-label="Open post form"
        icon={<MdAdd />}
        onClick={onOpen}
        borderRadius="50%"
        size="lg"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <form onSubmit={submit}>
            <ModalHeader>投稿する</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                placeholder="投稿内容"
                onChange={(e) => setText(e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Button type="button" variant="ghost" onClick={onClose}>
                キャンセル
              </Button>
              <Button type="submit" colorScheme="teal" mr={3}>
                投稿
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  )
}
