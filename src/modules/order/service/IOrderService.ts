import { Orders } from '../../../entities/orders.entity'
import { CreateOrderInputDto } from '../dto/create.order.dto'
import DeleteOrderOutputDto from '../dto/delete.temporary.order.dto'
import UpdateOrderOutputDto from '../dto/update.order.dto'

export default interface IOrderService {
  getAllOrders(): Promise<Orders[]>
  createOrder(data: CreateOrderInputDto): Promise<Orders>
  updateStatusOrder(
    ids: number[],
    status: string
  ): Promise<UpdateOrderOutputDto[]>
  getDetailOrderById(id: number): Promise<Orders>
  deleteTemporaryOrders(ids: number[]): Promise<DeleteOrderOutputDto[]>
  getTemporaryOrders(): Promise<Orders[]>
  restoreOrders(ids: number[]): Promise<Orders[]>
  deleteOrders(ids: number[]): Promise<Orders[]>
}
