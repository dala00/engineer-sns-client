import axios from 'axios'
import { API_ENDPOINT } from '../lib/constants'
import { TextResponse, toText } from '../models/text'

type FetchAllArgs = {
  page: number
}

type PostArgs = {
  text: string
}

type TextAllResponseData = TextResponse[]

const limit = 20

export function useTextApi() {
  async function fetchAll(args: FetchAllArgs) {
    const response = await axios.get<TextAllResponseData>(
      `${API_ENDPOINT}/text/all?$orderby=_created_at+desc&$skip=${
        (args.page - 1) * limit
      }&$limit=${limit}`
    )
    return response.data.map((textData) => toText(textData))
  }

  async function post(args: PostArgs) {
    const { text } = args
    await axios.post(
      `${API_ENDPOINT}/text`,
      { text },
      { headers: { Authorization: 'HelloWorld' } }
    )
  }

  return { fetchAll, post }
}
