import * as  multer from 'multer';
const storage = multer.memoryStorage()
export const uploadMulter = multer({storage: storage}).single('image')
