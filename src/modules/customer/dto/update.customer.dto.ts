export class UpdateCustomerDto {
  fullname!: string
  email!: string
  address!: string
  phoneNumber!: string
  constructor(data?: Partial<UpdateCustomerDto>) {
    Object.assign(this, data)
  }
}
