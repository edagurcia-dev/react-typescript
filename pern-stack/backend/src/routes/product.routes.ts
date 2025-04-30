import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  updateProductAvailabilityById,
  deleteProductById,
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

router.get(
  "/:id",
  param("id").isInt().withMessage("Código de producto invalido"),
  handleInputErrors,
  getProductById
);

router.put(
  "/:id",
  param("id").isInt().withMessage("Código de producto invalido"),
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
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponible es obligatorio"),
  handleInputErrors,
  updateProductById
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("Código de producto invalido"),
  handleInputErrors,
  updateProductAvailabilityById
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("Código de producto invalido"),
  handleInputErrors,
  deleteProductById
);

export default router;
