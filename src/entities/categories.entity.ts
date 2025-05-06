import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Products } from './products.entity'

@Entity('categories')
export class Categories extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({
    type: 'varchar',
    length: 200,
    unique: true
  })
  public name!: string

  @Column({
    type: 'boolean',
    nullable: false,
    default: false
  })
  public isDeleted!: boolean

  @OneToMany(() => Products, (product) => product.category)
  public products!: Products[]
}
