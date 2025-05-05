import { Request, Response } from 'express'
import { IBlogService } from './service/IBlogService'
import { classToPlain } from 'class-transformer'
import { CreateBlogInputDTO } from './dto/create.blog.dto'
import { NotFoundException } from '../../shared/NotFound.exeception'
import { BadRequestException } from '../../shared/BadRequest.exeception'

export default class BlogController {
  blogService: IBlogService
  constructor(blogService: IBlogService) {
    this.blogService = blogService
  }
  async createBlog(req: Request, res: Response) {
    try {
      const { id, title, body, image } = req.body
      const newDto = new CreateBlogInputDTO()
      newDto.userId = id
      newDto.title = title
      newDto.image = image
      newDto.body = body
      const response = await this.blogService.createBlog(newDto)
      res.status(201).json({
        status: 201,
        message: 'Created',
        data: classToPlain(response)
      })
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred'
      })
      return
    }
  }

  async getAllBlog(req: Request, res: Response) {
    const response = await this.blogService.getAllBlog()
    res.status(200).json({
      status: 200,
      message: 'Get all blog successfully',
      data: classToPlain(response)
    })
    return
  }
  async getDetailBlog(req: Request, res: Response) {
    try {
      const id = req.params.id
      const response = await this.blogService.getBlogById(id)
      res.status(200).json({
        status: 200,
        message: 'Get detail blog successfully',
        data: classToPlain(response)
      })
      return
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({
          status: 404,
          message: error.message
        })
        return
      }
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred'
      })
      return
    }
  }
  async deleteBlog(req: Request, res: Response) {
    try {
      const { ids } = req.body
      const response = await this.blogService.deleteBlogs(ids)
      res.status(200).json({
        status: 200,
        message: 'Delete blog successfully',
        data: classToPlain(response)
      })
      return
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred',
        data: {}
      })
      return
    }
  }
}
