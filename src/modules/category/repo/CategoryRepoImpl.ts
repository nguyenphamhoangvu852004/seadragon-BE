/* eslint-disable @typescript-eslint/no-explicit-any */
import { log } from 'console'
import { AppDataSource } from '../../../config/data-source'
import { Categories } from '../../../entities/categories.entity'
import ICategoryRepo from './ICategoryRepo'
import { CreateCategoryDTO } from '../dto/create.category.dto'
import { UpdateCategoryDTO } from '../dto/update.category.dto'

export default class CategoryRepoIpml implements ICategoryRepo {
  categoryRepository: any
  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Categories)
  }
  async getAllCategories(): Promise<any> {
    const list = await this.categoryRepository.find()
    log('list', list)
    return list
  }
  async getCategoryById(id: string): Promise<any> {
    return await this.categoryRepository.findOneBy({ id: id })
  }
  async createCategory(data: CreateCategoryDTO): Promise<any> {
    try {
      const newCategory = this.categoryRepository.create({
        name: data.name
      })
      await this.categoryRepository.save(newCategory)
      return newCategory 
    } catch (error) {
      console.log('error', error)
      throw new Error('Error creating category')
    }
  }
  async updateCategory(data: UpdateCategoryDTO): Promise<any> {
    try {
      const category = await this.categoryRepository.findOneBy({ id: data.id })
      if (!category) {
        throw new Error('Category not found')
      }
      category.name = data.name
      await this.categoryRepository.save(category)
      return category
    } catch (error) {
      console.log('error', error)
      throw new Error('Error updating category')
    }
  }
  async deleteCategory(id: string): Promise<any> {
    try {
      const category = await this.categoryRepository.findOneBy({ id: id })
      if (!category) {
        throw new Error('Category not found')
      }
      await this.categoryRepository.delete(id)
      return { message: 'Category deleted successfully' }
    } catch (error) {
      console.log('error', error)
      throw new Error('Error deleting category')
    }
  }
}
