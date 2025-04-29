import { Router } from 'express'
import ProductRepoImpl from '../../modules/product/repo/ProductRepoImpl'
import ProductServiceImpl from '../../modules/product/service/ProductServiceImpl'
import ProductController from '../../modules/product/product.controller'
import { uploadProducts } from '../../middleware/uploads'
const router = Router()

//Get Category
//Create Category
//Update Category
//Delete Category
//Get Category by ID
const repo = new ProductRepoImpl()
const service = new ProductServiceImpl(repo)
const controller = new ProductController(service)

// router.get('/', controller.getAllCategories.bind(controller))
router.get('/', controller.getAllProducts.bind(controller))
router.get(
  '/temporary',
  controller.getAllDeletedTemporaryProducts.bind(controller)
)
router.get('/:id', controller.getProductById.bind(controller))
router.delete(
  '/temporary/:id',
  controller.deleteTemporaryProduct.bind(controller)
)
router.put(
  '/temporary/:id',
  controller.restoreTemporaryProduct.bind(controller)
)
router.delete('/:id', controller.deleteProduct.bind(controller))
router.post('/', uploadProducts.single('image'),controller.createProduct.bind(controller))
export const productRouter = router
