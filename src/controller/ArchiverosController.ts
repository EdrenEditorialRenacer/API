import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import { validate } from 'class-validator';
import { Archiveros } from '../entity/Archiveros';





export class ArchiverosController {


    static getLibrosFree = async (req: Request, res: Response) => {
        const archiverosRepository = getRepository(Archiveros);
        let archiveros;
    
        try {
          archiveros = await archiverosRepository.find({ where: { Modulos: 'libros',Roles:"free" } });
        } catch (e) {
          res.status(404).json({ message: 'Somenthing goes wrong!' });
        }
    
        if (archiveros.length > 0) {
          res.send(archiveros);
        } else {
          res.status(404).json({ message: 'Not result' });
        }
      };
    
      static getRevistasFree = async (req: Request, res: Response) => {
        const archiverosRepository = getRepository(Archiveros);
        let archiveros;
    
        try {
          archiveros = await archiverosRepository.find({ where: { Modulos: 'revistas',Roles:'free' } });
        } catch (e) {
          res.status(404).json({ message: 'Somenthing goes wrong!' });
        }
    
        if (archiveros.length > 0) {
          res.send(archiveros);
        } else {
          res.status(404).json({ message: 'Not result' });
        }
      };
    
      static getComicsFree = async (req: Request, res: Response) => {
        const archiverosRepository = getRepository(Archiveros);
        let archiveros;
    
        try {
          archiveros = await archiverosRepository.find({ where: { Modulos: 'comics',Roles:'free' } });
        } catch (e) {
          res.status(404).json({ message: 'Somenthing goes wrong!' });
        }
    
        if (archiveros.length > 0) {
          res.send(archiveros);
        } else {
          res.status(404).json({ message: 'Not result' });
        }
      };
    
      static getMusicaFree = async (req: Request, res: Response) => {
        const archiverosRepository = getRepository(Archiveros);
        let archiveros;
    
        try {
          archiveros = await archiverosRepository.find({ where: { Modulos: 'musica',Roles:'free' } });
        } catch (e) {
          res.status(404).json({ message: 'Somenthing goes wrong!' });
        }
    
        if (archiveros.length > 0) {
          res.send(archiveros);
        } else {
          res.status(404).json({ message: 'Not result' });
        }
      };
    
      static getPeliculasFree = async (req: Request, res: Response) => {
        const archiverosRepository = getRepository(Archiveros);
        let archiveros;
    
        try {
          archiveros = await archiverosRepository.find({ where: { Modulos: 'peliculas',Roles: 'free' } });
        } catch (e) {
          res.status(404).json({ message: 'Somenthing goes wrong!' });
        }
    
        if (archiveros.length > 0) {
          res.send(archiveros);
        } else {
          res.status(404).json({ message: 'Not result' });
        }
      };
    
      static getVideosFree = async (req: Request, res: Response) => {
        const archiverosRepository = getRepository(Archiveros);
        let archiveros;
    
        try {
          archiveros = await archiverosRepository.find({ where: { Modulos: 'videos',Roles:'free' } });
        } catch (e) {
          res.status(404).json({ message: 'Somenthing goes wrong!' });
        }
    
        if (archiveros.length > 0) {
          res.send(archiveros);
        } else {
          res.status(404).json({ message: 'Not result' });
        }
      };



  static getLibrosPremium = async (req: Request, res: Response) => {
    const archiverosRepository = getRepository(Archiveros);
    let archiveros;

    try {
      archiveros = await archiverosRepository.find({ where: { Modulos: 'libros',Roles:'premium' } });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (archiveros.length > 0) {
      res.send(archiveros);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getRevistasPremium = async (req: Request, res: Response) => {
    const archiverosRepository = getRepository(Archiveros);
    let archiveros;

    try {
      archiveros = await archiverosRepository.find({ where: { Modulos: 'revistas',Roles:'premium' } });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (archiveros.length > 0) {
      res.send(archiveros);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getComicsPremium = async (req: Request, res: Response) => {
    const archiverosRepository = getRepository(Archiveros);
    let archiveros;

    try {
      archiveros = await archiverosRepository.find({ where: { Modulos: 'comics',Roles:'premium' } });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (archiveros.length > 0) {
      res.send(archiveros);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getMusicaPremium = async (req: Request, res: Response) => {
    const archiverosRepository = getRepository(Archiveros);
    let archiveros;

    try {
      archiveros = await archiverosRepository.find({ where: { Modulos: 'musica',Roles:'premium' } });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (archiveros.length > 0) {
      res.send(archiveros);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getPeliculasPremium = async (req: Request, res: Response) => {
    const archiverosRepository = getRepository(Archiveros);
    let archiveros;

    try {
      archiveros = await archiverosRepository.find({ where: { Modulos: 'peliculas',Roles:'premium' } });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (archiveros.length > 0) {
      res.send(archiveros);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getVideosPremium = async (req: Request, res: Response) => {
    const archiverosRepository = getRepository(Archiveros);
    let archiveros;

    try {
      archiveros = await archiverosRepository.find({ where: { Modulos: 'videos', Roles:'premium'} });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (archiveros.length > 0) {
      res.send(archiveros);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const archiverosRepository = getRepository(Archiveros);
    try {
      const archivero = await archiverosRepository.findOneOrFail(id);
      res.send(archivero);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { titulo, idAutor, genero, precio,modulos,roles } = req.body;



    const archivero = new Archiveros();
    archivero.Titulo = titulo;
    archivero.idAutor = idAutor;
    archivero.Genero = genero;
    archivero.Precio = precio;
    archivero.Modulos = modulos;
    archivero.Roles = roles; 
    console.log(archivero);
    // // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(archivero, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }



    const archiverosRepository = getRepository(Archiveros);
    try {
      await archiverosRepository.save(archivero);
    } catch (e) {
      return res.status(409).json({ message: 'Archivero already exist' });
    }
    res.send('Archivero created');
  };



  static edit = async (req: Request, res: Response) => {
    let archivero;
    const { id } = req.params;
    const { titulo, idAutor, genero, precio,modulos,roles } = req.body;


    const archiverosRepository = getRepository(Archiveros);
    // Try get user
    try {
      archivero = await archiverosRepository.findOneOrFail(id);
      archivero.Titulo = titulo;
      archivero.idAutor = idAutor;
      archivero.Genero = genero;
      archivero.Precio = precio;
      archivero.Modulos = modulos;
      archivero.Roles = roles; 
    } catch (e) {
      return res.status(404).json({ message: 'Archivero not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(archivero, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await archiverosRepository.save(archivero);
    } catch (e) {
      return res.status(409).json({ message: 'Archivero already in use' });
    }

    res.status(201).json({ message: 'Archivero update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const archiverosRepository = getRepository(Archiveros);
    let archivero: Archiveros;

    try {
      archivero = await archiverosRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Remove user
    archiverosRepository.delete(id);
    res.status(201).json({ message: 'Archivero deleted' });
  };
}