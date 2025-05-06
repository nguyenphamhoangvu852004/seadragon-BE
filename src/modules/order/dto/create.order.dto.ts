export class CreateOrderInputDto {
  customerId!: string
  productId!: string
  note!: string

  constructor(data?: Partial<CreateOrderInputDto>) {
    Object.assign(this, data)
  }
}
