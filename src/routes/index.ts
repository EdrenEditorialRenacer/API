import { Router } from 'express';
import auth from './auth';
import user from './user';


import autores from './autores'
import images from './images'
import Pdf from './Pdf';
import archiveros from './archiveros'
const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/autores',autores);
routes.use('/images',images);
routes.use('/pdf',Pdf);
routes.use('/archiveros',archiveros);
export default routes;
