/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateProductDTO } from '../dto/create.product.dto'
import { UpdateProductDTO } from '../dto/update.product.dto'
import IProductRepo from '../repo/IProductRepo'
import { IProductService } from './IProductService'

export default class ProductServiceImpl implements IProductService {
  productRepository: IProductRepo
  constructor(productRepository: IProductRepo) {
    this.productRepository = productRepository
  }
  async getAllProduct(categoryId: string): Promise<any> {
    const list = this.productRepository.getAllProducts(categoryId)
    return list
  }
  async getProductById(id: string): Promise<any> {
    const product = this.productRepository.getProductById(id)
    return product
  }
  async createProduct(data: CreateProductDTO): Promise<any> {
    const newProduct = await this.productRepository.createProduct(data)
    return newProduct
  }
  async updateProduct(data: UpdateProductDTO): Promise<any> {
    const product = await this.productRepository.updateProduct(data)
    return product
  }
  async deleteTemporaryProduct(id: string): Promise<any> {
    const product = await this.productRepository.deleteTemporaryProduct(id)
    return product
  }
  async restoreTemporaryProduct(id: string): Promise<any> {
    const product = await this.productRepository.restoreTemporaryProduct(id)
    return product
  }
  async deleteProduct(id: string): Promise<any> {
    const product = await this.productRepository.deleteProduct(id)
    return product
  }

  async getAllDeletedTemporaryProducts(categoryId: string): Promise<any> {
    const list =
      this.productRepository.getAllDeletedTemporaryProducts(categoryId)
    return list
  }
}
