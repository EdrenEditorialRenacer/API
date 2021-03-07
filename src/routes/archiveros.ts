import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import  uploads from './../middlewares/uploads';
import {ArchiverosController} from '../controller/ArchiverosController';




const router = Router();

// Get all libros
router.get('/libros/free',[checkJwt, checkRole(['user_free'])], ArchiverosController.getLibrosFree);

// Get all revistas
router.get('/revistas/free',[checkJwt, checkRole(['user_free'])], ArchiverosController.getRevistasFree);

// Get all comics
router.get('/comics/free',[checkJwt, checkRole(['user_free'])], ArchiverosController.getComicsFree);

// Get all musica
router.get('/musica/free',[checkJwt, checkRole(['user_free'])], ArchiverosController.getMusicaFree);

// Get all peliculas
router.get('/peliculas/free',[checkJwt, checkRole(['user_free'])], ArchiverosController.getPeliculasFree);

// Get all videos
router.get('/videos/free',[checkJwt, checkRole(['user_free'])], ArchiverosController.getVideosFree);

// Get all libros
router.get('/libros/premium',[checkJwt, checkRole(['user_premium'])], ArchiverosController.getLibrosPremium);

// Get all revistas
router.get('/revistas/premium',[checkJwt, checkRole(['user_premium'])], ArchiverosController.getRevistasPremium);

// Get all comics
router.get('/comics/premium',[checkJwt, checkRole(['user_premium'])], ArchiverosController.getComicsPremium);

// Get all musica
router.get('/musica/premium',[checkJwt, checkRole(['user_premium'])], ArchiverosController.getMusicaPremium);

// Get all peliculas
router.get('/peliculas/premium',[checkJwt, checkRole(['user_premium'])], ArchiverosController.getPeliculasPremium);

// Get all videos
router.get('/videos/premium',[checkJwt, checkRole(['user_premium'])], ArchiverosController.getVideosPremium);


// Get one book
router.get('/:id', [checkJwt, checkRole(['admin'])], ArchiverosController.getById);

// Create a new book
router.post('/',[checkJwt, checkRole(['admin'])], ArchiverosController.new);

// Edit book
router.patch('/:id', [checkJwt, checkRole(['admin'])], ArchiverosController.edit);

// Delete book
router.delete('/:id', [checkJwt, checkRole(['admin'])], ArchiverosController.delete);

export default router;