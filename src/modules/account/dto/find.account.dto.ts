export default class FindAccountDTO {
  id!: string
  email!: string
  constructor(data?: Partial<FindAccountDTO>) {
    Object.assign(this, data)
  }
}
