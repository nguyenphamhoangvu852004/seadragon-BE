import { Transform } from 'class-transformer'
import { formatVNDate } from '../../../shared/baseEntity'

export class CreateBlogInputDTO {
  userId!: string
  title!: string
  body!: string
  image!: string
}

export class CreateBlogOutputDTO {
  id!: number
  title!: string
  body!: string
  image!: string
  @Transform(({ value }) => (value ? formatVNDate(value) : null), {
    toPlainOnly: true
  })
  createdAt!: Date
  user!: UserDTO
  viewAmount!: number
  likeAmount!: number
}

export class UserDTO {
  id!: string
  username!: string
  email!: string
}
