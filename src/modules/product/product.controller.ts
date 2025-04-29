import { IProductService } from './service/IProductService'
import { Request, Response } from 'express'
export default class ProductController {
  productService: IProductService
  constructor(productService: IProductService) {
    this.productService = productService
  }

  async getAllProducts(req: Request, res: Response) {
    const categoryId = req.query.categoryId
    const products = await this.productService.getAllProduct(
      categoryId as string
    )
    res.status(200).json({
      status: 200,
      message: 'Get all products successfully',
      data: products // Replace with actual data from your service
    })
  }
  async getAllDeletedTemporaryProducts(req: Request, res: Response) {
    const categoryId = req.query.categoryId
    const products = await this.productService.getAllDeletedTemporaryProducts(
      categoryId as string
    )
    res.status(200).json({
      status: 200,
      message: 'Get all deleted temporary products successfully',
      data: products // Replace with actual data from your service
    })
  }
  async getProductById(req: Request, res: Response) {
    const id = req.params.id
    const product = await this.productService.getProductById(id)
    res.status(200).json({
      status: 200,
      message: 'Get product by id successfully',
      data: product // Replace with actual data from your service
    })
  }

  async deleteTemporaryProduct(req: Request, res: Response) {
    const id = req.params.id
    const product = await this.productService.deleteTemporaryProduct(id)
    res.status(200).json({
      status: 200,
      message: 'Delete product successfully',
      data: product // Replace with actual data from your service
    })
  }
  async restoreTemporaryProduct(req: Request, res: Response) {
    const id = req.params.id
    const product = await this.productService.restoreTemporaryProduct(id)
    res.status(200).json({
      status: 200,
      message: 'Restore product successfully',
      data: product // Replace with actual data from your service
    })
  }

  async deleteProduct(req: Request, res: Response) {
    const id = req.params.id
    const product = await this.productService.deleteProduct(id)
    res.status(200).json({
      status: 200,
      message: 'Delete product successfully',
      data: product // Replace with actual data from your service
    })
  }

  async createProduct(req: Request, res: Response) {
    const { name, description, price, categoryId } = req.body
    const image = req.file?.filename
    const product = await this.productService.createProduct(data)
    res.status(200).json({
      status: 200,
      message: 'Create product successfully',
      data: product // Replace with actual data from your service
    })
  }
}
