import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'

@Entity('customers')
export class Customers extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({
    type: 'varchar',
    nullable: false
  })
  public fullname!: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  public email!: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  public address!: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  public phoneNumber!: string

  @Column({
    type: 'boolean',
    nullable: false,
    default: false
  })
  public isDeleted!: boolean
}
