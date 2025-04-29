import { IProductService } from './service/IProductService'
import { Request, Response } from 'express'
export default class ProductController {
  productService: IProductService
  constructor(productService: IProductService) {
    this.productService = productService
  }

  getAllProducts(req: Request, res: Response) {
    const products = this.productService.getAllProduct()
    res.status(200).json({
      status: 200,
      message: 'Get all products successfully',
      data: products // Replace with actual data from your service
    })
  }
}
