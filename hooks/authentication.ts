import { useCallback, useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'

const localStorageUserIdKey = 'userId'

const currentUserIdState = atom<string>({
  key: 'authentication/currentUserId',
  default: '',
})

export function useAuthentication() {
  const [currentUserId, setCurrentUserId] = useRecoilState(currentUserIdState)

  useEffect(() => {
    const userId = localStorage.getItem(localStorageUserIdKey)
    if (!userId) {
      return
    }

    setCurrentUserId(userId)
  }, [])

  const setUserId = useCallback((userId: string) => {
    setCurrentUserId(userId)
    localStorage.setItem(localStorageUserIdKey, userId)
  }, [])

  return { currentUserId, setUserId }
}
