import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { BaseEntity } from '../shared/baseEntity'
import { Products } from './products.entity'
import { Customers } from './customers.entity'

export enum OrderStatus {
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED',
  CANCEL = 'CANCEL'
}

@Entity('orders')
export class Orders extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @JoinColumn({ name: 'product_id' })
  @ManyToOne(() => Products)
  public product!: Products

  @JoinColumn({ name: 'customer_id' })
  @ManyToOne(() => Customers)
  public customer!: Customers

  @Column({
    type: 'varchar',
    nullable: true
  })
  public note!: string

  @Column({
    type: 'enum',
    enum: OrderStatus,
    nullable: false,
    default: OrderStatus.PROCESSING
  })
  public status!: string

  @Column({
    type: 'boolean',
    nullable: false,
    default: false
  })
  public isDeleted!: boolean
  constructor(data?: Partial<Orders>) {
    super()
    Object.assign(this, data)
  }
}
