import { safeParse } from "valibot";
import axios from "axios";
import { DraftProductSchema, ProductsSchema } from "../types";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(formData: ProductData) {
  try {
    const res = safeParse(DraftProductSchema, {
      name: formData.name,
      price: +formData.price,
    });

    if (res.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/v1/products`;
      const { data } = await axios.post(url, {
        name: res.output.name,
        price: res.output.price,
      });

      console.log(data);
    } else {
      throw new Error("Datos no validos");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/v1/products`;
    const { data } = await axios.get(url);
    const res = safeParse(ProductsSchema, data.data);

    if (res.success) {
      return res.output;
    } else {
      throw new Error("Hubo un error al cargar los datos.");
    }
  } catch (error) {
    console.log(error);
  }
}
