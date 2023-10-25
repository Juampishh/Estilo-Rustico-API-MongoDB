import { register, verifyUser } from "../controllers/auth";
import { Router } from "express";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { existeEmail } from "../helpers/validacionesDB";
import { login } from "../controllers/auth";
const router = Router();
router.post(
  "/register",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe ser de 6 caracteres como minimo"
    ).isLength({ min: 6 }),
    check("email").custom(existeEmail),
    recolectarErrores,
  ],
  register
);

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email es invalido").isEmail(),
    check(
      "password",
      "El password debe ser de 6 caracteres como minimo"
    ).isLength({ min: 6 }),
    recolectarErrores,
  ],
  login
);

router.patch(
  "/verify",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email es invalido").isEmail(),
    check("code", "El codigo es obligatorio").not().isEmpty(),
    recolectarErrores,
  ],
  verifyUser
);
export default router;
