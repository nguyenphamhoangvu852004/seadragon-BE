import { Router } from 'express'
import CustomerRepoImpl from '../../modules/customer/repo/CustomerRepoImpl'
import CustomerServiceImpl from '../../modules/customer/service/CustomerServiceImpl'
import CustomerController from '../../modules/customer/customer.controller'
import { createValidation } from '../validation/customer/create.validation'
import { RoleName } from '../../utils/enum'
import { verifyToken } from '../../middleware/verifyToken'
import { verifyRole } from '../../middleware/verifyRole'
const router = Router()

export const repo = new CustomerRepoImpl()
const service = new CustomerServiceImpl(repo)
const controller = new CustomerController(service)

const ROLENAME = [RoleName.ADMIN, RoleName.ORDER]

router.get('/', controller.getAllCustomers.bind(controller))
router.get(
  '/temporary',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.getAllDeletedTemporaryCustomers.bind(controller)
)
router.get(
  '/:id',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.getDetailCustomers.bind(controller)
)
router.post(
  '/',
  verifyToken(),
  verifyRole(ROLENAME),
  createValidation,
  controller.createCustomer.bind(controller)
)
router.delete(
  '/temporary',

  verifyToken(),
  verifyRole(ROLENAME),
  controller.deleteTemporaryCustomers.bind(controller)
)
router.delete(
  '/',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.deleteCustomers.bind(controller)
)
router.put(
  '/temporary/:id',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.restoreTemporaryCustomer.bind(controller)
)
export const customerRouter = router
