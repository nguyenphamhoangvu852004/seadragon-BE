/* eslint-disable @typescript-eslint/no-explicit-any */
import { log } from 'console'
import CreateAccountDTO from '../dto/create.account.dto'
import FindAccountDTO from '../dto/find.account.dto'
import IAccountRepo from '../repo/IAccountRepo'
import { IAccountService } from './IAccountService'
import { comparePassword, hashPassword } from '../../../utils/utils'
import { LoginAccountOutputDTO } from '../dto/login.account.dto'
import jwt from 'jsonwebtoken'
import { env } from '../../../config/enviroment'

export default class AccountServiceImpl implements IAccountService {
  repo: IAccountRepo
  constructor(repo: IAccountRepo) {
    this.repo = repo
  }

  async createAccount(data: CreateAccountDTO): Promise<any> {
    try {
      const { username, email, password, confirmPassword } = data

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
    const { email, password } = data
    // lấy thôgn tin acccount bằng email
    const newFindAccountDTO = new FindAccountDTO()
    newFindAccountDTO.email = email
    const account = await this.repo.findAccount(newFindAccountDTO)
    log(account)
    if (!account) {
      throw new Error('Account not found')
    }
    // kiểm tra pass
    // if (account.password !== password) {
    //   throw new Error('Password is incorrect')
    // }
    const payloads = {
      id: account.id,
      email: account.email,
      username: account.username
    }
    if (!(await comparePassword(password, account.password))) {
      throw new Error('Password is incorrect')
    }

    const accessToken = jwt.sign(payloads, env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN
    })
    const refreshToken = jwt.sign(
      payloads,
      env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: env.REFRESH_TOKEN_EXPIRES_IN
      }
    )
    log('accessToken', accessToken)
    log('refreshToken', refreshToken)
    const dto = new LoginAccountOutputDTO()
    dto.id = account.id
    dto.accessToken = accessToken
    dto.refreshToken = refreshToken

    // tra ve token
    return dto
  }

  async getAccount(data: FindAccountDTO): Promise<any> {
    const rs = await this.repo.findAccount(data)
    if (!rs) {
      throw new Error('Account not found')
    }
    return rs
  }

  async getListAccount(): Promise<any> {
    const list = await this.repo.getList()
    return list
  }
}
