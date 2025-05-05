import { CreateBlogInputDTO } from '../dto/create.blog.dto'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IBlogRepo {
  getAllBlog(): Promise<any>
  createBlog(data: CreateBlogInputDTO): Promise<any>
  getBlogById(data: any): Promise<any>
  deleteBlogs(ids: number[]): Promise<any>
  deleteTemporaryBlogs(ids: number[]): Promise<any>
  restoreBlogs(ids: number[]): Promise<any>
  getAllTemporaryBlogs(): Promise<any>
  updateBlog(data: any): Promise<any>
}
