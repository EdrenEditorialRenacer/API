import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { ImagesController } from './../controller/ImagesController';
import { Router } from 'express';
import  uploads from './../middlewares/uploads';




const router = Router();

// Get all books
router.get('/',[checkJwt, checkRole(['admin'])], ImagesController.getAll);

// Get one book
router.get('/:id', [checkJwt, checkRole(['admin'])], ImagesController.getById);

// Create a new book
router.post('/',[checkJwt, checkRole(['admin']),uploads.single('portada')], ImagesController.new);

// Edit book
router.patch('/:id', [checkJwt, checkRole(['admin']),uploads.single('portada')], ImagesController.edit);

// Delete book
router.delete('/:id', [checkJwt, checkRole(['admin'])], ImagesController.delete);

export default router;