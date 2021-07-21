import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { Text } from '../models/text'
import { User } from '../models/user'

const textsState = atom<Text[]>({
  key: 'texts/texts',
  default: [],
})

const usersState = atom<User[]>({
  key: 'texts/users',
  default: [],
})

export function useTexts() {
  const [texts, setTexts] = useRecoilState(textsState)
  const [users, setUsers] = useRecoilState(usersState)

  const mergeNewTexts = useCallback(
    (newTexts: Text[]) => {
      const firstId = texts[0].id
      const index = newTexts.findIndex((text) => text.id === firstId)
      if (index === -1) {
        setTexts([...newTexts, ...texts])
      } else {
        const sliced = newTexts.slice(0, index)
        setTexts([...sliced, ...texts])
      }
    },
    [texts]
  )

  return { texts, setTexts, mergeNewTexts, users, setUsers }
}
