export default class LoginAccountDTO {
  email!: string
  password!: string
}

export class LoginAccountOutputDTO {
    id!: string
  accessToken!: string
  refreshToken!: string
}
