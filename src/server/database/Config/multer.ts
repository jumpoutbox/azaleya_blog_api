import multer, { Options } from "multer";
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", '..', '..', '..', 'uploads'),
    filename(req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  limites: {
    fileSize: process.env.FILE_SIZE || (1024 * 5), // 5mb
  },
  fileFilter: (req, file, cb) => {
    const mimetype = ['image/jpg', 'image/png', 'image/jpeg']; 
    if (!mimetype.includes(file.mimetype)) return cb(null, false);
    else{ cb(null, true) }
  }
} as Options;