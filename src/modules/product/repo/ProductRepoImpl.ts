/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDataSource } from '../../../config/data-source'
import { Products } from '../../../entities/products.entity'
import { CreateProductDTO } from '../dto/create.product.dto'
import IProductRepo from './IProductRepo'

export default class ProductRepoImpl implements IProductRepo {
  productRepository: any
  categoryRepository: any
  constructor() {
    this.productRepository = AppDataSource.getRepository(Products)
    this.categoryRepository = AppDataSource.getRepository(Products)
  }
  async getAllProducts(): Promise<any> {
    const list = await this.productRepository.find()
    return list
  }
  async getProductById(id: string): Promise<any> {
    const product = await this.productRepository.findOneBy({ id: id })
    return product
  }
  async createProduct(data: CreateProductDTO): Promise<any> {
    const newProduct = await this.productRepository.create({
      name: data.name,
      price: data.price,
      description: data.description,
      category: data.categoryId,
      isDeleted: data.setIsDeleted()
    })
    await this.productRepository.save(newProduct)
    return newProduct
  }
  updateProduct(data: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
  deleteProduct(id: string): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
