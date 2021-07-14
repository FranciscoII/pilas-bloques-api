import { User } from "pilas-bloques-models"

export const username = 'USERNAME'
export const password = 'PASSWORD'
export const parentDNI = 'DNI'

export const userJson: Partial<User> = {
  username: username.toLowerCase(),
  parentName: 'string',
  parentDNI,
  profile: {
    nickName: username,
    avatarURL: 'string'
  }
}