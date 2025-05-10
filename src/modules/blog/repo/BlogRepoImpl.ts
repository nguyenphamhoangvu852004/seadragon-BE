import { Repository } from 'typeorm'
import IBlogRepo from './IBlogRepo'
import { Blogs } from '../../../entities/blog.entity'
import { AppDataSource } from '../../../config/data-source'
import { log } from 'console'
import { Accounts } from '../../../entities/accounts.entity'
import { CreateBlogInputDTO } from '../dto/create.blog.dto'
import { NotFoundException } from '../../../shared/NotFound.exeception'
import { UpdateBlogInputDto } from '../dto/update.blog.dto'
import path from 'path'
import fs from 'fs'
import { BadRequestException } from '../../../shared/BadRequest.exeception'

export default class BlogRepoImpl implements IBlogRepo {
  blogRepository: Repository<Blogs>
  accountRepository: Repository<Accounts>
  constructor() {
    this.blogRepository = AppDataSource.getRepository(Blogs)
    this.accountRepository = AppDataSource.getRepository(Accounts)
  }

  async createBlog(data: CreateBlogInputDTO): Promise<Blogs> {
    try {
      // truy vấn thông tin account
      const account: Accounts | null = await this.accountRepository.findOne({
        where: {
          id: Number(data.userId)
        }
      })
      if (!account) {
        throw new Error('Account not found')
      }
      // tạo mới entity
      const newBlog = new Blogs()
      newBlog.account = account
      newBlog.title = data.title
      newBlog.body = data.body
      newBlog.image = data.image
      newBlog.createdAt = new Date()
      newBlog.setDefaultLikeAmount()
      newBlog.setDefaultViewAmount()
      const createdBlog = this.blogRepository.create(newBlog)
      await this.blogRepository.save(createdBlog)
      return createdBlog
    } catch (error) {
      log(error)
      throw new Error('Error creating blog')
    }
  }

  async getAllBlog(): Promise<Blogs[]> {
    const list = await this.blogRepository.find({
      where: {
        isDeleted: false
      },
      withDeleted: false,
      relations: {
        account: true
      }
    })
    return list
  }

  async getBlogById(data: string): Promise<Blogs> {
    const blog: Blogs | null = await this.blogRepository.findOne({
      where: {
        id: Number(data)
      },
      relations: {
        account: true
      },
      withDeleted: true
    })
    if (!blog) {
      throw new NotFoundException('Blog not found')
    }
    return blog
  }

  async deleteBlogs(ids: number[]): Promise<Blogs[]> {
    const list: Blogs[] = []
    for (const i of ids) {
      const blog = await this.blogRepository.findOne({
        where: {
          id: Number(i)
        },
        withDeleted: true
      })
      if (blog) {
        const fileName = path.basename(blog.image as string) // 'image-1745912805477-460172612.jpg'
        const fullImagePath = path.join(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          'uploads',
          'blogs',
          fileName
        )
        console.log('Full image path:', fullImagePath)
        fs.unlink(fullImagePath, (err) => {
          if (err) {
            throw new BadRequestException(err.message)
          } else {
            console.log('File deleted successfully')
          }
        })
        list.push(blog)
      }
    }

    // xoa tat ca cac hinh anh trong mang products
    await this.blogRepository.remove(list)
    return list
  }

  async deleteTemporaryBlogs(ids: number[]): Promise<Blogs[]> {
    log('ids', ids)
    const listBlogs: Blogs[] = []
    for (const i of ids) {
      const blog = await this.blogRepository.findOneBy({ id: Number(i) })
      if (!blog) {
        throw new Error('Product not found')
      }
      blog.isDeleted = true
      blog.deletedAt = new Date()
      listBlogs.push(blog)
    }
    await this.blogRepository.save(listBlogs)
    log(listBlogs)
    return listBlogs
  }

  async restoreBlogs(ids: number[]): Promise<Blogs[]> {
    const listBlogs: Blogs[] = []
    for (const id of ids) {
      log(id)
      const blog: Blogs | null = await this.blogRepository.findOne({
        where: {
          id: Number(id),
          isDeleted: true
        },
        withDeleted: true
      })
      if (blog) {
        blog.deletedAt = null
        blog.isDeleted = false
        listBlogs.push(blog)
      }
    }
    await this.blogRepository.save(listBlogs)
    return listBlogs
  }

  async getAllTemporaryBlogs(): Promise<Blogs[]> {
    const list: Blogs[] = await this.blogRepository.find({
      where: {
        isDeleted: true
      },
      withDeleted: true,
      relations: {
        account: true
      }
    })
    return list
  }

  async updateBlog(data: UpdateBlogInputDto): Promise<Blogs> {
    const { id, title, body, image } = data
    const blog: Blogs | null = await this.blogRepository.findOne({
      where: {
        id: Number(id)
      }
    })
    if (!blog) {
      throw new NotFoundException('Blog not found')
    }

    // xoá trong folder ảnh
    const fileName = path.basename(blog.image as string) // 'image-1745912805477-460172612.jpg'
    const fullImagePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'uploads',
      'blogs',
      fileName
    )
    console.log('Full image path:', fullImagePath)
    fs.unlink(fullImagePath, (err) => {
      if (err) {
        throw new BadRequestException(err.message)
      } else {
        console.log('File deleted successfully')
      }
    })
    blog.title = title
    blog.body = body
    blog.image = image
    blog.updatedAt = new Date()

    await this.blogRepository.save(blog)
    return blog
  }
}
