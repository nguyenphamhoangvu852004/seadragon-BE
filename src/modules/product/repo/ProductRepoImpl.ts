/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path'
import { AppDataSource } from '../../../config/data-source'
import { Products } from '../../../entities/products.entity'
import { CreateProductDTO } from '../dto/create.product.dto'
import IProductRepo from './IProductRepo'
import fs from 'fs'
import { UpdateProductDTO } from '../dto/update.product.dto'
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
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.categoryId,
      image: '/uploads/products/' + data.image,
      isDeleted: false
    })
    await this.productRepository.save(newProduct)
    return newProduct
  }
  async updateProduct(data: UpdateProductDTO): Promise<any> {
    const product = await this.productRepository.findOneBy({ id: data.id })
    if (!product) {
      throw new Error('Product not found')
    }
    product.title = data.title
    product.description = data.description
    product.price = data.price
    product.category = data.categoryId
    product.image = '/uploads/products/' + data.image
    await this.productRepository.save(product)
    return product
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
    // Lấy tên file từ đường dẫn ảnh
    const fileName = path.basename(product.image) // 'image-1745912805477-460172612.jpg'

    // seadragon-BE/uploads/products
    const fullImagePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'uploads',
      'products',
      fileName
    )
    console.log('Full image path:', fullImagePath)
    fs.unlink(fullImagePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err)
      } else {
        console.log('File deleted successfully')
      }
    })
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
