/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path'
import { AppDataSource } from '../../../config/data-source'
import { Products } from '../../../entities/products.entity'
import { CreateProductDTO } from '../dto/create.product.dto'
import IProductRepo from './IProductRepo'
import fs from 'fs'
import { UpdateProductDTO } from '../dto/update.product.dto'
import { Repository } from 'typeorm'
import { Categories } from '../../../entities/categories.entity'
import { log } from 'console'
import { BadRequestException } from '../../../shared/BadRequest.exeception'
import { NotFoundException } from '../../../shared/NotFound.exeception'
export default class ProductRepoImpl implements IProductRepo {
  productRepository: Repository<Products>
  categoryRepository: Repository<Categories>
  constructor() {
    this.productRepository = AppDataSource.getRepository(Products)
    this.categoryRepository = AppDataSource.getRepository(Categories)
  }

  async getAllProducts(categoryId: string): Promise<any> {
    const list = await this.productRepository.find({
      where: {
        category: {
          id: Number(categoryId)
        }
      }
    })
    return list
  }
  async getProductById(id: string): Promise<any> {
    const product = await this.productRepository.findOne({
      where: {
        id: Number(id)
      },
      withDeleted: true
    })
    if (!product) {
      throw new Error('Product not found')
    }
    return product
  }
  async createProduct(data: CreateProductDTO): Promise<any> {
    const newProduct = this.productRepository.create({
      title: data.title,
      price: data.price,
      description: data.description,
      category: {
        id: Number(data.categoryId)
      },
      image: '/uploads/products/' + data.image,
      isDeleted: false,
      createdAt: new Date(),
    })
    await this.productRepository.save(newProduct)
    return newProduct
  }
  async updateProduct(data: UpdateProductDTO): Promise<any> {
    const product = await this.productRepository.findOneBy({
      id: Number(data.id)
    })
    if (!product) {
      throw new Error('Product not found')
    }
    const category: Categories | null = await this.categoryRepository.findOneBy(
      {
        id: Number(data.categoryId)
      }
    )
    product.title = data.title as string
    product.description = data.description as string
    product.price = data.price as number
    product.category = category as Categories
    product.image = '/uploads/products/' + data.image
    await this.productRepository.save(product)
    return product
  }
  async deleteTemporaryProducts(ids: number[]): Promise<Products[]> {
    const listProduct: Products[] = []

    for (const i of ids) {
      const product = await this.productRepository.findOneBy({ id: Number(i) })
      if (!product) {
        throw new Error('Product not found')
      }
      product.isDeleted = true
      product.deletedAt = new Date()
      listProduct.push(product)
    }

    // const product = await this.productRepository.findOneBy({ id: Number(id) })
    // if (!product) {
    //   throw new Error('Product not found')
    // }
    // product.isDeleted = true
    // product.deletedAt = new Date()
    await this.productRepository.save(listProduct)
    return listProduct
  }
  async restoreTemporaryProduct(id: string): Promise<any> {
    const product = await this.productRepository.findOne({
      where: {
        id: Number(id)
      },
      withDeleted: true
    })

    if (!product) {
      throw new Error('Product not found')
    }
    product.isDeleted = false
    product.deletedAt = null
    await this.productRepository.save(product)
    log('product  ', product)
    return product
  }
  async deleteProducts(ids: number[]): Promise<any> {
    // tao mang luu tru cac san pham
    const products: Products[] = []

    // duyet cac id trong mang ids
    for (const id of ids) {
      log(id)
      const product = await this.productRepository.findOne({
        where: {
          id: id
        },
        withDeleted: true
      })
      if (!product) {
        throw new NotFoundException('Bad Request')
      }
      // them vao mang products
      products.push(product)

      // xoa tat ca cac hinh anh trong mang products
      const fileName = path.basename(product.image as string) // 'image-1745912805477-460172612.jpg'
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
          throw new BadRequestException(err.message)
        } else {
          console.log('File deleted successfully')
        }
      })
    }

    // xoa tat ca cac san pham trong database
    await this.productRepository.remove(products)
    // const product: Products | null = await this.productRepository.findOneBy({
    //   id: Number(id)
    // })
    // if (!product) {
    //   throw new Error('Product not found')
    // }
    // // Lấy tên file từ đường dẫn ảnh
    // const fileName = path.basename(product.image as string) // 'image-1745912805477-460172612.jpg'

    // // seadragon-BE/uploads/products
    // const fullImagePath = path.join(
    //   __dirname,
    //   '..',
    //   '..',
    //   '..',
    //   '..',
    //   'uploads',
    //   'products',
    //   fileName
    // )
    // console.log('Full image path:', fullImagePath)
    // fs.unlink(fullImagePath, (err) => {
    //   if (err) {
    //     console.error('Error deleting file:', err)
    //   } else {
    //     console.log('File deleted successfully')
    //   }
    // })
    // if (!product) {
    //   throw new Error('Product not found')
    // }
    // await this.productRepository.remove(product)
    return products
  }

  async getAllDeletedTemporaryProducts(categoryId: string): Promise<any> {
    const list = await this.productRepository.find({
      where: {
        isDeleted: true,
        category: {
          id: Number(categoryId)
        }
      },
      relations: {
        category: true
      },

      withDeleted: true
    })
    return list
  }
}
