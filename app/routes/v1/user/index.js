import { Router } from 'express'
import { transferSchema, beneficiarySchema } from '../../../validations'
import {
  ValidationMiddleware, AuthenticateMiddleware,
  UserMiddleware, WalletMiddleware, BeneficiaryMiddleware
} from '../../../middlewares'
import { TransactionController, BeneficiaryController } from '../../../controllers'

const { validate } = ValidationMiddleware
const { authenticate } = AuthenticateMiddleware
const { fetchReceiver } = UserMiddleware
const { fetchUserWalletById, fetchReceiverWalletById, checkTransferStatus } = WalletMiddleware
const { createTransfer } = TransactionController
const { verifyAccountNo } = BeneficiaryMiddleware
const { createBeneficiary } = BeneficiaryController

const router = Router()

router.use(authenticate)

router.post(
  '/sendmoney',
  validate(transferSchema),
  fetchUserWalletById,
  checkTransferStatus,
  fetchReceiver,
  fetchReceiverWalletById,
  createTransfer
)

router.post(
  '/addbeneficiary',
  validate(beneficiarySchema),
  verifyAccountNo,
  createBeneficiary
)

export default router
