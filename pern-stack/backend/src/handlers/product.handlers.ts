import { Response, Request } from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/product.model";

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.findAll();
  res.status(200).json({ data: products });
});

const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const productId = parseInt(id);
  const product = await Product.findByPk(productId);
  if (!product) {
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }
  res.status(200).json({ data: product });
});

const updateProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const productId = parseInt(id);
  const actualProduct = await Product.findByPk(productId);
  if (!actualProduct) {
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }

  await actualProduct.update(req.body);
  const updatedProduct = await actualProduct.save();

  res.status(201).json({ data: updatedProduct });
});

const updateProductAvailabilityById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const productId = parseInt(id);
    const actualProduct = await Product.findByPk(productId);
    if (!actualProduct) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }

    actualProduct.availability = !actualProduct.dataValues.availability;
    const updatedProduct = await actualProduct.save();

    res.status(201).json({ data: updatedProduct });
  }
);

const deleteProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const productId = parseInt(id);
  const product = await Product.findByPk(productId);
  if (!product) {
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }

  await product.destroy();

  res.status(202).json({ data: "Producto eliminado" });
});

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  updateProductAvailabilityById,
  deleteProductById,
};
