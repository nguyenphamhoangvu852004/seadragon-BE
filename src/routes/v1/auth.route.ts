import { Router } from 'express'
import AccountRepoImpl from '../../modules/account/repo/AccountRepoImpl'
import AccountServiceImpl from '../../modules/account/service/AccountServiceImpl'
import AccountController from '../../modules/account/account.controller'
import { verifyToken } from '../../middleware/verifyToken'
import { verifyRole } from '../../middleware/verifyRole'
import { RoleName } from '../../utils/enum'
import { loginValidation } from '../validation/auth/login.validation'
import { registerValidation } from '../validation/auth/register.validation'
const router = Router()

const repo = new AccountRepoImpl()
const service = new AccountServiceImpl(repo)
const controller = new AccountController(service)

const ROLENAME = [RoleName.ADMIN]
//auth
router.post(
  '/register',
  verifyToken(),
  verifyRole(ROLENAME),
  registerValidation,
  controller.createAccount.bind(controller)
)
router.post('/login', loginValidation, controller.login.bind(controller))

export const authRouter = router
