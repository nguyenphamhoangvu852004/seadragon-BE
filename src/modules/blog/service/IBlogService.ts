import { CreateBlogInputDTO } from '../dto/create.blog.dto'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBlogService {
  getAllBlog(): Promise<any>
  getAllDeletedTemporaryBlogs(): Promise<any>
  getBlogById(id: string): Promise<any>
  createBlog(data: CreateBlogInputDTO): Promise<any>
  updateBlog(data: any): Promise<any>
  deleteTemporaryBlogs(ids: number[]): Promise<any>
  restoreTemporaryBlog(id: string): Promise<any>
  deleteBlogs(ids: number[]): Promise<any>
}
