import { Router } from 'express'
import { userSchema, signinSchema } from '../../../validations'
import { UserController, AuthController } from '../../../controllers'
import { ValidationMiddleware, UserMiddleware, AuthMiddleware, AuthenticateMiddleware } from '../../../middlewares'

const { validate } = ValidationMiddleware
const { validateSignUpEmail } = UserMiddleware
const { createUser } = UserController
const { loginEmailValidator } = AuthMiddleware
const { compareUserPassword } = AuthenticateMiddleware
const { signIn } = AuthController

const router = Router()

router.post(
  '/signup',
  validate(userSchema),
  validateSignUpEmail,
  createUser
)

router.post(
  '/signin',
  validate(signinSchema),
  loginEmailValidator,
  compareUserPassword,
  signIn
)

export default router
