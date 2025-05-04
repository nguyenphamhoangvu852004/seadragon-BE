/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICategoryService {
  getAllCategories(): Promise<any>
  getCategoryById(id: string): Promise<any>
  createCategory(data: any): Promise<any>
  updateCategory(data: any): Promise<any>
  deleteCategory(ids: number[]): Promise<any>
  deleteTemporaryCategory(ids: number[]): Promise<any>
  restoreTemporaryCategory(id: number): Promise<any>
}
