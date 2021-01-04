import * as express from 'express'
import { syncHandler } from './utils'
import { DocumentType } from '@typegoose/typegoose'
import UserModel, { User } from '../models/user'
import { generatePassword, verifyPassword, generateToken } from '../models/auth'
import { tokenAuth, requiredBody, requiredQueryParams, mirrorTo } from './middlewares'
import { HttpCodeError } from './errorHandlers'

const router = express.Router()

const mirror = mirrorTo(process.env.PB_ANALYTICS_URI)

console.log(process.env.PB_ANALYTICS_URI)

router.post('/challenges', mirror, syncHandler(async (req, res) => {
  // Do nothing
  console.log("challenges", req.body)
  res.end()
}))

router.post('/solutions', mirror, syncHandler(async (req, res) => {
  // TODO: Try authenticate
  // TODO: Save user solution if logged
  console.log("solutions", req.body)
  res.end()
}))

router.put('/solutions/:id', mirror, syncHandler(async (req, res) => {
  // TODO: Try authenticate
  // TODO: Update user solution if logged
  console.log("result", req.body)
  res.end()
}))

export default router