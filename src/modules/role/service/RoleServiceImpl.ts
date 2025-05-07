/* eslint-disable @typescript-eslint/no-explicit-any */

import IRoleRepo from '../repo/IRoleRepo'
import IRoleService from './IRoleService'

export default class RoleServiceImpl implements IRoleService {
  repo: IRoleRepo
  constructor(repo: IRoleRepo) {
    this.repo = repo
  }
  async createRoles(): Promise<any> {
    try {
      const list = await this.repo.createRoles()
      return list
    } catch (error: Error | any) {
      throw new Error(error.message)
    }
  }
  getRoleById(id: string): Promise<any> {
    throw new Error('Method not implemented.')
  }
  getAllRoles(): Promise<any[]> {
    throw new Error('Method not implemented.')
  }
  updateRole(id: string, data: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
  deleteRole(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
