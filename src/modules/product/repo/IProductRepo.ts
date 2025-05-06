import { Products } from '../../../entities/products.entity'
import { CreateProductDTO } from '../dto/create.product.dto'
import { UpdateProductDTO } from '../dto/update.product.dto'

export default interface IProductRepo {
  getAllProducts(categoryId: string): Promise<Products[]>
  getAllDeletedTemporaryProducts(categoryId: string): Promise<Products[]>
  getProductById(id: string): Promise<Products>
  createProduct(data: CreateProductDTO): Promise<Products>
  updateProduct(data: UpdateProductDTO): Promise<Products>
  deleteTemporaryProducts(id: number[]): Promise<Products[]>
  restoreTemporaryProduct(id: string): Promise<Products>
  deleteProducts(ids: number[]): Promise<Products[]>
}
