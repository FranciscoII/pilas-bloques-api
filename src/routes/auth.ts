import * as express from 'express'
import { syncHandler } from './utils'
import { DocumentType } from '@typegoose/typegoose'
import UserModel, { User } from '../models/user'
import { generatePassword, verifyPassword, generateToken } from '../models/auth'
import { tokenAuth } from './middlewares'

type AuthteticatedRequest = express.Request & { user: DocumentType<User> }

const router = express.Router()

router.post('/register', syncHandler(async ({ body }: AuthteticatedRequest, res) => {
  const credentials = { ...body.credentials, ...generatePassword(body.credentials.password) }
  const user = await UserModel.create({ ...body, credentials })
  res.json(user.profile)
}))

router.post('/login', syncHandler(async ({ body }: AuthteticatedRequest, res) => {
  const user = await UserModel.findByUsername(body.username).exec()
  if (!user || !verifyPassword(body.password, user.credentials)) throw "Contraseña incorrecta"
  const token = generateToken({ username: user.credentials.username })
  res.json({ token, ...user.profile })
}))

router.get('/profile', tokenAuth, syncHandler(async ({ user }: AuthteticatedRequest, res) => {
  res.json(user.profile)
}))

export default router