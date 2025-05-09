export default class CreateCustomerDto {
  fullname!: string
  email!: string
  address!: string
  phoneNumber!: string
  constructor(data?: Partial<CreateCustomerDto>) {
    Object.assign(this, data)
  }
}
