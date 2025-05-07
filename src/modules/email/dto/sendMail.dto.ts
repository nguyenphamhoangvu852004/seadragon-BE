import { Transform } from 'class-transformer'
import { formatVNDate } from '../../../shared/baseEntity'

export default class SendMailDto {
  customerEmail!: string
  customerName!: string
  customerPhoneNumber!: string
  customerAdress!: string
  customerNote!: string
  @Transform(({ value }) => (value ? formatVNDate(value) : null), {
    toPlainOnly: true
  })
  date!: Date
  constructor(data?: Partial<SendMailDto>) {
    Object.assign(this, data)
  }
}
