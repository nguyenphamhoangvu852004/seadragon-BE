import { Router } from 'express'
import OrderRepoImpl from '../../modules/order/repo/OrderRepoImpl'
import OrderServiceImpl from '../../modules/order/service/OrderServiceImpl'
import OrderController from '../../modules/order/order.controller'
import { repo as customerRepo } from './customer.route'
import { repo as productRepo } from './product.route'
const router = Router()

const repo = new OrderRepoImpl()
const service = new OrderServiceImpl(repo, productRepo, customerRepo)
const controller = new OrderController(service)

router.get('/', controller.getAllOrder.bind(controller))
router.get('/temporary', controller.getTemporaryOrder.bind(controller))
router.get('/:id', controller.getDetailOrder.bind(controller))
router.post('/', controller.createOrder.bind(controller))
router.put('/', controller.updateStatusOrder.bind(controller))
router.put('/temporary', controller.restoreOrders.bind(controller))
router.delete('/temporary', controller.deleteTemporaryOrders.bind(controller))
router.delete('/', controller.deleteOrders.bind(controller))
// router.get('/temporary', controller.getAllTemporaryOrders.bind(controller))
// router.post(
//   '/',
//   uploadOrders.single('image'),
//   controller.createOrder.bind(controller)
// )
// router.get('/:id', controller.getDetailOrder.bind(controller))
// router.delete('/', controller.deleteOrder.bind(controller))
// router.delete('/temporary', controller.deleteTemporaryOrders.bind(controller))
// router.put('/temporary', controller.restoreTemporaryOrders.bind(controller))
// router.put(
//   '/:id',
//   uploadOrders.single('image'),
//   controller.updateOrder.bind(controller)
// )
export const orderRouter = router
