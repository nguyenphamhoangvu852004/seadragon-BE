/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IRoleService {
  createRoles(): Promise<any>
  getRoleById(id: string): Promise<any>
  getAllRoles(): Promise<any[]>
  updateRole(id: string, data: any): Promise<any>
  deleteRole(id: string): Promise<void>
}
