import { Router } from 'express'
import BlogRepoImpl from '../../modules/blog/repo/BlogRepoImpl'
import BlogServiceImpl from '../../modules/blog/service/BlogServiceImpl'
import BlogController from '../../modules/blog/blog.controller'
const router = Router()

const repo = new BlogRepoImpl()
const service = new BlogServiceImpl(repo)
const controller = new BlogController(service)

router.get('/', controller.getAllBlog.bind(controller))
router.post('/', controller.createBlog.bind(controller))
router.get('/:id', controller.getDetailBlog.bind(controller))
router.delete('/', controller.deleteBlog.bind(controller))
export const blogRouter = router
