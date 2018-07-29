
import dotenv from 'dotenv';
import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';

dotenv.config();

export default class cloudinaryConfig {
  cloudinary() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    });
    const storage = cloudinaryStorage({
      cloudinary,
      folder: 'img-upload',
      filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
      }
    });
    return multer({ storage });
  }
}
