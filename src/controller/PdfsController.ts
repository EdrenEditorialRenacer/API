import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Pdfs } from '../entity/Pdfs';



export class PdfsController {

    static getAll = async (req: Request, res: Response) => {
        const PdfsRepository = getRepository(Pdfs);
        let Pdfes;

        try {
            Pdfes = await PdfsRepository.find({ select: ['id', 'Archivo', 'idBook'] });
        } catch (e) {
            res.status(404).json({ message: 'Somenthing goes wrong!' });
        }

        if (Pdfs.length > 0) {
            res.send(Pdfes);
        } else {
            res.status(404).json({ message: 'Not result' });
        }
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const PdfsRepository = getRepository(Pdfs);
        try {
            const Pdf = await PdfsRepository.findOneOrFail(id);
            res.send(Pdf);
        } catch (e) {
            res.status(404).json({ message: 'Not result' });
        }
    };

    static new = async (req: Request, res: Response) => {
        const { idBook } = req.body;
        const Pdf = new Pdfs();
        Pdf.Archivo = req.file.path;
        Pdf.idBook = idBook;
        console.log(Pdf);
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(Pdf, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        const PdfsRepository = getRepository(Pdfs);
        try {
            await PdfsRepository.save(Pdf);
        } catch (e) {
            return res.status(409).json({ message: 'Pdf already exist' });
        }
        res.send('Pdf created');
    };

   

    static edit = async (req: Request, res: Response) => {
        let Pdf;
        const { id } = req.params;
        const { idBook } = req.body;


        const PdfsRepository = getRepository(Pdfs);
        // Try get user
        try {
            Pdf = await PdfsRepository.findOneOrFail(id);
            Pdf.Archivo = req.file.path;
            Pdf.idBook = idBook
        } catch (e) {
            return res.status(404).json({ message: 'Pdf not found' });
        }
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(Pdf, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        // Try to save user
        try {
            await PdfsRepository.save(Pdf);
        } catch (e) {
            return res.status(409).json({ message: 'Pdf already in use' });
        }

        res.status(201).json({ message: 'Pdf update' });
    };

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const PdfsRepository = getRepository(Pdfs);
        let pdf: Pdfs;

        try {
            pdf = await PdfsRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(404).json({ message: 'Pdf not found' });
        }

        // Remove user
        PdfsRepository.delete(id);
        res.status(201).json({ message: 'Pdf deleted' });
    };

}