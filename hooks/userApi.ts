import axios from 'axios'
import { API_ENDPOINT } from '../lib/constants'
import { UserResponse, toUser } from '../models/user'

type UserAllResponseData = UserResponse[]

type PostUserResponseData = {
  id: string
}

export function useUserApi() {
  async function fetchUsersAll() {
    const response = await axios.get<UserAllResponseData>(
      `${API_ENDPOINT}/user/all`
    )
    return response.data.map((userData) => toUser(userData))
  }

  async function postUser(name: string, description: string) {
    const response = await axios.post<PostUserResponseData>(
      `${API_ENDPOINT}/user/create_user`,
      { name, description }
    )
    return response.data.id
  }

  async function updateUser(name: string, description: string) {
    const response = await axios.put<PostUserResponseData>(
      `${API_ENDPOINT}/user/create_user`,
      { name, description }
    )
    return response.data.id
  }

  return { fetchUsersAll, postUser, updateUser }
}
