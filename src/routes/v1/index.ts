import { Router } from 'express'
import { authRouter } from './auth.route'
import { categoryRouter } from './category.route'
import { productRouter } from './product.route'

const router = Router()

router.use('/auth', authRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
export const v1Router = router
