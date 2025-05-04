/* eslint-disable @typescript-eslint/no-explicit-any */
import { Customers } from '../../../entities/customers.entity'

export default interface ICustomerService {
  getList(): Promise<Customers[]>
  createCustomer(data: any): Promise<Customers>
  deleteTemporaryCustomers(ids: number[]): Promise<Customers[]>
  restoreTemporaryService(id: number): Promise<Customers>
  getDetailCustomer(id: number): Promise<Customers>
  deleteCustomers(ids: number[]): Promise<Customers[]>
}
