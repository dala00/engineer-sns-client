import { Center, Spinner } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import TextList from '../components/text/TextList'
import { useTextApi } from '../hooks/textApi'
import { Text } from '../models/text'

export default function Home() {
  const [texts, setTexts] = useState<Text[]>([])
  const [loading, setLoading] = useState(true)
  const { fetchAll } = useTextApi()

  const initialize = useCallback(async () => {
    setTexts(await fetchAll({ page: 1 }))
    setLoading(false)
  }, [fetchAll])

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <Layout>
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <TextList texts={texts} />
      )}
    </Layout>
  )
}
