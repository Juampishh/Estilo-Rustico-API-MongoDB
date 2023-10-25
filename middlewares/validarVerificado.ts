import { NextFunction } from "connect";
import { Request, Response } from "express";
export const isVerified = (req: Request, res: Response, next: NextFunction) => {
  const { verified } = req.body.usuarioConfirmado;
  if (!verified) {
    return res.status(401).json({
      message: "User not verified",
    });
  }
  next();
};
