import { CreateBlogInputDTO } from '../dto/create.blog.dto'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IBlogRepo {
  getAllBlog(): Promise<any>
  createBlog(data: CreateBlogInputDTO): Promise<any>
  getBlogById(data: any): Promise<any>
  deleteBlogs(ids: number[]): Promise<any>
}
