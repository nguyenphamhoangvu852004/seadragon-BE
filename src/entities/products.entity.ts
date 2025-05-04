import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Categories } from './categories.entity'

@Entity('products')
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({
    type: 'varchar',
    nullable: false
  })
  public title!: string

  @Column({
    type: 'longtext',
    nullable: false
  })
  public description!: string

  @Column({
    type: 'decimal',
    nullable: false,
    precision: 10,
    scale: 2
  })
  public price!: number

  @Column({
    type: 'boolean',
    nullable: false,
    default: false
  })
  public isDeleted!: boolean

  @ManyToOne(() => Categories, (category) => category.products, {
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'categoryId' })
  public category!: Categories

  @Column({
    type: 'varchar',
    nullable: false
  })
  public image!: string
}
