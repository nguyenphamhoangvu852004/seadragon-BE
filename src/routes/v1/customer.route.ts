import { Router } from 'express'
import CustomerRepoImpl from '../../modules/customer/repo/CustomerRepoImpl'
import CustomerServiceImpl from '../../modules/customer/service/CustomerServiceImpl'
import CustomerController from '../../modules/customer/customer.controller'
const router = Router()

export const repo = new CustomerRepoImpl()
const service = new CustomerServiceImpl(repo)
const controller = new CustomerController(service)

router.get('/', controller.getAllCustomers.bind(controller))
router.get(
  '/temporary',
  controller.getAllDeletedTemporaryCustomers.bind(controller)
)
router.get('/:id', controller.getDetailCustomers.bind(controller))
router.post('/', controller.createCustomer.bind(controller))
router.delete(
  '/temporary',
  controller.deleteTemporaryCustomers.bind(controller)
)
router.delete('/', controller.deleteCustomers.bind(controller))
router.put(
  '/temporary/:id',
  controller.restoreTemporaryCustomer.bind(controller)
)
export const customerRouter = router
