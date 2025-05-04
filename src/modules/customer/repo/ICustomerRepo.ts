/* eslint-disable @typescript-eslint/no-explicit-any */
import { Customers } from '../../../entities/customers.entity'

export default interface ICustomerRepo {
  getAllCustomer(): Promise<Customers[]>
  create(data: any): Promise<Customers>
  isExistEmail(email: string): Promise<boolean>
  getListDeleteTeporaryCustomers(): Promise<Customers[]>
  deleteTemporaryCustomers(ids: number[]): Promise<Customers[]>
  restoreTemporaryCustomers(id: number): Promise<Customers>
  getDetailCustomer(id: number): Promise<Customers>
  deleteCustomers(ids: number[]): Promise<Customers[]>
}
