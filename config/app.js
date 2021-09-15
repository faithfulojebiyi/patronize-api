import cors from 'cors'
import { json, urlencoded } from 'express'
import helmet from 'helmet'
import config from './env'
const morgan = require('morgan')

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
  // adds a heartbeat route for the culture
  app.get('/', (req, res) => res.send('success'))
  // initialize the port constant
  const port = config.PORT || 3000
  // server listens for connections
  app.listen(port, () => {
    logger.info(`${'PATRONIZE'} ${port}`)
  })
}

export default appConfig