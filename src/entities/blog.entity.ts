import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Accounts } from './accounts.entity'

export enum BlogStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

@Entity('blogs')
export class Blogs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Accounts, (account) => account.blogs, {
    onDelete: 'CASCADE',
    nullable: false
  })
  @JoinColumn({ name: 'account_id' })
  account!: Accounts

  @Column({ type: 'varchar', nullable: false })
  title!: string

  @Column({ type: 'varchar', nullable: false })
  image!: string

  @Column({ type: 'int', nullable: false })
  viewAmount!: number

  @Column({ type: 'int', nullable: false })
  likeAmount!: number

  @Column({ type: 'varchar', nullable: false })
  body!: string

  @Column({
    type: 'enum',
    enum: BlogStatus
  })
  status!: string

  setDefaultStatus() {
    this.status = BlogStatus.ACTIVE
  }
  setDefaultViewAmount() {
    this.viewAmount = 0
  }
  setDefaultLikeAmount() {
    this.likeAmount = 0
  }
  increaseViewAmount() {
    this.viewAmount++
  }
  increaseLikeAmount() {
    this.likeAmount++
  }
  decreaseLikeAmount() {
    this.likeAmount--
  }
  decreaseViewAmount() {
    this.viewAmount--
  }
}
