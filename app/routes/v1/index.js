import { Router } from 'express'
import auth from './auth'
import transaction from './transaction'
import user from './user'
import webhook from './webhook'

const router = Router()

router.use('/auth', auth)
router.use('/transaction', transaction)
router.use('/user', user)
router.use('/webhook', webhook)

export default router
