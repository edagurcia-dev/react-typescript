import {
  Link,
  Form,
  ActionFunction,
  useActionData,
  redirect,
} from "react-router-dom";
import { addProduct } from "../services/ProductServices";
import ErrorMessage from "../components/ErrorMessage";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const formData = Object.fromEntries(data);

  if (Object.values(formData).includes("")) {
    return { error: "Todos los campos son obligatorios" };
  }

  await addProduct(formData);

  return redirect("/");
};

export default function NewProduct() {
  const actionData = useActionData();
  const error = actionData?.error;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Nuevo Producto</h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 text-white p-3 text-sm font-bold shadow-sm hover:bg-indigo-500 duration-200"
        >
          Ir a Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form method="POST" className="mt-10">
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Nombre Producto:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del Producto"
            name="name"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Precio:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
          />
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
