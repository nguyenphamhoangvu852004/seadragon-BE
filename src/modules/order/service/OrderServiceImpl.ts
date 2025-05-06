import { Orders, OrderStatus } from '../../../entities/orders.entity'
import { NotFoundException } from '../../../shared/NotFound.exeception'
import ICustomerRepo from '../../customer/repo/ICustomerRepo'
import IProductRepo from '../../product/repo/IProductRepo'
import { CreateOrderInputDto } from '../dto/create.order.dto'
import DeleteOrderOutputDto from '../dto/delete.temporary.order.dto'
import UpdateOrderOutputDto from '../dto/update.order.dto'
import IOrderRepo from '../repo/IOrderRepo'
import IOrderService from './IOrderService'

export default class OrderServiceImpl implements IOrderService {
  orderRepo: IOrderRepo
  productRepo: IProductRepo
  customerRepo: ICustomerRepo
  constructor(
    orderRepo: IOrderRepo,
    productRepo: IProductRepo,
    customerRepo: ICustomerRepo
  ) {
    this.orderRepo = orderRepo
    this.productRepo = productRepo
    this.customerRepo = customerRepo
  }
  async getAllOrders(): Promise<Orders[]> {
    const list = await this.orderRepo.getList()
    return list
  }

  async getDetailOrderById(id: number): Promise<Orders> {
    try {
      const order: Orders = await this.orderRepo.getDetail(id)
      return order
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message)
      }
      throw new Error('An unknown error occurred')
    }
  }
  async createOrder(data: CreateOrderInputDto): Promise<Orders> {
    try {
      // tìm product ton tai trong he thong
      const product = await this.productRepo.getProductById(data.productId)
      if (!product) {
        throw new Error('Product not found')
      }
      // tìm khach hang ton tai trong he thong
      const customer = await this.customerRepo.getDetailCustomer(
        Number(data.customerId)
      )
      if (!customer) {
        throw new Error('Customer not found')
      }

      const order = new Orders({
        product: product,
        customer: customer,
        note: data.note,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        status: OrderStatus.PROCESSING,
        isDeleted: false
      })

      const newOrder = await this.orderRepo.createOrder(order)
      return newOrder
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('An unknown error occurred')
    }
  }

  async updateStatusOrder(
    ids: number[],
    status: string
  ): Promise<UpdateOrderOutputDto[]> {
    try {
      const list: Orders[] = []
      const listOutput: UpdateOrderOutputDto[] = []
      for (const id of ids) {
        const res = await this.orderRepo.updateStatusOrder(id, status)
        list.push(res)
      }
      for (const item of list) {
        const dto = new UpdateOrderOutputDto({
          id: item.id,
          note: item.note,
          status: item.status,
          updatedAt: item.updatedAt as Date
        })
        listOutput.push(dto)
      }
      return listOutput
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('An unknown error occurred')
    }
  }

  async deleteTemporaryOrders(ids: number[]): Promise<DeleteOrderOutputDto[]> {
    try {
      const list: Orders[] = []
      const listOutput: DeleteOrderOutputDto[] = []
      for (const id of ids) {
        const res = await this.orderRepo.deleteTemporaryOrders(id)
        list.push(res)
      }
      for (const item of list) {
        const dto = new DeleteOrderOutputDto({
          id: item.id,
          note: item.note,
          status: item.status,
          idDeleted: item.isDeleted,
          deletedAt: item.deletedAt as Date
        })
        listOutput.push(dto)
      }
      return listOutput
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('An unknown error occurred')
    }
  }

  async getTemporaryOrders(): Promise<Orders[]> {
    try {
      const list = await this.orderRepo.getTemporaryOrder()
      return list
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('An unknown error occurred')
    }
  }

  async restoreOrders(ids: number[]): Promise<Orders[]> {
    try {
      const list: Orders[] = []
      for (const id of ids) {
        const res = await this.orderRepo.restoreOrders(id)
        list.push(res)
      }
      return list

      return list
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('An unknown error occurred')
    }
  }

  async deleteOrders(ids: number[]): Promise<Orders[]> {
    try {
      const list: Orders[] = []
      for (const id of ids) {
        const res = await this.orderRepo.deleteOrder(id)
        list.push(res)
      }
      return list
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('An unknown error occurred')
    }
  }
}
