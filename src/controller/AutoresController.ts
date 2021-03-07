import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Autores } from '../entity/Autores';





export class AutoresController {



  static getAll = async (req: Request, res: Response) => {
    const autoresRepository = getRepository(Autores);
    let autores;

    try {
      autores = await autoresRepository.find({ select: ['id', 'Autor', 'Face', 'Whatt', 'Email'] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (autores.length > 0) {
      res.send(autores);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const autoresRepository = getRepository(Autores);
    try {
      const autor = await autoresRepository.findOneOrFail(id);
      res.send(autor);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const {  autor, face, whatt, email } = req.body;
    const Autor = new Autores();
   
    Autor.Autor = autor;
Autor.Face = face;
      Autor.Whatt = whatt;
      Autor.Email = email;
    
    // // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(Autor, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    const autoresRepository = getRepository(Autores);
    try {
      await autoresRepository.save(Autor);
    } catch (e) {
      return res.status(409).json({ message: 'Autor already exist' });
    }
    res.send('Autor created');
  };



  static edit = async (req: Request, res: Response) => {
    let Autor;
    const { id } = req.params;
    const {  autor, face, whatt, email } = req.body;


    const autoresRepository = getRepository(Autores);
    // Try get user
    try {
      Autor = await autoresRepository.findOneOrFail(id);
      Autor.Autor = autor;
      Autor.Face = face;
            Autor.Whatt = whatt;
            Autor.Email = email;
  
    } catch (e) {
      return res.status(404).json({ message: 'Autor not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(Autor, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await autoresRepository.save(Autor);
    } catch (e) {
      return res.status(409).json({ message: 'Autor already in use' });
    }

    res.status(201).json({ message: 'Autor update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const autoresRepository = getRepository(Autores);
    let autor: Autores;

    try {
      autor = await autoresRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Autor not found' });
    }

    // Remove user
    autoresRepository.delete(id);
    res.status(201).json({ message: 'Autor deleted' });
  };
}