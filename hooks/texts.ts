import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { Text } from '../models/text'

const textsState = atom<Text[]>({
  key: 'texts/texts',
  default: [],
})

export function useTexts() {
  const [texts, setTexts] = useRecoilState(textsState)

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

  return { texts, setTexts, mergeNewTexts }
}
