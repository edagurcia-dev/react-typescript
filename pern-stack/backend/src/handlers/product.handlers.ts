import { Response, Request } from "express";
import Product from "../models/product.model";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({ data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el producto" });
  } finally {
    return;
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();

    res.status(200).json({ data: products });
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export { createProduct, getAllProducts, getProductById };
