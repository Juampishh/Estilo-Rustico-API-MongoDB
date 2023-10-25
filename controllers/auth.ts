import { Request, Response } from "express";
import Usuario, { IUser } from "../models/user";
import User from "../models/user";
import bcrypt from "bcryptjs";
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring";
import { sendEmail } from "../mailer/mailer";
import { generarJWT } from "../helpers/generarJWT";

export const register = async (req: Request, res: Response) => {
  const { nombre, email, password, rol }: IUser = req.body;

  const user = new User({ nombre, email, password, rol });

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  const adminKey = req.headers["admin-key"];

  if (adminKey === process.env.KEYFORADMIN) {
    user.rol = ROLES.admin;
  }
  const newCode = randomstring.generate(6);
  user.code = newCode;
  await user.save();
  await sendEmail(email, newCode);
  res.status(201).json({
    user,
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: IUser = req.body;
  try {
    const user = await Usuario.findOne({ email });
    if (!user) {
      res.status(404).json({ msg: "El usuario no existe" });
      return;
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      res.status(401).json({ msg: "La contraseña no es valida" });
      return;
    }

    const token = await generarJWT(user.id);
    res.status(202).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  const { email, code }: IUser = req.body;

  try {
    const user = await Usuario.findOne({ email });
    if (!user) {
      res.status(404).json({ msg: "El usuario no existe" });
      return;
    }
    if (user.verified) {
      res.status(400).json({ msg: "El usuario ya esta verificado" });
      return;
    }
    if (code !== user.code) {
      res.status(401).json({ msg: "El codigo no es valido" });
      return;
    }
    await Usuario.findOneAndUpdate({ email }, { verified: true });
    res.status(200).json({ msg: "Usuario verificado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
