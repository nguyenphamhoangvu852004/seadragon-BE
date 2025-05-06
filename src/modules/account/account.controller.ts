/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import CreateAccountDTO from './dto/create.account.dto'
import { IAccountService } from './service/IAccountService'
import LoginAccountDTO from './dto/login.account.dto'
import { classToPlain } from 'class-transformer'
import FindAccountDTO from './dto/find.account.dto'
export default class AccountController {
  service: IAccountService
  constructor(service: IAccountService) {
    this.service = service
  }

  async createAccount(req: Request, res: Response): Promise<any> {
    try {
      const { username, email, password, confirmPassword } = req.body
      const dto = new CreateAccountDTO()
      dto.username = username
      dto.email = email
      dto.password = password
      dto.confirmPassword = confirmPassword

      const response = await this.service.createAccount(dto)
      res.status(201).json({
        status: 201,
        message: 'Account created successfully',
        data: classToPlain(response)
      })
      return
    } catch (error: Error | any) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred',
        data: {}
      })
      return
    }
  }

  async login(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body
    const dto = new LoginAccountDTO()
    dto.email = email
    dto.password = password

    const respone = await this.service.login(dto)
    res.status(200).json({
      status: 200,
      message: 'Login successfully',
      data: {
        token: respone
      }
    })
    return
  }
  async getAccount(req: Request, res: Response): Promise<any> {
    try {
      const { id, email } = req.query
      const findDTO = new FindAccountDTO()
      findDTO.id = id as string
      findDTO.email = email as string
      const rs = await this.service.getAccount(findDTO)
      res.status(200).json({
        status: 200,
        message: 'Get account successfully',
        data: classToPlain(rs)
      })
      return
    } catch (error: Error | any) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred',
        data: {}
      })
      return
    }
  }

  async getList(req: Request, res: Response) {
    const list = this.service.getListAccount()
    res.status(200).json({
      status: 200,
      message: 'Get account list',
      data: classToPlain(list)
    })
    return
  }
  async setRolesToAccount(req: Request, res: Response) {
    try {
      const { userId, roles } = req.body
      const account = await this.service.setRolesToAccount(userId, roles)
      res.status(200).json({
        status: 200,
        message: 'Set roles to account successfully',
        data: classToPlain(account)
      })
      return
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred',
        data: {}
      })
      return
    }
  }
}
