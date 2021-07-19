import { Center, Spinner } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Layout from '../components/Layout'
import TextList from '../components/text/TextList'
import TextPostButton from '../components/text/TextPostButton'
import { useTextApi } from '../hooks/textApi'
import { useTexts } from '../hooks/texts'

export default function Home() {
  const { texts, setTexts } = useTexts()
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { fetchAll } = useTextApi()

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) {
      return
    }

    setLoading(true)

    const newTexts = await fetchAll({ page })

    if (newTexts.length === 0) {
      setHasMore(false)
    } else {
      setTexts([...texts, ...newTexts])
      setPage(page + 1)
    }
    setLoading(false)
  }, [hasMore, page, loading, texts])

  const initialize = useCallback(async () => {
    setTexts(await fetchAll({ page: 1 }))
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
        <TextList texts={texts} />
      </InfiniteScroll>
      <TextPostButton />
    </Layout>
  )
}
