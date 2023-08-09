import { ProductsInterface, ProductInterface } from "../vite-env";

export async function getProducts(page: number): Promise<ProductsInterface> {
  const res: Response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/products?&lim=5&page=${page}`,
    {
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );
  return res.json();
}

export async function getProductById(id: string): Promise<ProductInterface> {
  const res: Response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/products/${id}`,
    {
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );
  return res.json();
}
