import { Router } from 'express'
import BlogRepoImpl from '../../modules/blog/repo/BlogRepoImpl'
import BlogServiceImpl from '../../modules/blog/service/BlogServiceImpl'
import BlogController from '../../modules/blog/blog.controller'
import { uploadBlogs } from '../../middleware/uploads'
import { verifyToken } from '../../middleware/verifyToken'
import { verifyRole } from '../../middleware/verifyRole'
import { RoleName } from '../../utils/enum'
const router = Router()

const repo = new BlogRepoImpl()
const service = new BlogServiceImpl(repo)
const controller = new BlogController(service)

const ROLENAME = [RoleName.ADMIN, RoleName.BLOG]
router.get('/', controller.getAllBlog.bind(controller))
router.get(
  '/temporary',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.getAllTemporaryBlogs.bind(controller)
)
router.post(
  '/',
  verifyToken(),
  verifyRole(ROLENAME),
  uploadBlogs.single('image'),
  controller.createBlog.bind(controller)
)
router.get(
  '/:id',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.getDetailBlog.bind(controller)
)
router.delete(
  '/',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.deleteBlog.bind(controller)
)
router.delete(
  '/temporary',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.deleteTemporaryBlogs.bind(controller)
)
router.put(
  '/temporary',
  verifyToken(),
  verifyRole(ROLENAME),
  controller.restoreTemporaryBlogs.bind(controller)
)
router.put(
  '/:id',
  verifyToken(),
  verifyRole(ROLENAME),

  uploadBlogs.single('image'),
  controller.updateBlog.bind(controller)
)
export const blogRouter = router
