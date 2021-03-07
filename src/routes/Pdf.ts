import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { PdfsController  } from './../controller/PdfsController';
import { Router } from 'express';
import  uploads from './../middlewares/uploads';




const router = Router();

// Get all books
router.get('/',[checkJwt, checkRole(['admin'])], PdfsController.getAll);

// Get one book
router.get('/:id', [checkJwt, checkRole(['admin'])], PdfsController.getById);

// Create a new book
router.post('/',[checkJwt, checkRole(['admin']),uploads.single('archivo')], PdfsController.new);

// Edit book
router.patch('/:id', [checkJwt, checkRole(['admin']),uploads.single('archivo')], PdfsController.edit);

// Delete book
router.delete('/:id', [checkJwt, checkRole(['admin'])], PdfsController.delete);

export default router;