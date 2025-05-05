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
  getAllDeletedTemporaryBlogs(): Promise<any> {
    throw new Error('Method not implemented.')
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
  updateBlog(data: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
  deleteTemporaryBlogs(ids: number[]): Promise<any> {
    throw new Error('Method not implemented.')
  }
  restoreTemporaryBlog(id: string): Promise<any> {
    throw new Error('Method not implemented.')
  }
  async deleteBlogs(ids: number[]): Promise<Blogs[]> {
    try {
      const res = await this.blogRepository.deleteBlogs(ids)
      return res
    } catch (error) {
      throw new Error('An unknown error occurred')
    }
  }
}
