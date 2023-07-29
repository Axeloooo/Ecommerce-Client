import { ProductInterface } from "../vite-env";

// const API: string = "https://ecommerce-api-production-c90c.up.railway.app";
const API: string = "http://localhost:8080";

export const getProducts = async (): Promise<ProductInterface[]> => {
  const res: Response = await fetch(`${API}/api/mock/products`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
  });
  return res.json();
};
