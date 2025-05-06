import { Repository } from 'typeorm'
import { Orders } from '../../../entities/orders.entity'
import IOrderRepo from './IOrderRepo'
import { AppDataSource } from '../../../config/data-source'
import { NotFoundException } from '../../../shared/NotFound.exeception'
import { log } from 'console'

export default class OrderRepoImpl implements IOrderRepo {
  orderRepository: Repository<Orders>
  constructor() {
    this.orderRepository = AppDataSource.getRepository(Orders)
  }
  async getList(): Promise<Orders[]> {
    const list: Orders[] = await this.orderRepository.find({
      where: {
        isDeleted: false
      },
      withDeleted: false
    })
    return list
  }

  async getDetail(id: number): Promise<Orders> {
    const order = await this.orderRepository.findOneBy({ id: id })
    if (!order) {
      throw new NotFoundException('Order not found')
    }
    return order
  }

  async createOrder(data: Orders): Promise<Orders> {
    const newOrder = await this.orderRepository.save(data)
    if (!newOrder) {
      throw new Error('Create order failed')
    }
    return newOrder
  }

  async updateStatusOrder(id: number, status: string): Promise<Orders> {
    const order = await this.orderRepository.findOneBy({ id: id })
    if (!order) {
      throw new Error('Order not found')
    }
    order.status = status
    order.updatedAt = new Date()
    const updatedOrder = await this.orderRepository.save(order)
    if (!updatedOrder) {
      throw new Error('Update order failed')
    }
    return updatedOrder
  }

  async deleteTemporaryOrders(id: number): Promise<Orders> {
    const order = await this.orderRepository.findOneBy({ id: id })
    if (!order) {
      throw new Error('Order not found')
    }
    order.isDeleted = true
    order.deletedAt = new Date()
    const updatedOrder = await this.orderRepository.save(order)
    if (!updatedOrder) {
      throw new Error('Update order failed')
    } else {
      return updatedOrder
    }
  }

  async getTemporaryOrder(): Promise<Orders[]> {
    log('doinggg')
    const list: Orders[] = await this.orderRepository.find({
      withDeleted: true,
      where: {
        isDeleted: true
      }
    })
    log(list)
    return list
  }

  async restoreOrders(id: number): Promise<Orders> {
    const order = await this.orderRepository.findOne({
      where: {
        id: id
      }
    })
    if (!order) {
      throw new Error('Order not found')
    }
    order.isDeleted = false
    order.deletedAt = null
    const updatedOrder = await this.orderRepository.save(order)
    if (!updatedOrder) {
      throw new Error('Update order failed')
    } else {
      return updatedOrder
    }
  }

  async deleteOrder(id: number): Promise<Orders> {
    const order = await this.orderRepository.findOneBy({ id: id })
    if (!order) {
      throw new Error('Order not found')
    }
    const deletedOrder = await this.orderRepository.remove(order)
    if (!deletedOrder) {
      throw new Error('Delete order failed')
    } else {
      return deletedOrder
    }
  }
}
