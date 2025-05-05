import { Router } from 'express'
import BlogRepoImpl from '../../modules/blog/repo/BlogRepoImpl'
import BlogServiceImpl from '../../modules/blog/service/BlogServiceImpl'
import BlogController from '../../modules/blog/blog.controller'
import { uploadBlogs } from '../../middleware/uploads'
const router = Router()

const repo = new BlogRepoImpl()
const service = new BlogServiceImpl(repo)
const controller = new BlogController(service)

router.get('/', controller.getAllBlog.bind(controller))
router.get('/temporary', controller.getAllTemporaryBlogs.bind(controller))
router.post(
  '/',
  uploadBlogs.single('image'),
  controller.createBlog.bind(controller)
)
router.get('/:id', controller.getDetailBlog.bind(controller))
router.delete('/', controller.deleteBlog.bind(controller))
router.delete('/temporary', controller.deleteTemporaryBlogs.bind(controller))
router.put('/temporary', controller.restoreTemporaryBlogs.bind(controller))
router.put(
  '/:id',
  uploadBlogs.single('image'),
  controller.updateBlog.bind(controller)
)
export const blogRouter = router
