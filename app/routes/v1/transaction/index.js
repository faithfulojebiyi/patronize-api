import { Router } from 'express'
import { cardSchema, chargeOtpSchema, bankSchema, withdrawalSchema } from '../../../validations'
import {
  ValidationMiddleware, TransactionMiddleware,
  AuthenticateMiddleware, WalletMiddleware, BeneficiaryMiddleware
} from '../../../middlewares'
import { TransactionController } from '../../../controllers'

const { validate } = ValidationMiddleware
const {
  addTransactionref, initCardCharge, initBankTransfer,
  validateCharge, verifyCharge, withdrawToBank
} = TransactionMiddleware
const { authenticate } = AuthenticateMiddleware
const { fetchUserWalletById, checkTransferStatus } = WalletMiddleware
const { createCardTransaction, createBankTransaction } = TransactionController
const { getBeneficiary, validatedBeneficiary } = BeneficiaryMiddleware

const router = Router()

router.use(authenticate)

router.post(
  '/fundwallet-card',
  validate(cardSchema),
  addTransactionref,
  initCardCharge
)

router.post(
  '/validate-charge',
  validate(chargeOtpSchema),
  validateCharge,
  verifyCharge,
  fetchUserWalletById,
  createCardTransaction
)

router.post(
  '/fundwallet-bank',
  validate(bankSchema),
  addTransactionref,
  initBankTransfer,
  fetchUserWalletById,
  createBankTransaction
)

router.post(
  '/withdraw',
  validate(withdrawalSchema),
  fetchUserWalletById,
  checkTransferStatus,
  getBeneficiary,
  validatedBeneficiary,
  withdrawToBank
)

export default router
