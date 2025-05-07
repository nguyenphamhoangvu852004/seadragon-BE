/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAdminService } from './IAdminService'
import IAccountRepo from '../../account/repo/IAccountRepo'
import { hashPassword } from '../../../utils/utils'
import { env } from '../../../config/enviroment'
import { log } from 'console'
import { RoleName } from '../../../utils/enum'
import FindAccountDTO from '../../account/dto/find.account.dto'

export default class AdminServiceImpl implements IAdminService {
  accountRepo: IAccountRepo
  constructor(accountRepo: IAccountRepo) {
    this.accountRepo = accountRepo
  }

  async initAdmin(): Promise<any> {
    try {
      const isExist = await this.accountRepo.checkAccountExistByEmail(
        env.INIT_ADMIN_EMAIL
      )
      log(env.INIT_ADMIN_EMAIL)
      log(isExist)
      if (!isExist) {
        const adminPass = env.INIT_ADMIN_PASSWORD
        const hashedPassword = await hashPassword(adminPass)
        const admin = await this.accountRepo.createAccount({
          username: env.INIT_ADMIN_USERNAME,
          email: env.INIT_ADMIN_EMAIL,
          hashedPassword: hashedPassword
        })
        return admin
      } else {
        throw new Error('Admin already exists')
      }
    } catch (error) {
      log(error)
      return null
    }
  }

  async setRoleToAdmin(): Promise<any> {
    try {
      const admin = await this.accountRepo.findAccount(
        new FindAccountDTO({
          email: env.INIT_ADMIN_EMAIL
        })
      )
      return await this.accountRepo.setRolesToAccount(admin.id, [
        RoleName.ADMIN
      ])
    } catch (error) {
      log(error)
      return null
    }
  }
}
