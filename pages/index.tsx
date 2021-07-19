import { Center, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import TextList from '../components/text/TextList'
import { API_ENDPOINT } from '../lib/constants'
import { Text } from '../models/text'

type TextAllResponseData = Text[]

export default function Home() {
  const [texts, setTexts] = useState<Text[]>([])
  const [loading, setLoading] = useState(true)

  const initialize = useCallback(async () => {
    const response = await axios.get<TextAllResponseData>(
      `${API_ENDPOINT}/text/all`
    )
    setTexts(response.data.reverse())
    setLoading(false)
  }, [])

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
