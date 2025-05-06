import { Accounts } from '../../../entities/accounts.entity'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAccountService {
  createAccount(data: any): Promise<any>
  login(data: any): Promise<any>
  getAccount(data: any): Promise<any>
  getListAccount(): Promise<Accounts[]>
  setRolesToAccount(userId: string, roles: string[]): Promise<Accounts>
  deleteAccounts(ids: number[]): Promise<Accounts[]>
}
