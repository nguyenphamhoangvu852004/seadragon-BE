/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProductService {
  getAllProduct(): Promise<any>
  getProductById(id: string): Promise<any>
  createProduct(data: any): Promise<any>
  updateProduct(data: any): Promise<any>
  deleteProduct(id: string): Promise<any>
}
