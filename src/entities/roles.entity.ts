import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Accounts } from './accounts.entity'
import { BaseEntity } from '../shared/baseEntity'

@Entity('roles')
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({
    type: 'varchar'
  })
  public name!: string

  @Column({ nullable: true, type: 'varchar' })
  public description!: string

  @ManyToMany(() => Accounts, (account) => account.roles)
  public accounts!: Accounts[]
}
