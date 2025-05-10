import { Router } from 'express'
import CategoryController from '../../modules/category/category.controller'
import CategoryServiceImpl from '../../modules/category/service/CategoryServiceImpl'
import CategoryRepoIpml from '../../modules/category/repo/CategoryRepoImpl'
import { verifyToken } from '../../middleware/verifyToken'
import { verifyRole } from '../../middleware/verifyRole'
import { RoleName } from '../../utils/enum'
import { createValidation } from '../validation/category/create.validation'
import { updateValidation } from '../validation/category/update.validation'
const router = Router()

//Get Category
//Create Category
//Update Category
//Delete Category
//Get Category by ID
const repo = new CategoryRepoIpml()
const service = new CategoryServiceImpl(repo)
const controller = new CategoryController(service)

const ROLENAME = [RoleName.ADMIN, RoleName.PRODUCT]

router.get('/', controller.getAllCategories.bind(controller))
router.get(
  '/temporary',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.getAllDeletedTemporaryCategories.bind(controller)
)
router.get('/:id', controller.getCategoryById.bind(controller))
router.post(
  '/',
  verifyToken(),
  verifyRole(ROLENAME),
  createValidation,
  controller.createCategory.bind(controller)
)
router.delete(
  '/',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.deleteCategory.bind(controller)
)
router.put(
  '/:id',
  verifyToken(),
  verifyRole(ROLENAME),
  updateValidation,
  controller.updateCategory.bind(controller)
)
router.delete(
  '/temporary',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.deleteTemporaryController.bind(controller)
)
router.put(
  '/temporary/:id',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.restoreTemporaryController.bind(controller)
)
export const categoryRouter = router
