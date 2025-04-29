import { Request, Response } from 'express'
import { ICategoryService } from './service/ICategoryService'
import { CreateCategoryDTO } from './dto/create.category.dto'
import { UpdateCategoryDTO } from './dto/update.category.dto'

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
      data: list // Replace with actual data from your service
    })
  }

  async getCategoryById(req: Request, res: Response) {
    const id = req.params.id
    const response = await this.service.getCategoryById(id)
    res.status(200).json({
      status: 200,
      message: 'Get category by id successfully',
      data: response // Replace with actual data from your service
    })
  }

  async createCategory(req: Request, res: Response) {
    const { name } = req.body
    const dto = new CreateCategoryDTO()
    dto.name = name
    const response = this.service.createCategory(dto)
    res.status(201).json({
      status: 201,
      message: 'Category created successfully',
      data: response // Replace with actual data from your service
    })
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
      data: response // Replace with actual data from your service
    })
    return
  }

  async deleteCategory(req: Request, res: Response) {
    this.service.deleteCategory(req.params.id)
    res.status(200).json({
      status: 200,
      message: 'Category deleted successfully'
    })
    return
  }
}
