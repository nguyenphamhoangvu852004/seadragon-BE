import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Accounts } from './accounts.entity'

@Entity('roles')
export class Roles {
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
