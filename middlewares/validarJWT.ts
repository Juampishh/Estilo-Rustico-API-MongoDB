import { NextFunction } from "connect";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Usuario, { IUser } from "../models/user";
const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-token"] as string;
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }
  try {
    const claveSecreta = process.env.CLAVESECRETA as string;
    const payload = jwt.verify(token, claveSecreta) as JwtPayload;
    const { id } = payload;
    const usuarioConfirmado: IUser | null = await Usuario.findById(id);

    if (!usuarioConfirmado) {
      return res.status(404).json({
        msg: "Token no valido - usuario no existe en DB",
      });
    }

    req.body.usuarioConfirmado = usuarioConfirmado;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

export default validarJWT;
