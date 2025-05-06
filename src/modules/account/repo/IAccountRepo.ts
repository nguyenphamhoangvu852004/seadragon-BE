import { Accounts } from '../../../entities/accounts.entity'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IAccountRepo {
  checkAccountExistByEmail(accountId: string): Promise<boolean>
  createAccount(account: any): Promise<any>
  findAccount(data: any): Promise<Accounts>
  getList(): Promise<Accounts[]>
  setRolesToAccount(userId: number, roles: string[]): Promise<Accounts>
  delete(id: number): Promise<Accounts>
}
