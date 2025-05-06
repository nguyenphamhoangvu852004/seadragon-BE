import { Transform } from "class-transformer"
import { formatVNDate } from "../../../shared/baseEntity"

export default class DeleteOrderOutputDto {
  id!: number
  note!: string
  status!: string
  @Transform(({ value }) => (value ? formatVNDate(value) : null), {
    toPlainOnly: true
  })
  deletedAt!: Date
  idDeleted!: boolean
  constructor(data?: Partial<DeleteOrderOutputDto>) {
    Object.assign(this, data)
  }
}
