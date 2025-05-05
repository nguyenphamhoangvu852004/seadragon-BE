/* eslint-disable @typescript-eslint/no-explicit-any */
import { log } from 'console'
import { AppDataSource } from '../../../config/data-source'
import { Categories } from '../../../entities/categories.entity'
import ICategoryRepo from './ICategoryRepo'
import { CreateCategoryDTO } from '../dto/create.category.dto'
import { UpdateCategoryDTO } from '../dto/update.category.dto'
import { Repository } from 'typeorm'
import { Products } from '../../../entities/products.entity'

export default class CategoryRepoIpml implements ICategoryRepo {
  categoryRepository: Repository<Categories>
  productRepository: Repository<Products>
  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Categories)
    this.productRepository = AppDataSource.getRepository(Products)
  }

  async getAllCategories(): Promise<any> {
    const list = await this.categoryRepository.find({
      where: {
        isDeleted: false
      },
      withDeleted: false
    })
    log('list', list)
    return list
  }

  async getCategoryById(id: string): Promise<any> {
    return await this.categoryRepository.findOneBy({ id: Number(id) })
  }

  async getAllDeletedTemporaryCategories(): Promise<Categories[]> {
    const list = await this.categoryRepository.find({
      where: {
        isDeleted: true
      },
      withDeleted: true
    })
    log('list category da xoa tam', list)
    return list
  }

  async createCategory(data: CreateCategoryDTO): Promise<any> {
    try {
      const newCategory = this.categoryRepository.create({
        name: data.name,
        createdAt: new Date()
      })
      await this.categoryRepository.save(newCategory)
      return newCategory
    } catch (error) {
      console.log('error', error)
      throw new Error('Error creating category')
    }
  }
  async updateCategory(data: UpdateCategoryDTO): Promise<any> {
    try {
      const category = await this.categoryRepository.findOneBy({ id: data.id })
      if (!category) {
        throw new Error('Category not found')
      }
      category.name = data.name
      await this.categoryRepository.save(category)
      return category
    } catch (error) {
      console.log('error', error)
      throw new Error('Error updating category')
    }
  }
  async deleteCategory(ids: number[]): Promise<any> {
    const listCategory: Categories[] = []
    for (let index = 0; index < ids.length; index++) {
      const id = ids[index]
      const category = await this.categoryRepository.findOne({
        where: {
          id: Number(id)
        }
      })
      log('category', category)
      if (!category) {
        throw new Error('Category not found')
      }
      const products = await this.productRepository.find({
        where: {
          category: {
            id: Number(id)
          }
        }
      })
      if (products.length > 0) {
        throw new Error('Cannot delete category with products')
      }
      listCategory.push(category)
    }
    await this.categoryRepository.remove(listCategory)
    return listCategory
  }

  async deleteTemporaryCategory(ids: number[]): Promise<any> {
    console.log('ids', ids)
    const listCategory: Categories[] = []
    for (let index = 0; index < ids.length; index++) {
      const id = ids[index]
      const category = await this.categoryRepository.findOne({
        where: {
          id: Number(id)
        },
        withDeleted: false
      })
      const products: Products[] = await this.productRepository.find({
        where: {
          category: {
            id: Number(id)
          }
        },
        withDeleted: true
      })
      products.forEach((product) => {
        product.isDeleted = true
        product.deletedAt = new Date()
      })
      log('category', category)
      if (!category) {
        throw new Error('Category not found')
      }
      category.isDeleted = true
      category.deletedAt = new Date()
      await this.productRepository.save(products)
      listCategory.push(category)
    }
    await this.categoryRepository.save(listCategory)
    return listCategory
  }

  async restoreTemporaryCategory(id: number): Promise<any> {
    log('id can xoa', id)
    const category = await this.categoryRepository.findOne({
      where: {
        id: Number(id)
      },
      withDeleted: true
    })
    if (!category) {
      throw new Error('Category not found')
    }
    category.isDeleted = false
    category.deletedAt = null
    await this.categoryRepository.save(category)
    return category
  }
}
