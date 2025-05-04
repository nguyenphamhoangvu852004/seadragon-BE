import { Router } from 'express'
import AccountRepoImpl from '../../modules/account/repo/AccountRepoImpl'
import AccountServiceImpl from '../../modules/account/service/AccountServiceImpl'
import AccountController from '../../modules/account/account.controller'
const router = Router()

const repo = new AccountRepoImpl()
const service = new AccountServiceImpl(repo)
const controller = new AccountController(service)

//auth
router.post('/register', controller.createAccount.bind(controller))
router.post('/login', controller.login.bind(controller))

export const authRouter = router
