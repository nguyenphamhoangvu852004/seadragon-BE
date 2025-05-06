import { Transform } from 'class-transformer'
import { formatVNDate } from '../../../shared/baseEntity'

export class GetBlogTemporaryOutputDTO {
  id!: number
  title!: string
  body!: string
  image!: string
  @Transform(({ value }) => (value ? formatVNDate(value) : null), {
    toPlainOnly: true
  })
  createdAt!: Date
  @Transform(({ value }) => (value ? formatVNDate(value) : null), {
    toPlainOnly: true
  })
  deletedAt!: Date
  isDeteled!: boolean
  viewAmount!: number
  likeAmount!: number
  account!: AccountDTO
}
export class AccountDTO {
  id!: string
  username!: string
  email!: string
}
