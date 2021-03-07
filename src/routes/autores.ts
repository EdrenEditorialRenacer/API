import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import  uploads from './../middlewares/uploads';
import {AutoresController} from '../controller/AutoresController';




const router = Router();

// Get all books
router.get('/',[checkJwt, checkRole(['admin'])], AutoresController.getAll);

// Get one book
router.get('/:id', [checkJwt, checkRole(['admin'])], AutoresController.getById);

// Create a new book
router.post('/',[checkJwt, checkRole(['admin'])], AutoresController.new);

// Edit book
router.patch('/:id', [checkJwt, checkRole(['admin'])], AutoresController.edit);

// Delete book
router.delete('/:id', [checkJwt, checkRole(['admin'])], AutoresController.delete);

export default router;