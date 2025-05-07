import { Repository } from 'typeorm'
import { Roles } from '../../../entities/roles.entity'
import IRoleRepo from './IRoleRepo'
import { AppDataSource } from '../../../config/data-source'
import { RoleName } from '../../../utils/enum'

export default class RoleRepoImpl implements IRoleRepo {
  repo: Repository<Roles>
  constructor() {
    this.repo = AppDataSource.getRepository(Roles)
  }

  async createRoles(): Promise<Roles[]> {
    const listRole = [
      RoleName.ADMIN,
      RoleName.BLOG,
      RoleName.ORDER,
      RoleName.PRODUCT
    ]

    const list = []
    for (const i of listRole) {
      const role = await this.repo.findOneBy({ name: i })
      if (!role) {
        const newRole = new Roles()
        newRole.name = i
        newRole.createdAt = new Date()
        await this.repo.save(newRole)
        list.push(newRole)
      } else {
        list.push(role)
      }
    }
    return list
  }
}
