/* eslint-disable @typescript-eslint/no-explicit-any */
import IProductRepo from '../repo/IProductRepo'
import { IProductService } from './IProductService'

export default class ProductServiceImpl implements IProductService {
  productRepository: IProductRepo
  constructor(productRepository: IProductRepo) {
    this.productRepository = productRepository
  }
  async getAllProduct(): Promise<any> {
    const list = this.productRepository.getAllProducts()
    return list
  }
  getProductById(id: string): Promise<any> {
    throw new Error('Method not implemented.')
  }
  createProduct(data: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
  updateProduct(data: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
  deleteProduct(id: string): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
