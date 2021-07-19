import {
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
import React, { FormEventHandler } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { MdAdd } from 'react-icons/md'
import { useTextApi } from '../../hooks/textApi'

export default function TextPostButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { post } = useTextApi()
  const [text, setText] = useState('')

  const submit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      await post({ text })
      onClose()
    },
    []
  )

  return (
    <>
      <IconButton
        colorScheme="teal"
        aria-label="Open post form"
        icon={<MdAdd />}
        onClick={onOpen}
        position="fixed"
        right={4}
        bottom={4}
        borderRadius="50%"
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
    </>
  )
}
