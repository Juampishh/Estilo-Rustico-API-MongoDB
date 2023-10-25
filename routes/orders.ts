import { Router } from "express";
import { check } from "express-validator";
import { createOrder, getOrders } from "../controllers/order";
import validarJWT from "../middlewares/validarJWT";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { isVerified } from "../middlewares/validarVerificado";
const router = Router();
router.get("/", [validarJWT, recolectarErrores], getOrders);
router.post(
  "/",
  [
    validarJWT,
    isVerified,
    check("price", "El precio es obligatorio").not().isEmpty(),
    check("shippingCost", "El costo de envio es obligatorio").not().isEmpty(),
    check("total", "El precio total es obligatorio").not().isEmpty(),
    check("shippingDetails", "Los detalles de envio son obligatorios")
      .not()
      .isEmpty(),
    check("items", "El Array de productos es obligatorio").not().isEmpty(),
    recolectarErrores,
  ],
  createOrder
);
export default router;
