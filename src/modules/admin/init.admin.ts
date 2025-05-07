import AccountRepoImpl from '../account/repo/AccountRepoImpl'
import AdminController from './account.controller'
import AdminServiceImpl from './service/AdminServiceImpl'

export default class InitAdmin {
  constructor() {
    const accountRepo = new AccountRepoImpl()
    const adminService = new AdminServiceImpl(accountRepo)
    const adminController = new AdminController(adminService)
    adminController.createAccountAdmin()
    adminController.setRoleToAdmin()
  }
}
