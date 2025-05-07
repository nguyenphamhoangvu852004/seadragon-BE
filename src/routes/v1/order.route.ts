import { Router } from 'express'
import OrderRepoImpl from '../../modules/order/repo/OrderRepoImpl'
import OrderServiceImpl from '../../modules/order/service/OrderServiceImpl'
import OrderController from '../../modules/order/order.controller'
import { repo as customerRepo } from './customer.route'
import { repo as productRepo } from './product.route'
import { verifyToken } from '../../middleware/verifyToken'
import { verifyRole } from '../../middleware/verifyRole'
import { RoleName } from '../../utils/enum'
const router = Router()

const repo = new OrderRepoImpl()
const service = new OrderServiceImpl(repo, productRepo, customerRepo)
const controller = new OrderController(service)

const ROLENAME = [RoleName.ADMIN, RoleName.ORDER]

router.get('/', verifyToken(), controller.getAllOrder.bind(controller))
router.get(
  '/temporary',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.getTemporaryOrder.bind(controller)
)
router.get(
  '/:id',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.getDetailOrder.bind(controller)
)
router.post(
  '/',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.createOrder.bind(controller)
)
router.put(
  '/',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.updateStatusOrder.bind(controller)
)
router.put(
  '/temporary',
  verifyToken(),
  verifyRole(ROLENAME),

  controller.restoreOrders.bind(controller)
)
router.delete(
  '/temporary',
  verifyToken(),
  verifyRole(ROLENAME),

  controller.deleteTemporaryOrders.bind(controller)
)
router.delete(
  '/',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.deleteOrders.bind(controller)
)
export const orderRouter = router
