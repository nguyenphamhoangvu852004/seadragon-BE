import { log } from 'console'
import { Blogs } from '../../../entities/blog.entity'
import {
  CreateBlogInputDTO,
  CreateBlogOutputDTO,
  UserDTO
} from '../dto/create.blog.dto'
import { AccountDTO, GetBlogOutputDTO } from '../dto/get.blog.dto'
import IBlogRepo from '../repo/IBlogRepo'
import { IBlogService } from './IBlogService'
import { NotFoundException } from '../../../shared/NotFound.exeception'
import { GetBlogTemporaryOutputDTO } from '../dto/get.blog.temporary.dto'
import { UpdateBlogInputDto } from '../dto/update.blog.dto'

export default class BlogServiceImpl implements IBlogService {
  blogRepository: IBlogRepo
  constructor(blogRepository: IBlogRepo) {
    this.blogRepository = blogRepository
  }

  async createBlog(data: CreateBlogInputDTO): Promise<CreateBlogOutputDTO> {
    const res: Blogs = await this.blogRepository.createBlog(data)
    const outDTO = new CreateBlogOutputDTO()
    outDTO.id = res.id
    outDTO.body = res.body
    outDTO.title = res.title
    outDTO.image = res.image
    outDTO.createdAt = res.createdAt
    outDTO.likeAmount = res.likeAmount
    outDTO.viewAmount = res.viewAmount
    const userDTO = new UserDTO()
    userDTO.id = String(res.account.id)
    userDTO.username = res.account.username
    userDTO.email = res.account.email
    outDTO.user = userDTO
    return outDTO
  }

  async getAllBlog(): Promise<GetBlogOutputDTO[]> {
    const list: Blogs[] = await this.blogRepository.getAllBlog()
    const listOutDTO: GetBlogOutputDTO[] = []
    list.forEach((item) => {
      const outDTO = new GetBlogOutputDTO()
      outDTO.id = Number(item.id)
      outDTO.title = item.title
      outDTO.body = item.body
      outDTO.isDeteled = item.isDeleted
      outDTO.image = item.image
      outDTO.createdAt = item.createdAt
      outDTO.viewAmount = item.viewAmount
      outDTO.likeAmount = item.likeAmount
      const accoutDto = new AccountDTO()
      accoutDto.id = String(item.account.id)
      accoutDto.username = item.account.username
      accoutDto.email = item.account.email
      outDTO.account = accoutDto
      listOutDTO.push(outDTO)
    })
    return listOutDTO
  }
  async getAllDeletedTemporaryBlogs(): Promise<GetBlogOutputDTO[]> {
    try {
      const list: Blogs[] = await this.blogRepository.getAllTemporaryBlogs()
      const listDto: GetBlogOutputDTO[] = []
      list.forEach((item) => {
        const outDTO: GetBlogTemporaryOutputDTO =
          new GetBlogTemporaryOutputDTO()
        outDTO.id = Number(item.id)
        outDTO.title = item.title
        outDTO.body = item.title
        outDTO.likeAmount = item.likeAmount
        outDTO.viewAmount = item.viewAmount
        outDTO.image = item.image
        outDTO.isDeteled = item.isDeleted
        outDTO.createdAt = item.createdAt
        outDTO.deletedAt = item.deletedAt!
        const accountDto = new AccountDTO()
        accountDto.id = String(item.account.id)
        accountDto.username = item.account.username
        accountDto.email = item.account.email
        outDTO.account = accountDto
        listDto.push(outDTO)
      })
      return listDto
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('An unknown error occurred')
    }
  }
  async getBlogById(id: string): Promise<GetBlogOutputDTO> {
    try {
      const res: Blogs = await this.blogRepository.getBlogById(id)
      const outDto = new GetBlogOutputDTO()
      outDto.id = Number(res.id)
      outDto.title = res.title
      outDto.body = res.body
      outDto.image = res.image
      outDto.createdAt = res.createdAt
      outDto.isDeteled = Boolean(res.isDeleted)
      outDto.viewAmount = res.viewAmount
      outDto.likeAmount = res.likeAmount
      const accountDto = new AccountDTO()
      accountDto.id = String(res.account.id)
      accountDto.username = res.account.username
      accountDto.email = res.account.email
      outDto.account = accountDto
      log('outDto', outDto)
      return outDto
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Blog not found')
      }
      throw new Error('An unknown error occurred')
    }
  }

  async updateBlog(data: UpdateBlogInputDto): Promise<Blogs> {
    try {
      const res: Blogs = await this.blogRepository.updateBlog(data)
      return res
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error while update")
      }
      throw new Error('An unknown error occurred')
    }
  }

  async deleteTemporaryBlogs(ids: number[]): Promise<Blogs[]> {
    try {
      const response: Blogs[] =
        await this.blogRepository.deleteTemporaryBlogs(ids)
      return response
    } catch (error) {
      log(error)
      throw new Error('Bad Request')
    }
  }

  async restoreTemporaryBlogs(ids: number[]): Promise<Blogs[]> {
    try {
      const list = await this.blogRepository.restoreBlogs(ids)
      return list
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Something went wrong')
    }
  }

  async deleteBlogs(ids: number[]): Promise<Blogs[]> {
    try {
      const res: Blogs[] = await this.blogRepository.deleteBlogs(ids)
      return res
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('An unknown error occurred')
    }
  }
}
