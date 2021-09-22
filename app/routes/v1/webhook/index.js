import { Router } from 'express'
import { TransactionMiddleware } from '../../../middlewares'

const router = Router()

const { verifyBankTransfer } = TransactionMiddleware
router.post(
  '/success',
  verifyBankTransfer
)

// router.post(
//   '/fail'
// )

export default router
