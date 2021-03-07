import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from 'class-validator';
import { transporter } from './../config/mailer';
class AuthController {





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
    res.json({ message: 'OK', token, userId: user.id, role: user.Role, usuario: user.Usuario });
    res.send('User created');
  };


  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ message: ' Username & Password are required!' });
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail({ where: { Email: email } });
    } catch (e) {
      return res.status(400).json({ message: ' Username or password incorecct!' });
    }

    // Check password
    if (!user.checkPassword(password)) {
      return res.status(400).json({ message: 'Username or Password are incorrect!' });
    }

    const token = jwt.sign({ userId: user.id, email: user.Email }, config.jwtSecret, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user.id, email: user.Email }, config.jwtSecretRefresh, { expiresIn: '1h' });

    user.resetToken = refreshToken;
    try {
      await userRepository.save(user);
    } catch (error) {
      return res.status(400).json({ message: 'Something goes wrong!' });
    }


    res.json({ message: 'OK', token, refreshToken, role: user.Role, usuario: user.Usuario });
  };

  static changePassword = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      res.status(400).json({ message: 'Old password & new password are required' });
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail(userId);
    } catch (e) {
      res.status(400).json({ message: 'Somenthing goes wrong!' });
    }

    if (!user.checkPassword(oldPassword)) {
      return res.status(401).json({ message: 'Check your old Password' });
    }

    user.Password = newPassword;
    const validationOps = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOps);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Hash password
    user.hashPassword();
    userRepository.save(user);

    res.json({ message: 'Password change!' });
  };


  static forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!(email)) {
      return res.status(400).json({ message: 'Email is Required!' });
    }

    const message = 'Check your email for a link to reset your password.';
    let verificationLink;
    let emailStatus = 'ok';

    const userRepository = getRepository(Users);

    let user: Users;

    try {
      user = await userRepository.findOneOrFail({ where: { Email: email } });
      const token = jwt.sign({ userId: user.id, email: user.Email }, config.jwtSecretReset, { expiresIn: '10m' });
      verificationLink = `http://localhost:4200/new-password/${token}`;
      user.resetToken = token;
    } catch (e) {
      return res.json({ message })
    }

    //todo: sendemail
    try {
      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Forgod Password " <edrenpublicidad@gmail.com>', // sender address
        to: user.Email, // list of receivers
        subject: "Forgot Password", // Subject line
        html: `<b>Please click on the following link, or paste this into your browser to complete the process:</b>
  <a href="${verificationLink}">${verificationLink}</a>`// html body
      });
    } catch (e) {
      emailStatus = e;
      return res.status(400).json({ message: 'Something goes wrong!' });
    }

    try {
      await userRepository.save(user);
    } catch (e) {
      emailStatus = e;
      return res.status(400).json({ message: 'Something goes wrong!' })
    }

    res.json({ message, info: emailStatus });
  };

  static createNewPassword = async (req: Request, res: Response) => {
    const { newPassword } = req.body;
    const resetToken = req.headers.reset as string;

    if (!(resetToken && newPassword)) {
      res.status(400).json({ message: 'All the fields are required' });
    }

    const userRepository = getRepository(Users);
    let jwtPayload;
    let user: Users;

    try {
      jwtPayload = jwt.verify(resetToken, config.jwtSecretReset);
      user = await userRepository.findOneOrFail({ where: { resetToken } });
    } catch (e) {
      return res.status(401).json({ message: 'Something goes wrong!' });

    }

    user.Password = newPassword;
    const validationOps = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOps);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      user.hashPassword();
      await userRepository.save(user);
    } catch (e) {
      return res.status(401).json({ message: 'Something goes wrong!' });
    }

    res.json({ message: 'Password Changed' });
  };

  static refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.headers.refresh as string;
    if (!(refreshToken)) {
      res.status(400).json({ message: 'Something goes wrong !!' });
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      const verifyResult = jwt.verify(refreshToken, config.jwtSecretRefresh);
      const { Email } = verifyResult as Users;
      user = await userRepository.findOneOrFail({ where: { Email } });
    } catch (error) {
      return res.status(400).json({ message: 'Something goes wrong !!' });
    }
    const token = jwt.sign({ userId: user.id, usuario: user.Usuario, email: user.Email }, config.jwtSecret, { expiresIn: '1hr' });
    res.json({ message: 'OK', token });
  }

}
export default AuthController;
