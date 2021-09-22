import cors from 'cors'
import path from 'path'
import { json, urlencoded } from 'express'
import helmet from 'helmet'
import config from './env'
import apiV1Routes from '../app/routes/v1'
import { Helper, genericErrors, constants } from '../app/utils'
import favicon from 'serve-favicon'
const morgan = require('morgan')

const { errorResponse, successResponse } = Helper
const { notFoundApi } = genericErrors
const { WELCOME, v1 } = constants
const appConfig = async (app) => {
  // integrate winston logger with morgan
  app.use(morgan('combined', { stream: logger.stream }))
  // adds security middleware to handle potential attacks from HTTP requests
  app.use(helmet())
  // adds middleware for cross-origin resource sharing configuration
  app.use(cors())
  // adds middleware that parses requests whose content-type is application/json
  app.use(json())
  // adds middleware that parses requests with x-www-form-urlencoded data encoding
  app.use(urlencoded({ extended: true }))
  // serves favicon
  app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
  // adds a heartbeat route for the culture
  app.get('/', (req, res) => successResponse(res, { message: WELCOME }))
  // serves v1 api routes
  app.use(v1, apiV1Routes)
  // catches 404 errors and forwards them to error handlers
  app.use((req, res, next) => {
    next(notFoundApi)
  })
  // handles all forwarded errors
  app.use((err, req, res, next) => errorResponse(req, res, err))
  // initialize the port constant
  const port = config.PORT || 3000
  // server listens for connections
  app.listen(port, () => {
    logger.info(`${'PATRONIZE'} ${port}`)
  })
}

export default appConfig
