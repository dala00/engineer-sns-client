import {
  Box,
  Button,
  IconButton,
  Input,
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
import { useMemo } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { MdPerson } from 'react-icons/md'
import { useAuthentication } from '../../hooks/authentication'
import { useTexts } from '../../hooks/texts'
import { useUserApi } from '../../hooks/userApi'

export default function UserSettingButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { fetchUsersAll, postUser, updateUser } = useUserApi()
  const { users, setUsers } = useTexts()
  const { currentUserId, setUserId } = useAuthentication()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId),
    [users, currentUserId]
  )

  useEffect(() => {
    if (!currentUser) {
      return
    }

    setName(currentUser.name)
    setDescription(currentUser.description)
  }, [currentUser])

  const submit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (currentUser) {
        await updateUser(name, description)
      } else {
        const userId = await postUser(name, description)
        setUserId(userId)
      }
      onClose()

      fetchUsersAll().then((users) => setUsers(users))
    },
    [name, description, currentUserId]
  )

  return (
    <Box>
      <IconButton
        colorScheme="teal"
        aria-label="Open post form"
        icon={<MdPerson />}
        onClick={onOpen}
        borderRadius="50%"
        size="lg"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <form onSubmit={submit}>
            <ModalHeader>ユーザー設定</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                type="text"
                placeholder="名前"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Textarea
                placeholder="紹介文"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                my={2}
              />
            </ModalBody>

            <ModalFooter>
              <Button type="button" variant="ghost" onClick={onClose}>
                キャンセル
              </Button>
              <Button type="submit" colorScheme="teal" mr={3}>
                更新
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  )
}
