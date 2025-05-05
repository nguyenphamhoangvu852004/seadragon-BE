/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateCategoryDTO } from '../dto/create.category.dto'
import { UpdateCategoryDTO } from '../dto/update.category.dto'
import ICategoryRepo from '../repo/ICategoryRepo'
import { ICategoryService } from './ICategoryService'

export default class CategoryServiceImpl implements ICategoryService {
  repo: ICategoryRepo
  constructor(repo: ICategoryRepo) {
    this.repo = repo
  }

  async getAllCategories(): Promise<any> {
    return await this.repo.getAllCategories()
  }
  async getCategoryById(id: string): Promise<any> {
    return await this.repo.getCategoryById(id)
  }

  async getAllDeletedTemporaryCategories(): Promise<any> {
    return await this.repo.getAllDeletedTemporaryCategories()
  }

  async createCategory(data: CreateCategoryDTO): Promise<any> {
    const res = await this.repo.createCategory(data)
    return res
  }
  async updateCategory(data: UpdateCategoryDTO): Promise<any> {
    const res = await this.repo.updateCategory(data)
    return res
  }
  async deleteCategory(ids: number[]): Promise<any> {
    return await this.repo.deleteCategory(ids)
  }
  async deleteTemporaryCategory(ids: number[]): Promise<any> {
    const res = await this.repo.deleteTemporaryCategory(ids)
    return res
  }

  async restoreTemporaryCategory(id: number): Promise<any> {
    const res = await this.repo.restoreTemporaryCategory(id)
    return res
  }
}
