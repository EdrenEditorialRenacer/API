import * as multer from 'multer';
import * as path from 'path';

const storage = multer.diskStorage({
    destination:path.join(__dirname,'public/uploads/books'),
    filename: (req,file,cb) =>{
      cb(null,file.originalname);
    }
  })


export default multer({storage});