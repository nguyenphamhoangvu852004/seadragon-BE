/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProductService {
  getAllProduct(categoryId: string): Promise<any>
  getAllDeletedTemporaryProducts(categoryId: string): Promise<any>
  getProductById(id: string): Promise<any>
  createProduct(data: any): Promise<any>
  updateProduct(data: any): Promise<any>
  deleteTemporaryProduct(id: string): Promise<any>
  restoreTemporaryProduct(id: string): Promise<any>
  deleteProduct(id: string): Promise<any>
}
