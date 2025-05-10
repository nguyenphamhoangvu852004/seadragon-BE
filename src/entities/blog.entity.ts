import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Accounts } from './accounts.entity'

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

  @Column({ type: 'text', nullable: false })
  body!: string

  @Column({
    type: 'boolean',
    nullable: false,
    default: false
  })
  public isDeleted!: boolean

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
