import { Repository } from 'typeorm'
import IBlogRepo from './IBlogRepo'
import { Blogs } from '../../../entities/blog.entity'
import { AppDataSource } from '../../../config/data-source'
import { log } from 'console'
import { Accounts } from '../../../entities/accounts.entity'
import { CreateBlogInputDTO } from '../dto/create.blog.dto'
import { NotFoundException } from '../../../shared/NotFound.exeception'

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
        list.push(blog)
      }
    }

    await this.blogRepository.remove(list)
    return list
  }
}
