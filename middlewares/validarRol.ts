import { NextFunction } from "connect";
import { Request, Response } from "express";
import { ROLES } from "../helpers/constants";
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { rol } = req.body.usuarioConfirmado;
  if (rol !== ROLES.admin) {
    return res.status(401).json({
      message: "User not authorized",
    });
  }
  next();
};
