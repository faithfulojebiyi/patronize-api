import mysql from 'mysql2'
import config from '../../../config'

const db = mysql.createConnection(config.DATABASE_URL).promise()

export default db
