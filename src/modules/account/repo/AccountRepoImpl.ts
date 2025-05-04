/* eslint-disable @typescript-eslint/no-explicit-any */
import { Repository } from 'typeorm'
import { AppDataSource } from '../../../config/data-source'
import { Accounts } from '../../../entities/accounts.entity'
import IAccountRepo from './IAccountRepo'
import FindAccountDTO from '../dto/find.account.dto'
import { log } from 'console'

export default class AccountRepoImpl implements IAccountRepo {
  accountRepo: Repository<Accounts>
  constructor() {
    this.accountRepo = AppDataSource.getRepository(Accounts)
  }
  async checkAccountExistByEmail(email: string): Promise<boolean> {
    const account = await this.accountRepo.findOneBy({ email: email })
    if (account) {
      return true
    }
    return false
  }
  async createAccount(account: any): Promise<any> {
    const { username, email, hashedPassword } = account
    log('createAccount', account)
    const newAccount = new Accounts()
    newAccount.username = username
    newAccount.email = email
    newAccount.password = hashedPassword
    newAccount.createdAt = new Date()
    const res = this.accountRepo.create(newAccount)
    await this.accountRepo.save(res)
    return res
  }

  async findAccount(data: FindAccountDTO): Promise<any> {
    const whereClause: any = {}
    if (data.id) {
      whereClause.id = Number(data.id)
    }

    if (data.email) {
      whereClause.email = data.email
    }
    const account = await this.accountRepo.findOne({
      where: whereClause,
      relations: {
        roles: true
      }
    })
    if (account) {
      return account
    }
    return null
  }

  async getList(): Promise<any> {
    const listAccount = await this.accountRepo.find()
    return listAccount
  }
}
