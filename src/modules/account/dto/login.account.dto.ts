export default class LoginAccountDTO {
  email!: string
  password!: string
}

export class UserPayload {
  id!: string
  email!: string
  username!: string
  roles!: RolePayload[]
  constructor(data?: Partial<UserPayload>) {
    Object.assign(this, data)
  }
}
export class RolePayload {
  id!: string
  name!: string
  constructor(data?: Partial<RolePayload>) {
    Object.assign(this, data)
  }
}

export class LoginAccountOutputDTO {
  id!: string
  accessToken!: string
  refreshToken!: string
}
