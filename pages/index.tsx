import { Box, Center, Spinner, Stack } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Layout from '../components/Layout'
import TextList from '../components/text/TextList'
import TextPostButton from '../components/text/TextPostButton'
import UserSettingButton from '../components/user/UserSettingButton'
import { useTextApi } from '../hooks/textApi'
import { useTexts } from '../hooks/texts'
import { useUserApi } from '../hooks/userApi'

export default function Home() {
  const { texts, setTexts, users, setUsers } = useTexts()
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { fetchAll } = useTextApi()
  const { fetchUsersAll } = useUserApi()

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) {
      return
    }

    setLoading(true)

    fetchUsers()
    const newTexts = await fetchAll({ page })

    if (newTexts.length === 0) {
      setHasMore(false)
    } else {
      setTexts([...texts, ...newTexts])
      setPage(page + 1)
    }
    setLoading(false)
  }, [hasMore, page, loading, texts])

  const fetchUsers = useCallback(async () => {
    setUsers(await fetchUsersAll())
  }, [])

  const initialize = useCallback(async () => {
    setTexts(await fetchAll({ page: 1 }))
    fetchUsers()
    setLoading(false)
    setPage(2)
  }, [])

  useEffect(() => {
    initialize()
  }, [])

  return (
    <Layout>
      <InfiniteScroll
        pageStart={1}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <Center key="spinner">
            <Spinner />
          </Center>
        }
      >
        <TextList texts={texts} users={users} />
      </InfiniteScroll>
      <Box position="sticky" bottom={4} width="100%" textAlign="right">
        <Stack spacing={2} direction="column">
          <UserSettingButton />
          <TextPostButton />
        </Stack>
      </Box>
    </Layout>
  )
}
