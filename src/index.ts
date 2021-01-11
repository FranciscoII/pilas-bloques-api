import * as dotenv from 'dotenv'
import * as express from 'express'
import * as mongoose from 'mongoose'
import fetch from 'node-fetch'

dotenv.config() // Do first!
const { log } = console
global.fetch = fetch as any

import routes from './routes'

// DB
const dbUri = process.env.DB_CONNECTION_URI
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: true,
})

// SERVER
const port = process.env.PORT
const app = express()
app.use(routes)
app.listen(port, () => {
  log(`Server started at ${port}`)
})