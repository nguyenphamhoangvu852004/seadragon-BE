import multer from 'multer'
import path from 'path'

// Cấu hình lưu file
const storageProducts = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products') // thư mục lưu
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname) // lấy đuôi file .jpg/.png
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

// Khởi tạo multer
export const uploadProducts = multer({ storage: storageProducts })
