export class CreateProductDTO {
  name!: string
  description!: string
  price!: number
  isDeleted!: boolean
  categoryId!: number
  setIsDeleted() {
    this.isDeleted = false
  }
}
