import { Column } from 'typeorm'
import { Transform } from 'class-transformer'
import { format, toZonedTime } from 'date-fns-tz'

export function formatVNDate(date: Date) {
  return format(toZonedTime(date, 'Asia/Ho_Chi_Minh'), 'yyyy-MM-dd HH:mm:ss')
}

export class BaseEntity {
  @Column({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
    comment: 'Creation time'
  })
  @Transform(({ value }) => (value ? formatVNDate(value) : null), {
    toPlainOnly: true
  })
  createdAt!: Date

  @Column({
    type: 'timestamp',
    name: 'updated_at',
    nullable: true,
    comment: 'Update time'
  })
  @Transform(({ value }) => (value ? formatVNDate(value) : null), {
    toPlainOnly: true
  })
  updatedAt!: Date | null

  @Column({
    type: 'timestamp',
    name: 'deleted_at',
    nullable: true,
    comment: 'Deletion time'
  })
  @Transform(({ value }) => (value ? formatVNDate(value) : null), {
    toPlainOnly: true
  })
  deletedAt!: Date | null

  constructor(data?: Partial<BaseEntity>) {
    Object.assign(this, data)
  }
}
