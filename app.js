import express from 'express'
import { appConfig, Logger } from './config'

global.logger = Logger.createLogger({ label: 'PATRONIZE_API' })

const app = express()

appConfig(app)

export default app
