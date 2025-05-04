import { Router } from 'express'
import { categoryRouter } from './category.route'
import { productRouter } from './product.route'
import { authRouter } from './auth.route'
import { acccountRouter } from './account.router'
import { customerRouter } from './customer.route'
const router = Router()

// router.use('/auth', authRouter)
router.use('/categories', categoryRouter)
router.use('/products', productRouter)
router.use('/auth', authRouter)
router.use('/accounts', acccountRouter)
router.use('/customers', customerRouter)
export const v1Router = router
