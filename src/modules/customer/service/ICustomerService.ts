/* eslint-disable @typescript-eslint/no-explicit-any */
import { Customers } from '../../../entities/customers.entity'
import { UpdateCustomerDto } from '../dto/update.customer.dto'

export default interface ICustomerService {
  getList(): Promise<Customers[]>
  getAllDeletedTemporaryCustomers(): Promise<Customers[]>
  createCustomer(data: any): Promise<Customers>
  deleteTemporaryCustomers(ids: number[]): Promise<Customers[]>
  restoreTemporaryCustomer(id: number): Promise<Customers>
  getDetailCustomer(id: number): Promise<Customers>
  deleteCustomers(ids: number[]): Promise<Customers[]>
  updateCustomer(id: number, data: UpdateCustomerDto): Promise<Customers>
}
