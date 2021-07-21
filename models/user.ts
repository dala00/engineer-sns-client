export type User = {
  id: string
  name: string
  description: string
}

export type UserResponse = {
  id: string
  name: string
  description: string
}

export function toUser(userResponse: UserResponse): User {
  return userResponse
}
