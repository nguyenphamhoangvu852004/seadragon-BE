import { CreateCategoryDTO } from '../dto/create.category.dto'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface ICategoryRepo {
  getAllCategories(): Promise<any>
  getCategoryById(id: string): Promise<any>
  createCategory(data: CreateCategoryDTO): Promise<any>
  updateCategory(data: any): Promise<any>
  deleteCategory(id: string): Promise<any>
}
