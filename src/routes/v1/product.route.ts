import { Router } from 'express'
import ProductRepoImpl from '../../modules/product/repo/ProductRepoImpl'
import ProductServiceImpl from '../../modules/product/service/ProductServiceImpl'
import ProductController from '../../modules/product/product.controller'
import { uploadProducts } from '../../middleware/uploads'
import { verifyToken } from '../../middleware/verifyToken'
import { verifyRole } from '../../middleware/verifyRole'
import { RoleName } from '../../entities/roles.entity'
const router = Router()

export const repo = new ProductRepoImpl()
const service = new ProductServiceImpl(repo)
const controller = new ProductController(service)

const ROLENAME = [RoleName.ADMIN, RoleName.PRODUCT]

router.get('/', controller.getAllProducts.bind(controller))
router.get(
  '/temporary',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.getAllDeletedTemporaryProducts.bind(controller)
)
router.get(
  '/:id',
  controller.getProductById.bind(controller)
)
router.delete(
  '/temporary',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.deleteTemporaryProducts.bind(controller)
)

router.put(
  '/temporary/:id',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.restoreTemporaryProduct.bind(controller)
)
router.delete(
  '/',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.deleteProduct.bind(controller)
)
router.post(
  '/',
  verifyToken(),
  verifyRole(ROLENAME),
  uploadProducts.single('image'),
  controller.createProduct.bind(controller)
)
router.put(
  '/:id',
  verifyToken(),
  verifyRole(ROLENAME),
  uploadProducts.single('image'),
  controller.updateProduct.bind(controller)
)
export const productRouter = router
