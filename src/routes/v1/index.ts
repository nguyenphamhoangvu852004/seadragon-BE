import { Router } from 'express'
import { categoryRouter } from './category.route'
import { productRouter } from './product.route'
import { authRouter } from './auth.route'
import { acccountRouter } from './account.route'
import { customerRouter } from './customer.route'
import { blogRouter } from './blog.route'
import { orderRouter } from './order.route'
const router = Router()

// router.use('/auth', authRouter)
router.use('/categories', categoryRouter)
router.use('/products', productRouter)
router.use('/auth', authRouter)
router.use('/accounts', acccountRouter)
router.use('/customers', customerRouter)
router.use('/blogs', blogRouter)
router.use('/orders', orderRouter)
export const v1Router = router
