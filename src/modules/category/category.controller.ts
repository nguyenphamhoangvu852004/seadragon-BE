import { Request, Response } from 'express'
import { ICategoryService } from './service/ICategoryService'
import { CreateCategoryDTO } from './dto/create.category.dto'
import { UpdateCategoryDTO } from './dto/update.category.dto'
import { classToPlain } from 'class-transformer'
import { log } from 'console'

export default class CategoryController {
  service: ICategoryService
  constructor(service: ICategoryService) {
    this.service = service
  }

  async getAllCategories(req: Request, res: Response) {
    const list = await this.service.getAllCategories()
    res.status(200).json({
      status: 200,
      message: 'Get all categories successfully',
      data: classToPlain(list)
    })
    return
  }

  async getCategoryById(req: Request, res: Response) {
    const id = req.params.id
    const response = await this.service.getCategoryById(id)
    res.status(200).json({
      status: 200,
      message: 'Get category by id successfully',
      data: classToPlain(response)
    })
    return
  }

  async createCategory(req: Request, res: Response) {
    const { name } = req.body
    const dto = new CreateCategoryDTO()
    dto.name = name
    const response = this.service.createCategory(dto)
    res.status(201).json({
      status: 201,
      message: 'Category created successfully',
      data: classToPlain(response)
    })
    return
  }

  async updateCategory(req: Request, res: Response) {
    const id = req.params.id
    const { name } = req.body
    const updateCategoryDTO = new UpdateCategoryDTO()
    updateCategoryDTO.name = name
    updateCategoryDTO.id = Number(id)
    const response = await this.service.updateCategory(updateCategoryDTO)

    res.status(200).json({
      status: 200,
      message: 'Category updated successfully',
      data: classToPlain(response)
    })
    return
  }

  async deleteCategory(req: Request, res: Response) {
    const { ids } = req.body
    log('ids', ids)
    const list = await this.service.deleteCategory(ids)

    res.status(200).json({
      status: 200,
      message: 'Category deleted successfully',
      data: classToPlain(list)
    })
    return
  }

  async deleteTemporaryController(req: Request, res: Response) {
    const { ids } = req.body
    const response = await this.service.deleteTemporaryCategory(ids)
    log('response', response)
    res.status(200).json({
      status: 200,
      message: 'Delete category successfully',
      data: classToPlain(response)
    })
    return
  }
  async restoreTemporaryController(req: Request, res: Response) {
    const id = req.params.id
    const response = await this.service.restoreTemporaryCategory(Number(id))
    res.status(200).json({
      status: 200,
      message: 'Restore category successfully',
      data: classToPlain(response)
    })
    return
  }
  async getAllDeletedTemporaryCategories(req: Request, res: Response) {
    try {
      const list = await this.service.getAllDeletedTemporaryCategories()
      res.status(200).json({
        status: 200,
        message: 'Get all deleted temporary categories successfully',
        data: classToPlain(list)
      })
      return
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred'
      })
    }
  }
}
