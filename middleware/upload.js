import multer from 'multer';
import path from 'node:path';
import HttpError from 'http-errors';

const destination = path.resolve('temp');

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const prefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    callback(null, `${prefix}_${file.originalname}`);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
  const fileExtension = file.originalname.split('.').pop();
  
  if (fileExtension === 'exe') {
    return callback(HttpError(400, 'File type is not supported'));
  }

  callback(null, true);
}

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
