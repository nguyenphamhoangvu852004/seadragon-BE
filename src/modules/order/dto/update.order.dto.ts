import { Transform } from 'class-transformer'
import { formatVNDate } from '../../../shared/baseEntity'

export default class UpdateOrderOutputDto {
  id!: number
  note!: string
  status!: string
  @Transform(({ value }) => (value ? formatVNDate(value) : null), {
    toPlainOnly: true
  })
  updatedAt!: Date
  constructor(data?: Partial<UpdateOrderOutputDto>) {
    Object.assign(this, data)
  }
}
