import { classToPlain } from 'class-transformer'
import { CreateProductDTO } from './dto/create.product.dto'
import { UpdateProductDTO } from './dto/update.product.dto'
import { IProductService } from './service/IProductService'
import { Request, Response } from 'express'
import { BadRequestException } from '../../shared/BadRequest.exeception'
import { Products } from '../../entities/products.entity'
export default class ProductController {
  productService: IProductService
  constructor(productService: IProductService) {
    this.productService = productService
  }

  async getAllProducts(req: Request, res: Response) {
    try {
      const categoryId = req.query.categoryId
      const products = await this.productService.getAllProduct(
        categoryId as string
      )
      res.status(200).json({
        status: 200,
        message: 'Get all products successfully',
        data: classToPlain(products)
      })
      return
    } catch (error) {
      console.log(error)
      res.status(200).json({
        status: 200,
        message: 'Empty list',
        data: []
      })
      return
    }
  }
  async getAllDeletedTemporaryProducts(req: Request, res: Response) {
    try {
      const categoryId = req.query.categoryId
      const products = await this.productService.getAllDeletedTemporaryProducts(
        categoryId as string
      )
      res.status(200).json({
        status: 200,
        message: 'Get all deleted temporary products successfully',
        data: classToPlain(products)
      })
      return
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred'
      })
      return
    }
  }
  async getProductById(req: Request, res: Response) {
    try {
      const id = req.params.id
      const product = await this.productService.getProductById(id)
      res.status(200).json({
        status: 200,
        message: 'Get product by id successfully',
        data: classToPlain(product)
      })
      return
    } catch (error) {
      if (error instanceof BadRequestException) {
        res.status(400).json({
          status: 400,
          message: error.message
        })
        return
      }
      res.status(404).json({
        status: 404,
        message: error instanceof Error ? error.message : 'An error occurred'
      })
      return
    }
  }

  async deleteTemporaryProducts(req: Request, res: Response) {
    try {
      const { ids } = req.body
      const product = await this.productService.deleteTemporaryProducts(ids)
      res.status(200).json({
        status: 200,
        message: 'Delete product successfully',
        data: classToPlain(product)
      })
      return
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred'
      })
      return
    }
  }
  async restoreTemporaryProduct(req: Request, res: Response) {
    try {
      const id = req.params.id
      const product = await this.productService.restoreTemporaryProduct(id)
      res.status(200).json({
        status: 200,
        message: 'Restore product successfully',
        data: classToPlain(product)
      })
      return
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: 'Restore Failed',
        data: error
      })
      return
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { ids } = req.body
      console.log('ids', ids)
      const products: Products[] = await this.productService.deleteProducts(ids)
      res.status(200).json({
        status: 200,
        message: 'Delete products successfully',
        data: classToPlain(products)
      })
      return
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred'
      })
      return
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const { title, description, price, categoryId } = req.body
      const image = req.file?.filename as string
      const newProduct = new CreateProductDTO()
      newProduct.title = title
      newProduct.description = description
      newProduct.price = price as number
      newProduct.categoryId = categoryId as number
      newProduct.image = image
      console.log('newProduct', newProduct)
      const product = await this.productService.createProduct(newProduct)
      res.status(201).json({
        status: 201,
        message: 'Create product successfully',
        data: classToPlain(product)
      })
      return
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: 'Created Failed',
        data: error
      })
      return
    }
  }
  async updateProduct(req: Request, res: Response) {
    try {
      const id = req.params.id
      const { title, description, price, categoryId } = req.body
      console.log('body', req.body)
      const image = req.file?.filename as string
      const newProduct = new UpdateProductDTO()
      newProduct.id = id
      newProduct.title = title
      newProduct.description = description
      newProduct.price = price as number
      newProduct.categoryId = categoryId as number
      newProduct.image = image
      console.log('newProduct', newProduct)
      const product = await this.productService.updateProduct(newProduct)
      res.status(200).json({
        status: 200,
        message: 'Update product successfully',
        data: classToPlain(product)
      })
      return
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: 'Updated Failed',
        data: error
      })
      return
    }
  }
}
