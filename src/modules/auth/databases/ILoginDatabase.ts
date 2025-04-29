import { Users } from '../../../entities/accounts.entity'

export interface ILoginDatase {
  execute(data: Users): Promise<void>
  findAccountByEmail(email: string): Promise<Users>
}
