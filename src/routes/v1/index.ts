import { Router } from 'express'
import { categoryRouter } from './category.route'
import { productRouter } from './product.route'
import { authRouter } from './auth.route'
import { acccountRouter } from './account.route'
import { customerRouter } from './customer.route'
import { blogRouter } from './blog.route'
import { orderRouter } from './order.route'
import { RoleName } from '../../entities/roles.entity'
import { verifyToken } from '../../middleware/verifyToken'
import { verifyRole } from '../../middleware/verifyRole'
const router = Router()

const ROLENAME_ROUTE_ACCOUNT = [RoleName.ADMIN]
// router.use('/auth', authRouter)
router.use('/categories', categoryRouter)
router.use('/products', productRouter)
router.use('/auth', authRouter)
router.use(
  '/accounts',
  verifyToken(),
  verifyRole(ROLENAME_ROUTE_ACCOUNT),
  acccountRouter
)

router.use('/customers', customerRouter)
router.use('/blogs', blogRouter)
router.use('/orders', orderRouter)
export const v1Router = router
