import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../handlers/product.handlers";
import { handleInputErrors } from "../middleware";

const router = Router();

router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre de Producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio de Producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  handleInputErrors,
  createProduct
);

router.get("/", getAllProducts);

router.get("/:id", getProductById);

export default router;
