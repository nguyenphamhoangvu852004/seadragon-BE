import { Orders } from '../../../entities/orders.entity'

export default interface IOrderRepo {
  getList(): Promise<Orders[]>
  createOrder(data: Orders): Promise<Orders>
  updateStatusOrder(id: number, status: string): Promise<Orders>
  getDetail(id: number): Promise<Orders>
  deleteTemporaryOrders(id: number): Promise<Orders>
  getTemporaryOrder(): Promise<Orders[]>
  restoreOrders(id: number): Promise<Orders>
  deleteOrder(id: number): Promise<Orders>
}
