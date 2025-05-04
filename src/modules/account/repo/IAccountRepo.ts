/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IAccountRepo {
  checkAccountExistByEmail(accountId: string): Promise<boolean>
  createAccount(account: any): Promise<any>
  findAccount(data: any): Promise<any>
  getList():Promise<any>
}
