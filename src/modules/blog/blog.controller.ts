import { Request, Response } from 'express'
import { IBlogService } from './service/IBlogService'
import { classToPlain } from 'class-transformer'
import { CreateBlogInputDTO } from './dto/create.blog.dto'
import { NotFoundException } from '../../shared/NotFound.exeception'
import { UpdateBlogInputDto } from './dto/update.blog.dto'
import { log } from 'console'

export default class BlogController {
  blogService: IBlogService
  constructor(blogService: IBlogService) {
    this.blogService = blogService
  }
  async createBlog(req: Request, res: Response) {
    try {
      const { userId, title, body } = req.body
      const image = req.file?.filename as string
      const newDto = new CreateBlogInputDTO()
      newDto.userId = userId
      newDto.title = title
      newDto.image = image
      newDto.body = body
      log(newDto.image)
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
    try {
      const response = await this.blogService.getAllBlog()
      res.status(200).json({
        status: 200,
        message: 'Get all blog successfully',
        data: classToPlain(response)
      })
      return
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred'
      })
      return
    }
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
  async deleteTemporaryBlogs(req: Request, res: Response) {
    const { ids } = req.body
    try {
      const response = await this.blogService.deleteTemporaryBlogs(ids)
      res.status(200).json({
        status: 200,
        message: 'Delete blog successfully',
        data: classToPlain(response)
      })
      return
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          status: 400,
          message: error.message,
          data: {}
        })
        return
      }
    }
  }
  async restoreTemporaryBlogs(req: Request, res: Response) {
    try {
      const { ids } = req.body
      const list = await this.blogService.restoreTemporaryBlogs(ids)
      res.status(200).json({
        status: 200,
        message: 'Restore blog successfully',
        data: classToPlain(list)
      })
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          status: 400,
          message: error.message,
          data: {}
        })
        return
      }
    }
  }
  async getAllTemporaryBlogs(req: Request, res: Response) {
    try {
      const list = await this.blogService.getAllDeletedTemporaryBlogs()
      res.status(200).json({
        status: 200,
        message: 'Get all temporary blog successfully',
        data: classToPlain(list)
      })
      return
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          status: 400,
          message: error.message,
          data: {}
        })
        return
      }
    }
  }
  async updateBlog(req: Request, res: Response) {
    try {
      const id = req.params.id
      const { title, body } = req.body
      const image = req.file?.filename as string
      const inputDto = new UpdateBlogInputDto()
      inputDto.title = title
      inputDto.body = body
      inputDto.image = image
      inputDto.id = id
      const response = await this.blogService.updateBlog(inputDto)
      res.status(200).json({
        status: 200,
        message: 'Update blog successfully',
        data: classToPlain(response)
      })
      return
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          status: 400,
          message: error.message,
          data: {}
        })
        return
      }
    }
  }
}
