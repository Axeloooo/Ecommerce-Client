import { ProductsInterface, ProductInterface } from "../vite-env";

export async function getProducts(): Promise<ProductsInterface> {
  const res: Response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/products?page=1&sort=asc&lim=20`,
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
