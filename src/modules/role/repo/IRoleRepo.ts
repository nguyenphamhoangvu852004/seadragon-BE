import { Roles } from '../../../entities/roles.entity'

export default interface IRoleRepo {
  createRoles(): Promise<Roles[]>
}
