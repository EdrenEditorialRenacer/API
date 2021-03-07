import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import { validate } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
export class UserController {
  static getAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(Users);
    let users;

    try {
      users = await userRepository.find({ select: ['id', 'Usuario', 'Role','Pais','Idioma','Email'] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(Users);
    try {
      const user = await userRepository.findOneOrFail(id);
      res.send(user);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { usuario, password, role, pais, idioma, email } = req.body;
    const user = new Users();
    user.Usuario = usuario;
    user.Password = password;
    user.Role = role;
    user.Pais = pais;
    user.Idioma = idioma;
    user.Email = email;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }


    // All ok
    const token = jwt.sign({ userId: user.id, email: user.Email }, config.jwtSecret, { expiresIn: '1h' });
    user.resetToken = token;
    // TODO: HASH PASSWORD

    const userRepository = getRepository(Users);
    try {
      user.hashPassword();
      await userRepository.save(user);
    } catch (e) {
      return res.status(409).json({ message: 'Username already exist' });
    }
    res.json({ message: 'OK', token, userId: user.id, role: user.Role });
    res.send('User created');
  };

  static edit = async (req: Request, res: Response) => {
    let user;
    const { id } = req.params;
    const { usuario, role, pais, idioma, email } = req.body;


    const userRepository = getRepository(Users);
    // Try get user
    try {
      user = await userRepository.findOneOrFail(id);
      user.Usuario = usuario;
      user.Role = role;
      user.Pais = pais;
      user.Idioma=idioma;
      user.Email=email;
    } catch (e) {
      return res.status(404).json({ message: 'User not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await userRepository.save(user);
    } catch (e) {
      return res.status(409).json({ message: 'Username already in use' });
    }

    res.status(201).json({ message: 'User update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove user
    userRepository.delete(id);
    res.status(201).json({ message: ' User deleted' });
  };
}

export default UserController;
