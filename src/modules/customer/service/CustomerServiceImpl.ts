/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Customers } from '../../../entities/customers.entity'
import { BadRequestException } from '../../../shared/BadRequest.exeception'
import { NotFoundException } from '../../../shared/NotFound.exeception'
import CreateCustomerDto from '../dto/create.customer.dto'
import ICustomerRepo from '../repo/ICustomerRepo'
import ICustomerService from './ICustomerService'

export default class CustomerServiceImpl implements ICustomerService {
  repo: ICustomerRepo
  constructor(repo: ICustomerRepo) {
    this.repo = repo
  }

  async getList(): Promise<Customers[]> {
    try {
      const list = await this.repo.getAllCustomer()
      return list
    } catch (error) {
      const list: Customers[] = []
      return list
    }
  }

  async getAllDeletedTemporaryCustomers(): Promise<Customers[]> {
    const list = await this.repo.getListDeleteTeporaryCustomers()
    return list
  }

  async createCustomer(data: CreateCustomerDto): Promise<Customers> {
    try {
      if (await this.repo.isExistEmail(data.email)) {
        throw new Error('Customer is exist')
      }
      const cus = await this.repo.create(data)
      return cus
    } catch (error: Error | any) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message)
      }
      throw new Error('An unknown error occurred')
    }
  }

  async deleteTemporaryCustomers(ids: number[]): Promise<Customers[]> {
    try {
      const list = await this.repo.deleteTemporaryCustomers(ids)
      return list
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message)
      }
      throw new BadRequestException('An unknown error occurred')
    }
  }

  async restoreTemporaryCustomer(id: number): Promise<Customers> {
    try {
      const customer = await this.repo.restoreTemporaryCustomers(id)
      return customer
    } catch (error: Error | any) {
      throw new Error('Bad Request')
    }
  }

  async getDetailCustomer(id: number): Promise<Customers> {
    try {
      const customer = await this.repo.getDetailCustomer(id)
      return customer
    } catch (error: Error | any) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new BadRequestException(error.message)
    }
  }

  async deleteCustomers(ids: number[]): Promise<Customers[]> {
    try {
      const product = await this.repo.deleteCustomers(ids)
      return product
    } catch (error: Error | any) {
      throw new Error(error.message)
    }
  }
}
