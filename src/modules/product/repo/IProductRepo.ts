import { CreateProductDTO } from '../dto/create.product.dto'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IProductRepo {
  getAllProducts(categoryId: string): Promise<any>
  getAllDeletedTemporaryProducts(categoryId: string): Promise<any>
  getProductById(id: string): Promise<any>
  createProduct(data: CreateProductDTO): Promise<any>
  updateProduct(data: any): Promise<any>
  deleteTemporaryProduct(id: string): Promise<any>
  restoreTemporaryProduct(id: string): Promise<any>
  deleteProduct(id: string): Promise<any>
}
