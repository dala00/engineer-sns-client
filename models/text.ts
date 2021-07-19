import dayjs, { Dayjs } from 'dayjs'

export type Text = {
  id: string
  text: string
  createdAt: Dayjs
  updatedAt: Dayjs
  userId: string
}

export type TextResponse = {
  id: string
  text: string
  _created_at: string
  _updated_at: string
  _user_id: string
}

export function toText(textResponse: TextResponse) {
  return {
    id: textResponse.id,
    text: textResponse.text,
    createdAt: dayjs(textResponse._created_at),
    updatedAt: dayjs(textResponse._updated_at),
    userId: textResponse._user_id,
  }
}
