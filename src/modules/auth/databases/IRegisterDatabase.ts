import { Users } from '../../../entities/accounts.entity'

export interface IRegisterDatabase {
  execute(data: Users): Promise<Users>
  findAccountByEmail(email: string): Promise<Users | null>
}
