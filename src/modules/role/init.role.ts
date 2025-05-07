import RoleRepoImpl from './repo/RoleRepoImpl'
import RoleController from './role.controller'
import RoleServiceImpl from './service/RoleServiceImpl'

export default class InitRole {
  constructor() {
    const roleRepo = new RoleRepoImpl()
    const roleService = new RoleServiceImpl(roleRepo)
    const roleController = new RoleController(roleService)
    roleController.createRoles()
  }
}
