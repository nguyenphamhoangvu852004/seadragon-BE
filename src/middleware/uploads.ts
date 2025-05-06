import multer from 'multer'
import path from 'path'

const storageProducts = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

const storageBlogs = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/blogs')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})
// Khởi tạo multer
export const uploadProducts = multer({
  storage: storageProducts
})

export const uploadBlogs = multer({
  storage: storageBlogs
})
