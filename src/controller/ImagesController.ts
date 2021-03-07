import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import { validate } from 'class-validator';

import { Images } from '../entity/Images';



export class ImagesController {

    static getAll = async (req: Request, res: Response) => {
        const ImagesRepository = getRepository(Images);
        let images;

        try {
            images = await ImagesRepository.find({ select: ['id', 'Portada', 'idBook'] });
        } catch (e) {
            res.status(404).json({ message: 'Somenthing goes wrong!' });
        }

        if (images.length > 0) {
            res.send(images);
        } else {
            res.status(404).json({ message: 'Not result' });
        }
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const ImagesRepository = getRepository(Images);
        try {
            const image = await ImagesRepository.findOneOrFail(id);
            res.send(image);
        } catch (e) {
            res.status(404).json({ message: 'Not result' });
        }
    };

    static new = async (req: Request, res: Response) => {
        const { idBook } = req.body;
        const image = new Images();
        image.Portada = req.file.path;
        image.idBook = idBook;
        console.log(image);
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(image, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        const ImagesRepository = getRepository(Images);
        try {
            await ImagesRepository.save(image);
        } catch (e) {
            return res.status(409).json({ message: 'Image already exist' });
        }
        res.send('Image created');
    };

   

    static edit = async (req: Request, res: Response) => {
        let image;
        const { id } = req.params;
        const { idBook } = req.body;


        const ImagesRepository = getRepository(Images);
        // Try get user
        try {
            image = await ImagesRepository.findOneOrFail(id);
            image.Portada = req.file.path;
            image.idBook = idBook
        } catch (e) {
            return res.status(404).json({ message: 'Image not found' });
        }
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(image, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        // Try to save user
        try {
            await ImagesRepository.save(image);
        } catch (e) {
            return res.status(409).json({ message: 'Book already in use' });
        }

        res.status(201).json({ message: 'Potada update' });
    };

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const ImagesRepository = getRepository(Images);
        let Image: Images;

        try {
            Image = await ImagesRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(404).json({ message: 'Portada not found' });
        }

        // Remove user
        ImagesRepository.delete(id);
        res.status(201).json({ message: 'Portada deleted' });
    };

}