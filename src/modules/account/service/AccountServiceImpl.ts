/* eslint-disable @typescript-eslint/no-explicit-any */
import { log } from 'console'
import CreateAccountDTO from '../dto/create.account.dto'
import FindAccountDTO from '../dto/find.account.dto'
import IAccountRepo from '../repo/IAccountRepo'
import { IAccountService } from './IAccountService'
import { comparePassword, hashPassword } from '../../../utils/utils'
import {
  LoginAccountOutputDTO,
  RolePayload,
  UserPayload
} from '../dto/login.account.dto'
import { sign } from 'jsonwebtoken'
import { env } from '../../../config/enviroment'
import { Accounts } from '../../../entities/accounts.entity'

export default class AccountServiceImpl implements IAccountService {
  repo: IAccountRepo
  constructor(repo: IAccountRepo) {
    this.repo = repo
  }

  async createAccount(data: CreateAccountDTO): Promise<any> {
    try {
      const { username, email, password, confirmPassword } = data
      log(username, email, password, confirmPassword)
      // kiểm tra 2 pass, bên FE kiểm rồi
      // gọi repo kiểm tra email tồn tại
      if (await this.repo.checkAccountExistByEmail(email)) {
        throw new Error('Email already exists')
      }
      const hashedPassword = await hashPassword(confirmPassword)
      // gọi repo tạo tài khoản
      const account = await this.repo.createAccount({
        username,
        email,
        hashedPassword
      })
      return account
    } catch (error: Error | any) {
      throw new Error(error.message)
    }
  }

  async login(data: any): Promise<any> {
    try {
      const { email, password } = data
      // lấy thôgn tin acccount bằng email
      const newFindAccountDTO = new FindAccountDTO()
      newFindAccountDTO.email = email
      const account: Accounts = await this.repo.findAccount(newFindAccountDTO)
      log(account)
      if (!account) {
        throw new Error('Account not found')
      }
      // kiểm tra pass
      // if (account.password !== password) {
      //   throw new Error('Password is incorrect')
      // }
      const listRole: RolePayload[] = []
      for (const role of account.roles) {
        const rolePayload: RolePayload = new RolePayload({
          id: String(role.id),
          name: role.name
        })
        listRole.push(rolePayload)
      }

      const userPayload: UserPayload = new UserPayload({
        id: String(account.id),
        email: account.email,
        username: account.username,
        roles: listRole
      })

      if (!(await comparePassword(password, account.password))) {
        throw new Error('Password is incorrect')
      }

      const accessToken = sign(
        { ...userPayload },
        env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: env.ACCESS_TOKEN_EXPIRES_IN as number
        }
      )

      const refreshToken = sign(
        { ...userPayload },
        env.REFRESH_TOKEN_SECRET as string,
        {
          expiresIn: env.REFRESH_TOKEN_EXPIRES_IN as number
        }
      )

      log('accessToken', accessToken)
      log('refreshToken', refreshToken)
      const dto = new LoginAccountOutputDTO()
      dto.id = String(account.id)
      dto.accessToken = accessToken
      dto.refreshToken = refreshToken

      // tra ve token
      return dto
    } catch (error: Error | any) {
      throw new Error(error.message)
    }
  }

  async getAccount(data: FindAccountDTO): Promise<Accounts> {
    try {
      const rs = await this.repo.findAccount(data)
      if (!rs) {
        throw new Error('Account not found')
      }
      return rs
    } catch (error: Error | any) {
      throw new Error(error.message)
    }
  }

  async getListAccount(): Promise<Accounts[]> {
    try {
      const list: Accounts[] = await this.repo.getList()
      const filteredList = list.filter(
        (account) => account.email !== env.INIT_ADMIN_EMAIL
      )
      return filteredList
    } catch (error: Error | any) {
      throw new Error(error.message)
    }
  }

  async setRolesToAccount(userId: string, roles: string[]): Promise<Accounts> {
    try {
      const account = await this.repo.setRolesToAccount(Number(userId), roles)
      return account
    } catch (error: Error | any) {
      throw new Error(error.message)
    }
  }

  async deleteAccounts(ids: number[]): Promise<Accounts[]> {
    try {
      const list: Accounts[] = []
      for (const id of ids) {
        const account = await this.repo.delete(id)
        list.push(account)
      }
      return list
    } catch (error: Error | any) {
      throw new Error(error.message)
    }
  }
}
