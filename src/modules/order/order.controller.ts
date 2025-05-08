import { Request, Response } from 'express'
import IOrderService from './service/IOrderService'
import { classToPlain } from 'class-transformer'
import { CreateOrderInputDto } from './dto/create.order.dto'
import { NotFoundException } from '../../shared/NotFound.exeception'

export default class OrderController {
  service: IOrderService
  constructor(service: IOrderService) {
    this.service = service
  }

  async getAllOrder(req: Request, res: Response) {
    try {
      const list = await this.service.getAllOrders()
      res.status(200).json({
        status: 200,
        message: 'Get all orders successfully',
        data: classToPlain(list)
      })
      return
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred',
        data: {}
      })
      return
    }
  }
  async getDetailOrder(req: Request, res: Response) {
    try {
      const id = req.params.id
      const order = await this.service.getDetailOrderById(Number(id))
      res.status(200).json({
        status: 200,
        message: 'Get order successfully',
        data: classToPlain(order)
      })
      return
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({
          status: 404,
          message: error.message
        })
        return
      }
      res.status(400).json({
        status: 400,
        message: 'An error occurred',
        data: {}
      })
      return
    }
  }
  async createOrder(req: Request, res: Response) {
    try {
      const { customerId, productId, note } = req.body
      const inputDto = new CreateOrderInputDto({
        customerId: customerId,
        productId: productId,
        note: note
      })
      const response = await this.service.createOrder(inputDto)
      res.status(201).json({
        status: 201,
        message: 'Created',
        data: classToPlain(response)
      })
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          status: 400,
          message: error.message,
          data: {}
        })
        return
      }
      res.status(400).json({
        status: 400,
        message: 'An error occurred',
        data: {}
      })
      return
    }
  }
  async updateStatusOrder(req: Request, res: Response) {
    try {
      const { ids, status } = req.body

      const listIdsNumber: number[] = []
      ids.forEach((element: string) => {
        listIdsNumber.push(Number(element))
      })

      const response = await this.service.updateStatusOrder(
        listIdsNumber,
        status
      )
      res.status(200).json({
        status: 200,
        message: 'Update status order successfully',
        data: classToPlain(response)
      })
      return
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred',
        data: {}
      })
    }
  }
  async deleteTemporaryOrders(req: Request, res: Response) {
    try {
      const { ids } = req.body
      const list = await this.service.deleteTemporaryOrders(ids)
      res.status(200).json({
        status: 200,
        message: 'Deleted success',
        data: classToPlain(list)
      })
      return
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred',
        data: {}
      })
      return
    }
  }
  async getTemporaryOrder(req: Request, res: Response) {
    try {
      const list = await this.service.getTemporaryOrders()
      res.status(200).json({
        status: 200,
        message: 'Get temporary order successfully',
        data: classToPlain(list)
      })
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred',
        data: {}
      })
      return
    }
  }
  async restoreOrders(req: Request, res: Response) {
    try {
      const { ids } = req.body
      const list = await this.service.restoreOrders(ids)
      res.status(200).json({
        status: 200,
        message: 'Restore order successfully',
        data: classToPlain(list)
      })
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred',
        data: {}
      })
    }
  }
  async deleteOrders(req: Request, res: Response) {
    try {
      const { ids } = req.body
      const list = await this.service.deleteOrders(ids)
      res.status(200).json({
        status: 200,
        message: 'Deleted success',
        data: classToPlain(list)
      })
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred',
        data: {}
      })
    }
  }
}
