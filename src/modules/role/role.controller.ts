import IRoleService from "./service/IRoleService"

export default class RoleController {
  roleService: IRoleService
  constructor(roleService: IRoleService) {
    this.roleService = roleService  }
}