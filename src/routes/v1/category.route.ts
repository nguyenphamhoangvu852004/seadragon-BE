import { Router } from 'express'
import CategoryController from '../../modules/category/category.controller'
import CategoryServiceImpl from '../../modules/category/service/CategoryServiceImpl'
import CategoryRepoIpml from '../../modules/category/repo/CategoryRepoImpl'
const router = Router()

//Get Category
//Create Category
//Update Category
//Delete Category
//Get Category by ID
const repo = new CategoryRepoIpml()
const service = new CategoryServiceImpl(repo)
const controller = new CategoryController(service)

router.get('/', controller.getAllCategories.bind(controller))
router.get('/:id', controller.getCategoryById.bind(controller))
router.post('/', controller.createCategory.bind(controller))
router.delete('/', controller.deleteCategory.bind(controller))
router.put('/:id', controller.updateCategory.bind(controller))
router.delete(
  '/temporary',
  controller.deleteTemporaryController.bind(controller)
)
router.put('/temporary/:id',controller.restoreTemporaryController.bind(controller))
export const categoryRouter = router
