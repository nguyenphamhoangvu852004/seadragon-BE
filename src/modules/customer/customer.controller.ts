import { Request, Response } from 'express'
import ICustomerService from './service/ICustomerService'
import { classToPlain } from 'class-transformer'
import CreateCustomerDto from './dto/create.customer.dto'
import { log } from 'console'
import { NotFoundException } from '../../shared/NotFound.exeception'
export default class CustomerController {
  customerService: ICustomerService
  constructor(service: ICustomerService) {
    this.customerService = service
  }
  async getAllCustomers(req: Request, res: Response) {
    const list = await this.customerService.getList()
    res.status(200).json({
      status: 200,
      message: 'Get List Customer Success',
      data: classToPlain(list)
    })
    return
  }
  async getAllDeletedTemporaryCustomers(req: Request, res: Response) {
    const list = await this.customerService.getAllDeletedTemporaryCustomers()
    res.status(200).json({
      status: 200,
      message: 'Get List Customer Success',
      data: classToPlain(list)
    })
    return
  }

  async createCustomer(req: Request, res: Response) {
    try {
      const { fullname, email, address, phoneNumber } = req.body
      const newDto = new CreateCustomerDto()
      newDto.fullname = fullname
      newDto.address = address
      newDto.email = email
      newDto.phoneNumber = phoneNumber
      const response = await this.customerService.createCustomer(newDto)
      log('response', response)
      res.status(201).json({
        status: 201,
        message: 'Created',
        data: classToPlain(response)
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

  async deleteTemporaryCustomers(req: Request, res: Response) {
    try {
      const { ids } = req.body
      const list = await this.customerService.deleteTemporaryCustomers(ids)
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
  async getDetailCustomers(req: Request, res: Response) {
    try {
      const id = req.params.id
      const customer = await this.customerService.getDetailCustomer(Number(id))
      res.status(200).json({
        status: 200,
        message: 'Restore product successfully',
        data: classToPlain(customer)
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
        message: error instanceof Error ? error.message : 'An error occurred',
        data: {}
      })
      return
    }
  }
  async deleteCustomers(req: Request, res: Response) {
    try {
      const { ids } = req.body
      const list = await this.customerService.deleteCustomers(ids)
      res.status(200).json({
        status: 200,
        message: 'Deleted success',
        data: classToPlain(list)
      })
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred'
      })
      return
    }
  }
  async restoreTemporaryCustomer(req: Request, res: Response) {
    try {
      const id = req.params.id
      const product = await this.customerService.restoreTemporaryCustomer(
        Number(id)
      )
      res.status(200).json({
        status: 200,
        message: 'Restore product successfully',
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
}
