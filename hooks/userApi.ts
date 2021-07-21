import axios from 'axios'
import { API_ENDPOINT } from '../lib/constants'
import { UserResponse, toUser } from '../models/user'

type UserAllResponseData = UserResponse[]

export function useUserApi() {
  async function fetchUsersAll() {
    const response = await axios.get<UserAllResponseData>(
      `${API_ENDPOINT}/user/all`
    )
    return response.data.map((userData) => toUser(userData))
  }

  return { fetchUsersAll }
}
