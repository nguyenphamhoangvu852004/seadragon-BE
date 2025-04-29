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

  async getAllProducts(categoryId: string): Promise<any> {
    const list = await this.productRepository.find({
      where: {
        isDeleted: false,
        category: {
          id: categoryId
        }
      },
      relations: {
        category: true
      }
    })
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
  async deleteTemporaryProduct(id: string): Promise<any> {
    const product = await this.productRepository.findOneBy({ id: id })
    if (!product) {
      throw new Error('Product not found')
    }
    product.isDeleted = true
    product.deletedAt = new Date()
    await this.productRepository.save(product)
    return product
  }
  async restoreTemporaryProduct(id: string): Promise<any> {
    const product = await this.productRepository.findOneBy({ id: id })
    if (!product) {
      throw new Error('Product not found')
    }
    product.isDeleted = false
    await this.productRepository.save(product)
    return product
  }
  async deleteProduct(id: string): Promise<any> {
    const product = await this.productRepository.findOneBy({ id: id })
    if (!product) {
      throw new Error('Product not found')
    }
    await this.productRepository.remove(product)
    return product
  }

  async getAllDeletedTemporaryProducts(categoryId: string): Promise<any> {
    const list = await this.productRepository.find({
      where: {
        isDeleted: true,
        category: {
          id: categoryId
        }
      },
      relations: {
        category: true
      }
    })
    return list
  }
}
