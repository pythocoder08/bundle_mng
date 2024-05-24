import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import * as Sentry from '@sentry/node'

import config from './config/config.js'
import connection from './database/conn.js'

import * as errorHandler from './middlewares/errors.js'

import routes from './routes'

Sentry.init({ dsn: process.env.SENTRY_DSN })

const { HOST, PORT } = config

const app = express()

app.use(express.json())

connection
  .authenticate()
  .then(() => {
    console.log('DB connected.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

// This request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler())

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(morgan('----> :method :url :status'))
app.use(bodyParser.json())
app.use(errorHandler.bodyParser)
app.use(express.json())

app.use(express.static(path.join(__dirname, './../public/build')))

app.use('/api', routes)

// This error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler())

app.use(errorHandler.genericErrorHandler)
app.use(errorHandler.notFound)
app.use(errorHandler.methodNotAllowed)

app.listen((HOST, PORT), () => console.log(`Server is listening on ${HOST}:${PORT}`))

// Catch unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection', err)

  try {
    Sentry.captureException(err)
  } catch (err) {
    console.error('Sentry error', err)
  } finally {
    process.exit(1)
  }
})

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception', err)

  try {
    Sentry.captureException(err)
  } catch (err) {
    console.error('Sentry error', err)
  } finally {
    process.exit(1)
  }
})

export default app
