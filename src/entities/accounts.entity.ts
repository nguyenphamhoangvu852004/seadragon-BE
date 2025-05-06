import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany
} from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Roles } from './roles.entity'
import { Blogs } from './blog.entity'
export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}
@Entity('accounts')
export class Accounts extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id'
  })
  id!: number

  @Column({ type: 'varchar', nullable: false })
  email!: string

  @Column({ type: 'varchar', nullable: false })
  password!: string

  @Column({ type: 'varchar', nullable: false })
  username!: string

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.ACTIVE
  })
  status!: string

  @ManyToMany(() => Roles, (role) => role.accounts)
  @JoinTable({
    name: 'account_role', // tên bảng join
    joinColumn: {
      name: 'account_id', // field trong account_role map tới Account
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'role_id', // field trong account_role map tới Role
      referencedColumnName: 'id'
    }
  })
  roles!: Roles[]

  @OneToMany(() => Blogs, (blog) => blog.account)
  blogs!: Blogs[]
}
