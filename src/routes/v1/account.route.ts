import { Router } from 'express'
import AccountRepoImpl from '../../modules/account/repo/AccountRepoImpl'
import AccountServiceImpl from '../../modules/account/service/AccountServiceImpl'
import AccountController from '../../modules/account/account.controller'
import { verifyToken } from '../../middleware/verifyToken'
import { verifyRole } from '../../middleware/verifyRole'
import { RoleName } from '../../entities/roles.entity'
const router = Router()

const repo = new AccountRepoImpl()
const service = new AccountServiceImpl(repo)
const controller = new AccountController(service)
const ROLENAME = [RoleName.ADMIN]
router.get('/', controller.getAccount.bind(controller))
router.put(
  '/',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.setRolesToAccount.bind(controller)
)
export const acccountRouter = router
