/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException } from '../../../shared/BadRequest.exeception'
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
    try {
      const product = this.productRepository.getProductById(id)
      return product
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message)
      }
      throw new BadRequestException('An unknown error occurred')
    }
  }
  async createProduct(data: CreateProductDTO): Promise<any> {
    const newProduct = await this.productRepository.createProduct(data)
    return newProduct
  }
  async updateProduct(data: UpdateProductDTO): Promise<any> {
    const product = await this.productRepository.updateProduct(data)
    return product
  }
  async deleteTemporaryProducts(ids: number[]): Promise<any> {
    const product = await this.productRepository.deleteTemporaryProducts(ids)
    return product
  }
  async restoreTemporaryProduct(id: string): Promise<any> {
    const product = await this.productRepository.restoreTemporaryProduct(id)
    return product
  }
  async deleteProducts(ids: number[]): Promise<any> {
    try {
      const product = await this.productRepository.deleteProducts(ids)
      return product
    } catch (error: Error | any) {
      throw new Error(error.message)
    }
  }
  async getAllDeletedTemporaryProducts(categoryId: string): Promise<any> {
    const list =
      await this.productRepository.getAllDeletedTemporaryProducts(categoryId)
    return list
  }
}
