import { Router } from 'express'
import ProductRepoImpl from '../../modules/product/repo/ProductRepoImpl'
import ProductServiceImpl from '../../modules/product/service/ProductServiceImpl'
import ProductController from '../../modules/product/product.controller'
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
export const productRouter = router
