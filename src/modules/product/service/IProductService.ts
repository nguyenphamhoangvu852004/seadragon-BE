import { CreateProductDTO } from '../dto/create.product.dto'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProductService {
  getAllProduct(categoryId: string): Promise<any>
  getAllDeletedTemporaryProducts(categoryId: string): Promise<any>
  getProductById(id: string): Promise<any>
  createProduct(data: CreateProductDTO): Promise<any>
  updateProduct(data: any): Promise<any>
  deleteTemporaryProducts(ids: number[]): Promise<any>
  restoreTemporaryProduct(id: string): Promise<any>
  deleteProducts(ids: number[]): Promise<any>
}
