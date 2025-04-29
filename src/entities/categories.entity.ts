import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Products } from './products.entity'

@Entity('categories')
export class Categories extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  public id!: number

  @Column({
    type: 'varchar',
    length: 200,
    unique: true
  })
  public name!: string

  @OneToMany(() => Products, (product) => product.category)
  public products!: Products[]
}
