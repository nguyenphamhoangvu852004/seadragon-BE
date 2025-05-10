import { Repository } from 'typeorm'
import { Customers } from '../../../entities/customers.entity'
import ICustomerRepo from './ICustomerRepo'
import { AppDataSource } from '../../../config/data-source'
import CreateCustomerDto from '../dto/create.customer.dto'
import { log } from 'console'
import { NotFoundException } from '../../../shared/NotFound.exeception'
import { UpdateCustomerDto } from '../dto/update.customer.dto'

export default class CustomerRepoImpl implements ICustomerRepo {
  customerRepository: Repository<Customers>
  constructor() {
    this.customerRepository = AppDataSource.getRepository(Customers)
  }
  async getAllCustomer(): Promise<Customers[]> {
    const list = this.customerRepository.find({
      where: {
        isDeleted: false
      },
      withDeleted: false
    })
    return list
  }

  async create(data: CreateCustomerDto): Promise<Customers> {
    const en = this.customerRepository.create({
      ...data,
      createdAt: new Date()
    })
    if (!en) {
      throw new Error('Error creating customer')
    }
    await this.customerRepository.save(en)
    return en
  }
  async isExistEmail(email: string): Promise<boolean> {
    log('chekcing email', email)
    const customer = await this.customerRepository.findOne({
      where: {
        email: email
      }
    })
    if (customer) {
      return true
    }
    return false
  }

  async getListDeleteTeporaryCustomers(): Promise<Customers[]> {
    const list = await this.customerRepository.find({
      where: {
        isDeleted: true
      },
      withDeleted: true
    })
    return list
  }

  async deleteTemporaryCustomers(ids: number[]): Promise<Customers[]> {
    const listCustomer: Customers[] = []

    for (const i of ids) {
      const customer = await this.customerRepository.findOneBy({
        id: Number(i)
      })
      if (!customer) {
        throw new Error('Product not found')
      }
      customer.isDeleted = true
      customer.deletedAt = new Date()
      listCustomer.push(customer)
    }
    await this.customerRepository.save(listCustomer)
    return listCustomer
  }

  async restoreTemporaryCustomers(id: number): Promise<Customers> {
    const customer = await this.customerRepository.findOne({
      where: {
        id: Number(id),
        isDeleted: true
      },
      withDeleted: true
    })

    if (!customer) {
      throw new Error('Customer not found')
    }
    customer.isDeleted = false
    customer.deletedAt = null
    await this.customerRepository.save(customer)
    return customer
  }

  async getDetailCustomer(id: number): Promise<Customers> {
    const res = await this.customerRepository.findOne({
      where: {
        id: Number(id)
      },
      withDeleted: true
    })
    if (!res) {
      throw new NotFoundException('Customer not found')
    }
    return res
  }

  async deleteCustomers(ids: number[]): Promise<Customers[]> {
    const list: Customers[] = []
    for (const i of ids) {
      const cus = await this.customerRepository.findOne({
        where: {
          id: Number(i)
        },
        withDeleted: true
      })
      if (cus) {
        list.push(cus)
      }
    }
    await this.customerRepository.remove(list)
    return list
  }

  async updateCustomer(
    id: number,
    data: UpdateCustomerDto
  ): Promise<Customers> {
    const customer = await this.customerRepository.findOneBy({
      id: Number(id)
    })
    if (!customer) {
      throw new Error('Customer not found')
    }
    customer.fullname = data.fullname
    customer.email = data.email
    customer.phoneNumber = data.phoneNumber
    customer.address = data.address
    customer.updatedAt = new Date()
    await this.customerRepository.save(customer)
    return customer
  }
}
